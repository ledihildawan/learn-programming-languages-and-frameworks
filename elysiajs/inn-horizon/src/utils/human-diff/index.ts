// human-diff.ts
// The Ultimate Human-Readable Audit Log Engine
// Built by an Indonesian Engineer Who Refused to Lose
// cspell:ignore Wijaya Shopee Tolong tebal LENGKAP Fitur dengan hasil karena selalu

import { format, type Locale } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { compare, Operation } from 'fast-json-patch';

// ============================================================
// Types
// ============================================================

type ChangeAction = 'ADD' | 'REMOVE' | 'UPDATE';

interface DiffValue<V = unknown> {
  old?: V;
  new?: V;
}

type NestedDiff<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Record<string, NestedDiff<U> | DiffValue<U>>
    : T[K] extends object
      ? NestedDiff<T[K]>
      : DiffValue<T[K]>;
};

interface FlatChange {
  path: string;
  pathArray: string[];
  action: ChangeAction;
  oldValue?: unknown;
  newValue?: unknown;
  formattedOldValue?: string;
  formattedNewValue?: string;
  removedItemId?: string;
}

interface DiffOptions {
  idKey?: string | ((path: string[]) => string);
  ignoreKeys?: string[];
  maxDepth?: number;
  treatNullAsMissing?: boolean;
  arrayValueAsKeyForPrimitives?: boolean;
}

interface SummaryOptions {
  includeUser?: boolean;
  includeIp?: boolean;
  includeDevice?: boolean;
  includeRoute?: boolean;
  locale?: Locale;
  dateFormat?: string;
  rawNames?: boolean;
  actionMap?: Record<string, string>;
  tableNameMap?: Record<string, string>;
  fieldNameMap?: Record<string, string>;
  formatValue?: Record<string, (value: unknown) => string>;
}

interface BaseLog {
  user?: {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    role?: string;
  };
  user_id?: string;
  role?: string;
  action_type: string;
  status: string;
  duration_ms: number;
  table_name: string;
  record_id?: string;
  old_data?: unknown;
  new_data?: unknown;
  ip_address?: string;
  user_agent?: string;
  route_endpoint?: string;
  message?: string;
  created_at: Date | string;
}

// ============================================================
// Default Config
// ============================================================

const DEFAULT_DIFF_OPTIONS: Required<DiffOptions> = {
  idKey: 'id',
  ignoreKeys: ['createdAt', 'updatedAt', '__v', '_id', 'created_at', 'updated_at', 'deleted_at'],
  maxDepth: 12,
  treatNullAsMissing: true,
  arrayValueAsKeyForPrimitives: true,
};

const DEFAULT_SUMMARY_OPTIONS: Partial<SummaryOptions> = {
  includeUser: true,
  includeIp: true,
  includeDevice: true,
  includeRoute: true,
  locale: enUS,
  dateFormat: 'dd MMM yyyy HH:mm:ss',
  rawNames: false,
  actionMap: {
    CREATE: 'created',
    UPDATE: 'updated',
    DELETE: 'deleted',
    LOGIN: 'logged in',
    LOGOUT: 'logged out',
    RESTORE: 'restored',
    FORCE_DELETE: 'permanently deleted',
  },
  tableNameMap: {
    orders: 'Order',
    hotels: 'Hotel',
    rooms: 'Room',
    bookings: 'Booking',
    users: 'User',
    payments: 'Payment',
  },
  fieldNameMap: {
    status: 'Status',
    total_price: 'Total',
    notes: 'Customer Notes',
    qty: 'Quantity',
  },
};

// ============================================================
// Ultimate Safe String — NO MORE [object Object] FOREVER
// ============================================================

const toSafeString = (value: unknown): string => {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value);
  }
  if (value instanceof Date) {
    return format(value, 'dd MMM yyyy HH:mm');
  }
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
// Safe Formatter — 100% Type-Safe + No Crash
// ============================================================

type Formatter = (value: unknown) => string;

const createFormatter = (formatters: Record<string, Formatter>): Record<string, Formatter> => {
  return formatters;
};

