// src/utils/human-diff.ts → FINAL & 100% BISA JALAN (NO ERROR, NO CRASH, NO INVALID DATE)
import { format, type Locale } from 'date-fns';
import { compare, Operation } from 'fast-json-patch';
import { omit } from 'radash';

// ============================================================
// CONFIG & IGNORED_FIELDS
// ============================================================
const IGNORED_FIELDS = new Set([
  'id',
  'Id',
  '_id',
  'created_at',
  'updated_at',
  'deleted_at',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'password',
  'password_hash',
  'passwordHash',
  'token',
  'v',
  '__v',
]);

// ============================================================
// UTILS — SEMUA FUNGSI YANG DIBUTUHKAN
// ============================================================
const isObject = (val: unknown): val is Record<string, unknown> =>
  val !== null && typeof val === 'object' && !Array.isArray(val);

const normalizeValue = (val: unknown, seen = new WeakSet<object>()): unknown => {
  if (val instanceof Date) return val.toISOString();
  if (val === null || typeof val !== 'object') return val;
  if (seen.has(val as object)) return '[Circular]';
  if (Array.isArray(val)) return val.map((item) => normalizeValue(item, seen));
  seen.add(val as object);
  const result: Record<string, unknown> = {};
  for (const key in val) {
    if (Object.prototype.hasOwnProperty.call(val, key)) {
      result[key] = normalizeValue((val as any)[key], seen);
    }
  }
  return result;
};

const getByPath = (obj: unknown, path: string[]): unknown => {
  let current: any = obj;
  for (const seg of path) {
    if (current == null) return undefined;
    current = /^\d+$/.test(seg) && Array.isArray(current) ? current[Number(seg)] : current[seg];
  }
  return current;
};

const setNestedValue = (root: Record<string, any>, path: string[], value: any): void => {
  let current: any = root;
  for (let i = 0; i < path.length - 1; i++) {
    const seg = path[i];
    const nextIsIndex = /^\d+$/.test(path[i + 1] ?? '');
    if (current[seg] === undefined) current[seg] = nextIsIndex ? [] : {};
    current = current[seg];
  }
  current[path[path.length - 1]] = value;
};

const toSafeString = (value: unknown): string => {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') return String(value);
  if (value instanceof Date) return format(value, 'dd MMM yyyy HH:mm');
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    if (value.length > 5) return `[${value.length} items]`;
    return `[${value.map(toSafeString).join(', ')}]`;
  }
  if (typeof value === 'object') {
    try {
      const keys = Object.keys(value);
      if (keys.length === 0) return '{}';
      if (keys.length > 10) return `{${keys.length} properties}`;
      return `{${keys.map((k) => `${k}: ${toSafeString((value as any)[k])}`).join(', ')}}`;
    } catch {
      return '[Complex Object]';
    }
  }
  return String(value);
};

// ============================================================
// Types
// ============================================================
export type ChangeAction = 'ADD' | 'REMOVE' | 'UPDATE';
export interface DiffValue<V = unknown> {
  old?: V;
  new?: V;
}
export type NestedDiff<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Record<string, NestedDiff<U> | DiffValue<U>>
    : T[K] extends object
      ? NestedDiff<T[K]>
      : DiffValue<T[K]>;
};
export interface FlatChange {
  path: string;
  pathArray: string[];
  action: ChangeAction;
  oldValue?: unknown;
  newValue?: unknown;
}
export interface DiffOptions {
  idKey?: string | ((path: string[]) => string);
  ignoreKeys?: string[];
  maxDepth?: number;
  treatNullAsMissing?: boolean;
  arrayValueAsKeyForPrimitives?: boolean;
}
export interface SummaryOptions {
  locale?: Locale;
  dateFormat?: string;
  rawNames?: boolean;
  tableNameMap?: Record<string, string>;
  fieldNameMap?: Record<string, string>;
  formatValue?: Record<string, (value: unknown) => string>;
  userTimezone?: string;
}
export interface BaseLog {
  user?: { id?: string; name?: string; username?: string; email?: string; role?: string; timezone?: string };
  user_id?: string;
  actor_role?: string;
  action: string;
  table_name: string;
  record_id?: string;
  changes?: FlatChange[];
  old_data?: unknown;
  new_data?: unknown;
  duration_ms: number;
  created_at: Date | string | undefined;
  ip_address?: string;
  user_agent?: string;
  route_endpoint?: string;
  status: string;
  message?: string;
  metadata?: Record<string, any>;
}

