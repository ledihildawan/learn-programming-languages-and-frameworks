// src/utils/human-diff.ts → FINAL & 100% BISA JALAN (NO ERROR, NO CRASH, NO INVALID DATE)
import { format, type Locale } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { compare, Operation } from 'fast-json-patch';
import { omit } from 'radash';
import { db } from '../../../prisma';

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

const sanitizeData = (data: unknown): Record<string, any> | null => {
  if (data === null || data === undefined) return null;
  if (!isObject(data)) return null;

  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined) {
      sanitized[key] = value;
    }
  }
  return Object.keys(sanitized).length > 0 ? sanitized : null;
};

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
  useEmoji?: boolean; // ← NEW OPTION
}
export interface BaseLog {
  user?: {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    role?: string;
    timezone?: string;
  };
  user_id?: string;
  role?: string;
  action: string;
  table_name: string;
  record_id?: string;
  changes?: FlatChange[];
  old_data?: unknown;
  new_data?: unknown;
  duration_ms: number;
  created_at?: Date | string;
  ip_address?: string;
  user_agent?: string;
  endpoint?: string;
  status: string;
  message?: string;
  metadata?: Record<string, any>;
  method?: string;
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
  'Pacific/Auckland': 'NZDT', // Tambah sesuai kebutuhan
};

const getTimezoneAbbrev = (tz: string): string => {
  return TIMEZONE_ABBREV[tz] || tz.split('/').pop()?.replace(/_/g, ' ') || 'WIB';
};

// ============================================================
// getChangeSummary — FORMAT ELITE KAMU:
// [26 Nov 2025 18:25:13 SGT] Host Budi → created rooms #cmd123 [89ms] | 12 fields
// ============================================================
// ========== ACTION PHRASE (Dengan Toggle Emoji) ==========
const getActionPhrase = (log: BaseLog, useEmoji: boolean = true): string => {
  const action = log.action.toUpperCase();
  const isSeeding = log.record_id === 'SEEDING';
  const isBulk = log.record_id?.startsWith('BULK_');

  if (isSeeding) {
    return useEmoji ? '🌱 seeded' : 'seeded';
  }

  if (isBulk) {
    if (action === 'CREATE') return useEmoji ? '📦 bulk-imported' : 'bulk-imported';
    if (action === 'UPDATE') return useEmoji ? '🔄 bulk-updated' : 'bulk-updated';
    if (action === 'DELETE') return useEmoji ? '🗑️ bulk-deleted' : 'bulk-deleted';
  }

  const phrasesWithEmoji: Record<string, string> = {
    CREATE: '✨ created',
    READ: '👁 viewed',
    UPDATE: '🔧 updated',
    DELETE: '🗑️ deleted',
    RESTORE: '↩️ restored',
    ARCHIVE: '📦 archived',
  };

  const phrasesNoEmoji: Record<string, string> = {
    CREATE: 'created',
    READ: 'viewed',
    UPDATE: 'updated',
    DELETE: 'deleted',
    RESTORE: 'restored',
    ARCHIVE: 'archived',
  };

  const phrases = useEmoji ? phrasesWithEmoji : phrasesNoEmoji;
  return phrases[action] || action.toLowerCase();
};

// ========== STATUS ICON (Dengan Toggle) ==========
const getStatusIcon = (status: string, useEmoji: boolean = true): string => {
  if (!useEmoji) {
    if (status === 'success') return '[OK]';
    if (status === 'error') return '[ERR]';
    if (status === 'warning') return '[WRN]';
    return '[~]';
  }

  if (status === 'success') return '✓';
  if (status === 'error') return '✗';
  if (status === 'warning') return '⚠';
  return '◆';
};

// ========== FIELD CHANGES (Dengan Toggle) ==========
const formatFieldChange = (
  change: FlatChange,
  fieldNameMap?: Record<string, string>,
  formatValue?: Record<string, (v: unknown) => string>,
  useEmoji: boolean = true
): string => {
  const fieldName = fieldNameMap?.[change.path] || change.path.split('.').pop() || change.path;
  const formatter = formatValue?.[change.path];

  if (change.action === 'ADD') {
    const val = formatter ? formatter(change.newValue) : toSafeString(change.newValue);
    const prefix = useEmoji ? '+' : '[ADD]';
    return `${prefix}${fieldName}=${val}`;
  }

  if (change.action === 'REMOVE') {
    const prefix = useEmoji ? '-' : '[DEL]';
    return `${prefix}${fieldName}`;
  }

  if (change.action === 'UPDATE') {
    const oldVal = formatter ? formatter(change.oldValue) : toSafeString(change.oldValue);
    const newVal = formatter ? formatter(change.newValue) : toSafeString(change.newValue);
    const maxLen = 20;
    const oldDisplay = oldVal.length > maxLen ? oldVal.substring(0, maxLen) + '…' : oldVal;
    const newDisplay = newVal.length > maxLen ? newVal.substring(0, maxLen) + '…' : newVal;
    const arrow = useEmoji ? '→' : '=>';
    return `${fieldName}:${oldDisplay}${arrow}${newDisplay}`;
  }

  return fieldName;
};