const safeFormatValue = (value: unknown, path: string, formatters?: Record<string, Formatter>): string => {
  if (formatters?.[path]) {
    try {
      const result = formatters[path](value);
      return result != null ? toSafeString(result) : '—';
    } catch (err) {
      console.warn(`Formatter error for path "${path}":`, err);
      return toSafeString(value);
    }
  }

  // Default formatting
  if (value instanceof Date) return format(value, 'dd MMM yyyy HH:mm');
  if (typeof value === 'number') return value.toLocaleString('id-ID');
  if (typeof value === 'boolean') return value ? 'Ya' : 'Tidak';
  return toSafeString(value);
};

// ============================================================
// Core Utilities
// ============================================================

const isObject = (val: unknown): val is Record<string, unknown> =>
  val !== null && typeof val === 'object' && !Array.isArray(val);

const normalizeValue = (val: unknown, seen = new WeakSet<object>()): unknown => {
  if (val instanceof Date) return val.toISOString();
  if (val === null || typeof val !== 'object') return val;
  if (seen.has(val as object)) return { $circular: true };
  if (Array.isArray(val)) return val.map((item) => normalizeValue(item, seen));

  seen.add(val as object);
  const result: Record<string, unknown> = {};
  for (const key in val) {
    if (Object.prototype.hasOwnProperty.call(val, key)) {
      result[key] = normalizeValue((val as Record<string, unknown>)[key], seen);
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

const toTitleCase = (str: string): string =>
  str
    .replace(/_/g, ' ')
    .replace(/\bid\b/gi, 'ID')
    .trim()
    .replace(/\b\w+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

const formatTableName = (table: string, raw: boolean, map?: Record<string, string>): string => {
  if (raw) return table;
  if (map?.[table] !== undefined) return map[table];
  return toTitleCase(table).replace(/ Id$/i, '');
};

const formatFieldName = (field: string, raw: boolean, map?: Record<string, string>): string => {
  if (raw) return field;
  if (map?.[field] !== undefined) return map[field];
  return toTitleCase(field);
};

const truncate = (val: unknown, max = 50): string => {
  const str = toSafeString(val);
  return str.length > max ? `${str.slice(0, max)}...` : str;
};

// ============================================================
// Core Diff Engine — Indestructible
// ============================================================

const getNestedHumanDiff = <T extends object>(
  oldData: T | null | undefined,
  newData: T | null | undefined,
  options: DiffOptions = {}
): NestedDiff<T> => {
  const opts = { ...DEFAULT_DIFF_OPTIONS, ...options };
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

    // Safe comparison — BigInt safe
    const valuesEqual = (a: unknown, b: unknown): boolean => {
      if (a === b) return true;
      if (a == null || b == null) return false;
      try {
        return (
          JSON.stringify(a, (k, v) => (typeof v === 'bigint' ? `BIGINT::${v.toString()}` : v)) ===
          JSON.stringify(b, (k, v) => (typeof v === 'bigint' ? `BIGINT::${v.toString()}` : v))
        );
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

const flattenDiff = (diff: NestedDiff<any>): FlatChange[] => {
  const changes: FlatChange[] = [];

  const walk = (node: unknown, path: string, pathArray: string[]) => {
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

// ============================================================
// FINAL SUMMARY — THE UNBREAKABLE ONE
// ============================================================

const getChangeSummary = (log: BaseLog, options: SummaryOptions = {}): string => {
  const opts = { ...DEFAULT_SUMMARY_OPTIONS, ...options };
  const rawNames = opts.rawNames ?? false;
  const actionMap = { ...DEFAULT_SUMMARY_OPTIONS.actionMap, ...(options.actionMap ?? {}) };
  const tableMap = opts.tableNameMap ?? {};
  const fieldMap = opts.fieldNameMap ?? {};

  const userId = log.user?.id ?? log.user_id ?? 'unknown';
  const userRole = (log.user?.role ?? log.role ?? '').toUpperCase();
  const userDisplayName = log.user?.name || log.user?.username || log.user?.email || 'System';

  let actor = userDisplayName;
  if (opts.includeUser) {
    if (userId && userId !== 'unknown') actor += ` (ID: ${userId})`;
    if (userRole) actor += ` [${userRole}]`;
  }

  let changesText = '';
  if (!log.old_data && log.new_data) {
    changesText = ' → Created new record';
  } else if (log.old_data && !log.new_data) {
    changesText = ' → Deleted record';
  } else if (log.old_data && log.new_data) {
    const diff = getNestedHumanDiff(log.old_data as object, log.new_data as object);
    const changes = flattenDiff(diff);
    if (changes.length === 0) {
      changesText = ' (no changes detected)';
    } else {
      const parts = changes.slice(0, 3).map((c) => {
        const lastKey = c.path.split('.').pop() ?? c.path;
        const field = formatFieldName(lastKey, rawNames, fieldMap);
        const oldStr = c.oldValue !== undefined ? safeFormatValue(c.oldValue, c.path, opts.formatValue) : undefined;
        const newStr = c.newValue !== undefined ? safeFormatValue(c.newValue, c.path, opts.formatValue) : undefined;

        if (c.action === 'ADD') return `${field} → ${newStr}`;
        if (c.action === 'REMOVE') return `${field} dihapus (sebelumnya: ${oldStr})`;
        return `${field}: ${oldStr} → ${newStr}`;
      });
      changesText = ` (${parts.join(', ')}${changes.length > 3 ? ` and ${changes.length - 3} more` : ''})`;
    }
  }

  const verb = actionMap[log.action_type] || log.action_type.toLowerCase().replace(/_/g, ' ');
  const tableDisplay = formatTableName(log.table_name, rawNames, tableMap);
  const objectName = `${tableDisplay}${log.record_id ? ` #${log.record_id}` : ''}`;
  const time = format(
    new Date(log.created_at),
    opts.dateFormat ?? DEFAULT_SUMMARY_OPTIONS.dateFormat ?? 'dd MMM yyyy HH:mm:ss',
    { locale: opts.locale ?? DEFAULT_SUMMARY_OPTIONS.locale ?? enUS }
  );

  const meta: string[] = [];
  if (opts.includeIp && log.ip_address) meta.push(log.ip_address);
  if (opts.includeDevice && log.user_agent) {
    const match = log.user_agent.match(/\(([^)]+)\)/);
    const device = match ? match[1].split(';')[0].trim() : 'Unknown';
    meta.push(device);
  }
  if (opts.includeRoute && log.route_endpoint) meta.push(log.route_endpoint);

  return `[${time}] ${actor} ${verb} ${objectName}${changesText}${meta.length ? ` | ${meta.join(' • ')}` : ''}`;
};

// ============================================================
// Helper untuk Test (Aman dari TypeScript Error)
// ============================================================

interface TestLog extends BaseLog {
  status: string;
  duration_ms: number;
}

const testLog = (partial: Partial<BaseLog> & { action_type: string; table_name: string }): TestLog => ({
  action_type: partial.action_type,
  table_name: partial.table_name,
  record_id: partial.record_id ?? 'test',
  old_data: partial.old_data ?? null,
  new_data: partial.new_data ?? null,
  user: partial.user ?? undefined,
  user_id: partial.user_id,
  role: partial.role,
  ip_address: partial.ip_address ?? '127.0.0.1',
  user_agent: partial.user_agent ?? 'TestRunner',
  route_endpoint: partial.route_endpoint,
  message: partial.message,
  created_at: partial.created_at ?? new Date(),
  status: 'SUCCESS',
  duration_ms: 100,
});

export {
  // Type-Safe Formatter (Legendary!)
  createFormatter,
  flattenDiff,
  getChangeSummary,
  // Core Engine
  getNestedHumanDiff,
  // Test Helper (Super Berguna!)
  testLog,
  type BaseLog,
  // Types (untuk developer lain)
  type ChangeAction,
  type DiffOptions,
  type FlatChange,
  type Formatter,
  type NestedDiff,
  type SummaryOptions,
};