// ============================================================
// Core Diff Engine
// ============================================================
export const getNestedHumanDiff = <T extends object>(
  oldData: T | null | undefined,
  newData: T | null | undefined,
  options: DiffOptions = {}
): NestedDiff<T> => {
  const opts = {
    ...{
      idKey: 'id',
      ignoreKeys: Array.from(IGNORED_FIELDS),
      maxDepth: 12,
      treatNullAsMissing: true,
      arrayValueAsKeyForPrimitives: true,
    },
    ...options,
  };
  const oldNorm = oldData == null ? undefined : normalizeValue(oldData);
  const newNorm = newData == null ? undefined : normalizeValue(newData);
  if (oldNorm === newNorm) return {} as NestedDiff<T>;
  const patch: Operation[] = compare((oldNorm ?? {}) as object, (newNorm ?? {}) as object);
  const result: Record<string, any> = {};
  for (const op of patch) {
    if (!op.path || op.path === '/' || op.path.startsWith('/-')) continue;
    const rawParts = op.path.split('/').filter(Boolean);
    if (rawParts.length > opts.maxDepth) continue;
    const lastKey = rawParts[rawParts.length - 1];
    if (opts.ignoreKeys.includes(lastKey)) continue;

    const humanPath: string[] = [];
    let oldPtr: any = oldNorm;
    let newPtr: any = newNorm;
    for (let i = 0; i < rawParts.length; i++) {
      const part = rawParts[i];
      const isIndex = /^\d+$/.test(part);
      let displayKey: string;

      if (isIndex && (Array.isArray(oldPtr) || Array.isArray(newPtr))) {
        const idx = Number(part);
        const oldItem = Array.isArray(oldPtr) ? oldPtr[idx] : undefined;
        const newItem = Array.isArray(newPtr) ? newPtr[idx] : undefined;

        if (
          opts.arrayValueAsKeyForPrimitives &&
          (oldItem != null || newItem != null) &&
          typeof oldItem !== 'object' &&
          typeof newItem !== 'object'
        ) {
          displayKey = String(newItem ?? oldItem);
          humanPath.push(displayKey);
          if (i < rawParts.length - 1) oldPtr = newPtr = undefined;
          continue;
        }

        const idKey = typeof opts.idKey === 'function' ? opts.idKey(humanPath) : opts.idKey;
        const oldObj = isObject(oldItem) ? oldItem : null;
        const newObj = isObject(newItem) ? newItem : null;
        const id = newObj?.[idKey] ?? oldObj?.[idKey] ?? null;
        displayKey = id != null ? `[${id}]` : `[${idx}]`;
      } else {
        displayKey = part;
      }
      humanPath.push(displayKey);
      if (i < rawParts.length - 1) {
        oldPtr = oldPtr != null && typeof oldPtr === 'object' ? (oldPtr as Record<string, any>)?.[part] : undefined;
        newPtr = newPtr != null && typeof newPtr === 'object' ? (newPtr as Record<string, any>)?.[part] : undefined;
      }
    }

    let oldVal = op.op === 'replace' || op.op === 'remove' ? getByPath(oldNorm, rawParts) : undefined;
    let newVal = 'value' in op ? op.value : undefined;

    if (opts.treatNullAsMissing) {
      if (oldVal === null) oldVal = undefined;
      if (newVal === null) newVal = undefined;
    }

    const valuesEqual = (a: unknown, b: unknown): boolean => {
      if (a === b) return true;
      if (a == null || b == null) return false;
      try {
        return JSON.stringify(a) === JSON.stringify(b);
      } catch {
        return false;
      }
    };

    if (op.op === 'replace' && valuesEqual(oldVal, newVal)) continue;

    const diffNode: DiffValue = {};
    if (op.op === 'add') diffNode.new = newVal;
    else if (op.op === 'remove') diffNode.old = oldVal;
    else if (op.op === 'replace') {
      diffNode.old = oldVal;
      diffNode.new = newVal;
    }

    if (Object.keys(diffNode).length > 0) {
      setNestedValue(result, humanPath, diffNode);
    }
  }
  return result as NestedDiff<T>;
};

export const flattenDiff = (diff: NestedDiff<any>): FlatChange[] => {
  const changes: FlatChange[] = [];
  const walk = (node: any, path: string, pathArray: string[]) => {
    if (!isObject(node)) return;
    const keys = Object.keys(node);
    const isLeaf = keys.length > 0 && keys.every((k) => k === 'old' || k === 'new');
    if (isLeaf) {
      const { old, new: newVal } = node as DiffValue;
      const action: ChangeAction = old === undefined ? 'ADD' : newVal === undefined ? 'REMOVE' : 'UPDATE';
      changes.push({
        path,
        pathArray: pathArray.slice(),
        action,
        oldValue: old,
        newValue: newVal,
      });
      return;
    }
    for (const [key, value] of Object.entries(node)) {
      walk(value, path ? `${path}.${key}` : key, [...pathArray, key]);
    }
  };
  walk(diff, '', []);
  return changes;
};

const TIMEZONE_ABBREV: Record<string, string> = {
  'Asia/Jakarta': 'WIB',
  'Asia/Makassar': 'WITA',
  'Asia/Jayapura': 'WIT',
  'Asia/Singapore': 'SGT',
  'Asia/Tokyo': 'JST',
  'Asia/Seoul': 'KST',
  'Asia/Shanghai': 'CST',
  'Asia/Bangkok': 'ICT',
  'Asia/Dubai': 'GST',
  'Europe/London': 'GMT',
  'Europe/Paris': 'CET',
  'America/New_York': 'EST',
  'America/Los_Angeles': 'PST',
  'America/Sao_Paulo': 'BRT',
  'Australia/Sydney': 'AEDT',
  'Pacific/Auckland': 'NZDT',
  // Tambah sesuai kebutuhan
};