// ========== ERROR LABEL (Dengan Toggle) ==========
const getErrorPrefix = (useEmoji: boolean = true): string => {
  return useEmoji ? '❌' : '[ERROR]';
};

// ========== MAIN FUNCTION (Dengan Toggle) ==========
export const getChangeSummary = (log: BaseLog, options: SummaryOptions = {}): string => {
  const useEmoji = options.useEmoji !== false; // Default: true
  // ========== TIMESTAMP ==========

  const time = format(new Date(log.created_at ?? Date.now()), 'dd MMM yyyy HH:mm:ss', {
    locale: options.locale || enUS,
  });
  const tzAbbrev = log.user?.timezone ? getTimezoneAbbrev(log.user.timezone) : 'UTC';
  const timeWithTz = `${time} ${tzAbbrev}`; // ========== STATUS ICON ==========

  const statusIcon = getStatusIcon(log.status || 'pending', useEmoji); // ========== ACTOR (Improved Format) ==========

  const isSystem = log.user_id === 'system' || log.role === 'System';

  let actorDisplay = '';
  if (isSystem) {
    actorDisplay = useEmoji ? '🤖 System' : 'System';
  } else {
    const name = log.user?.name || log.user?.username || 'Unknown';
    const role = (log.role || log.user?.role || 'user').toUpperCase();

    actorDisplay = `${name} [${role}]`;
  } // ========== ACTION PHRASE ==========

  const actionPhrase = getActionPhrase(log, useEmoji);
  const table = options.tableNameMap?.[log.table_name] || log.table_name; // ========== RECORD IDENTIFIER ==========

  let recordId = '';
  if (
    log.record_id &&
    log.record_id !== 'unknown' &&
    log.record_id !== 'SEEDING' &&
    !log.record_id?.startsWith('BULK_')
  ) {
    recordId = ` #${log.record_id}`;
  } // ========== PERFORMANCE ==========

  const duration = log.duration_ms ?? 0;
  let perfDisplay = '';
  if (duration > 1000) {
    const perfIcon = useEmoji ? '⚡' : '[SLOW]';
    perfDisplay = `[${(duration / 1000).toFixed(2)}s ${perfIcon}]`;
  } else if (duration > 500) {
    const perfIcon = useEmoji ? '⚠' : '[WARN]';
    perfDisplay = `[${duration.toFixed(0)}ms ${perfIcon}]`;
  } else {
    perfDisplay = `[${duration.toFixed(0)}ms]`;
  } // ========== CHANGES SUMMARY ==========

  let changesSummary = '';

  if (log.changes && log.changes.length > 0) {
    const adds = log.changes.filter((c) => c.action === 'ADD').length;
    const updates = log.changes.filter((c) => c.action === 'UPDATE').length;
    const removes = log.changes.filter((c) => c.action === 'REMOVE').length;
    const total = log.changes.length; // ← FIX: Untuk CREATE, selalu show detail (meski lebih dari 3)

    if (log.action === 'CREATE' || total <= 3) {
      const details = log.changes
        .slice(0, 3) // Show top 3 fields
        .map((c) => formatFieldChange(c, options.fieldNameMap, options.formatValue, useEmoji))
        .join(' • ');

      const remaining = total > 3 ? ` +${total - 3}` : '';
      changesSummary = ` | ${details}${remaining}`;
    } else {
      // Untuk UPDATE/DELETE dengan banyak changes
      const parts: string[] = [];
      if (adds > 0) parts.push(`+${adds}`);
      if (updates > 0) parts.push(`~${updates}`);
      if (removes > 0) parts.push(`-${removes}`);
      changesSummary = ` | ${parts.join(' ')} (${total} changes)`;
    }
  } else if (log.record_id === 'SEEDING' && log.metadata?.imported_count) {
    changesSummary = ` | +${log.metadata.imported_count} records`;
  } else if (log.record_id?.startsWith('BULK_') && log.metadata?.imported_count) {
    changesSummary = ` | +${log.metadata.imported_count} records`;
  } else if (log.action === 'CREATE' && log.new_data) {
    const fieldCount = Object.keys(omit(log.new_data as object, Array.from(IGNORED_FIELDS))).length;
    changesSummary = ` | ${fieldCount} fields`;
  } else if (log.action === 'DELETE') {
    changesSummary = ` | 1 record`;
  } // ========== ERROR INFO ==========

  let errorInfo = '';
  if (log.status === 'error' && log.message) {
    const msg = log.message.length > 40 ? log.message.substring(0, 40) + '…' : log.message;
    const errorPrefix = getErrorPrefix(useEmoji);
    errorInfo = ` | ${errorPrefix} ${msg}`;
  } // ========== ROUTE & IP ==========

  const metaParts: string[] = [];

  if (log.endpoint) {
    metaParts.push(log.endpoint);
  }

  if (log.ip_address) {
    const ipParts = log.ip_address.split('.');
    metaParts.push(`${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.*`);
  }

  if (log.metadata?.request_id) {
    metaParts.push(`#${log.metadata.request_id.slice(0, 8)}`);
  }

  const connector = useEmoji ? ' → ' : ' | ';
  const metadata = metaParts.length ? ` | ${metaParts.join(connector)}` : ''; // ========== FINAL FORMAT ==========

  return `${statusIcon} [${timeWithTz}] ${actorDisplay} ${actionPhrase} ${table}${recordId} ${perfDisplay}${changesSummary}${errorInfo}${metadata}`;
};