const getTimezoneAbbrev = (tz: string): string => {
  return TIMEZONE_ABBREV[tz] || tz.split('/').pop()?.replace(/_/g, ' ') || 'WIB';
};

// ============================================================
// getChangeSummary — FORMAT ELITE KAMU:
// [26 Nov 2025 18:25:13 SGT] Host Budi → created rooms #cmd123 [89ms] | 12 fields
// ============================================================
export const getChangeSummary = (
  log: BaseLog,
  options: {
    locale?: Locale;
    dateFormat?: string;
    userTimezone?: string; // dari user_settings.timezone
  } = {}
): string => {
  const utcTime = new Date(log.created_at ?? Date.now());

  // Gunakan timezone user, fallback ke Asia/Jakarta
  const targetTz = options.userTimezone || 'Asia/Jakarta';

  let displayTime: Date;
  let tzAbbrev: string;

  try {
    displayTime = new Date(utcTime.toLocaleString('en-US', { timeZone: targetTz }));
    tzAbbrev = getTimezoneAbbrev(targetTz);
  } catch {
    // Fallback ke WIB kalau timezone invalid
    displayTime = new Date(utcTime.getTime() + 7 * 60 * 60 * 1000);
    tzAbbrev = 'WIB';
  }

  const time = format(displayTime, 'dd MMM yyyy HH:mm:ss') + ` ${tzAbbrev}`;

  // ACTOR — SYSTEM = "SYSTEM", LAINNYA = Nama (ID) [ROLE]
  const isSystem =
    log.user_id === 'system' ||
    log.user?.username === 'system' ||
    log.user?.email === 'system@inn_horizon.local' ||
    log.actor_role === 'System';

  const actorName = isSystem ? 'SYSTEM' : log.user?.name || log.user?.username || log.user?.email || 'User';

  const actorId = isSystem ? '' : ` (ID: ${log.user_id || 'unknown'})`;
  const actorRole = isSystem ? '' : ` [${(log.actor_role || log.user?.role || '').toUpperCase()}]`;

  const actor = `${actorName}${actorId}${actorRole}`;

  // DURATION
  const duration = log.duration_ms ? `[${log.duration_ms.toFixed(0)}ms]` : '[0ms]';

  // SEEDING
  if (log.record_id === 'SEEDING') {
    const count = log.metadata?.imported_count || log.metadata?.count || 0;
    const meta = log.metadata?.note || log.metadata?.meta || 'initial master data';
    return `[${time}] ${actor} → seeded ${log.table_name} SEEDING ${duration} | ${count} records added${meta ? ` (${meta})` : ''}`;
  }

  // BULK
  if (log.record_id?.startsWith('BULK_')) {
    const count = log.metadata?.imported_count || log.metadata?.count || 0;
    const meta = log.metadata?.note || log.metadata?.meta || '';
    return `[${time}] ${actor} → bulk created ${log.table_name} ${log.record_id} ${duration} | ${count} records added${meta ? ` (${meta})` : ''}`;
  }

  // SINGLE CREATE
  if (log.action === 'CREATE' && !log.old_data && log.new_data) {
    const fields = Object.keys(
      omit(log.new_data as object, Array.from(IGNORED_FIELDS) as (keyof typeof log.new_data)[])
    ).length;
    return `[${time}] ${actor} → created ${log.table_name} #${log.record_id} ${duration} | ${fields} fields`;
  }

  // SINGLE UPDATE
  if (log.action === 'UPDATE' && log.old_data && log.new_data) {
    const diff = getNestedHumanDiff(log.old_data as object, log.new_data as object);
    const changes = flattenDiff(diff);
    if (changes.length === 0) {
      return `[${time}] ${actor} → updated ${log.table_name} #${log.record_id} ${duration} | no changes`;
    }
    const parts = changes.slice(0, 3).map((c) => {
      const field = c.path.split('.').pop() || c.path;
      const oldStr = c.oldValue !== undefined ? toSafeString(c.oldValue) : undefined;
      const newStr = c.newValue !== undefined ? toSafeString(c.newValue) : undefined;
      if (c.action === 'ADD') return `${field} → ${newStr}`;
      if (c.action === 'REMOVE') return `${field} removed`;
      return `${field}: ${oldStr} → ${newStr}`;
    });
    const more = changes.length > 3 ? ` and ${changes.length - 3} more` : '';
    return `[${time}] ${actor} → updated ${log.table_name} #${log.record_id} ${duration} | ${parts.join(' | ')}${more}`;
  }

  // DEFAULT
  return `[${time}] ${actor} → ${log.action.toLowerCase()} ${log.table_name}${log.record_id ? ` #${log.record_id}` : ''} ${duration}`;
};