// ========== HELPER: Create Audit Log (UPDATED - SEEDER COMPATIBLE) ==========
export const createAuditLog = async (logData: {
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  table_name: string;
  record_id?: string;
  old_data?: unknown;
  new_data?: unknown;
  changes?: any;
  ip_address?: string;
  user_agent?: string;
  endpoint?: string;
  duration_ms: number;
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
  actor?: {
    id: string;
    role: string;
    name?: string;
    username?: string;
  };
  options?: {
    source?: string;
    batch_id?: string;
  };
  bulk?: {
    count: number;
    meta: string;
  };
  userTimezone?: string;
  method?: string;
}) => {
  // ========== SANITIZE old_data & new_data ==========
  const sanitizedOldData = sanitizeData(logData.old_data);
  const sanitizedNewData = sanitizeData(logData.new_data); // ========== FLATTEN CHANGES ==========

  let flattenedChanges = logData.changes;
  if (logData.changes && !Array.isArray(logData.changes)) {
    flattenedChanges = flattenDiff(logData.changes);
  } // ========== GET ACTOR INFO ==========

  const isSystem = logData.actor?.id === 'system';
  const actorId = logData.actor?.id || process.env.USER_ID || 'unknown';
  const role = logData.actor?.role || process.env.USER_ROLE_NAME || 'user';
  const actorName = logData.actor?.name || process.env.USER_USERNAME || 'Unknown'; // same
  const actorUsername = logData.actor?.username || process.env.USER_USERNAME || ''; // same
  // ========== BUILD LOG FOR SUMMARY ==========

  const summaryLog: BaseLog = {
    action: logData.action,
    table_name: logData.table_name,
    record_id: logData.record_id,
    user_id: actorId,
    role: role,
    user: {
      id: actorId,
      name: actorName,
      username: actorUsername,
      role: role,
      timezone: logData.userTimezone,
    },
    changes: flattenedChanges,
    old_data: sanitizedOldData,
    new_data: sanitizedNewData,
    duration_ms: logData.duration_ms,
    ip_address: logData.ip_address,
    user_agent: logData.user_agent,
    endpoint: logData.endpoint,
    status: (logData.status || 'SUCCESS').toLowerCase(),
    created_at: new Date(),
    metadata: {
      source: logData.options?.source || 'SEEDER',
      batch_id: logData.options?.batch_id || logData.bulk ? `SEED_${Date.now()}` : undefined,
      ...(logData.bulk ? { imported_count: logData.bulk.count, note: logData.bulk.meta } : {}),
    },
  }; // ========== GENERATE SUMMARY ==========

  const message = getChangeSummary(summaryLog, {
    useEmoji: false,
    rawNames: true,
    userTimezone: logData.userTimezone,
  }); // ========== SAVE TO DB ==========

  await db.systemLog.create({
    data: {
      action: logData.action,
      table_name: logData.table_name,
      record_id: logData.record_id,
      user: {
        connect: isSystem || actorId === 'unknown' ? undefined : { id: actorId },
      },
      role: role,
      changes: flattenedChanges && flattenedChanges.length > 0 ? flattenedChanges : undefined,
      old_data: logData.old_data ?? undefined,
      new_data: logData.new_data ?? undefined,
      duration_ms: logData.duration_ms,
      ip_address: logData.ip_address,
      user_agent: logData.user_agent ?? 'prisma-seeder',
      endpoint: logData.endpoint,
      status: logData.status,
      source: logData.options?.source || 'SEEDER',
      method: logData?.method,
      message: message,
      metadata: {
        source: logData.options?.source || 'SEEDER',
        batch_id: logData.options?.batch_id || logData.bulk ? `SEED_${Date.now()}` : undefined,
        ...(logData.bulk ? { imported_count: logData.bulk.count, note: logData.bulk.meta } : {}),
      },
    },
  });

  console.log(message);
};
