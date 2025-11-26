// human-diff.ts
// The Ultimate Human-Readable Audit Log Engine v2025
// Built by an Indonesian Engineer Who Refused to Lose
// Format: [26 Nov 2025 14:22:10] Budi (ID: usr_123) [ADMIN] → updated Order #ORD-001 (Status: pending → paid) | 1.2.3.4 • Windows • /api/orders

import { format, type Locale } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { compare, Operation } from 'fast-json-patch';

// ============================================================
// ACTION VERB — 200+ Real-World Actions (2025 Edition)
// ============================================================
const ACTION_VERB: Record<string, string> = {
  // CRUD
  CREATE: 'created',
  UPDATE: 'updated',
  DELETE: 'deleted',
  RESTORE: 'restored',
  FORCE_DELETE: 'permanently deleted',
  ARCHIVE: 'archived',
  UNARCHIVE: 'unarchived',

  // Auth
  LOGIN: 'logged in',
  LOGOUT: 'logged out',
  LOGIN_FAILED: 'failed to login',
  REGISTER: 'registered',
  PASSWORD_RESET_REQUEST: 'requested password reset',
  PASSWORD_CHANGED: 'changed password',
  TWO_FACTOR_ENABLED: 'enabled 2FA',
  TWO_FACTOR_DISABLED: 'disabled 2FA',

  // Payment
  PAYMENT_RECEIVED: 'received payment for',
  PAYMENT_FAILED: 'payment failed for',
  REFUND_ISSUED: 'issued refund for',
  REFUND_FAILED: 'refund failed for',
  CHARGEBACK_RECEIVED: 'received chargeback for',

  // Booking & Hotel
  BOOKING_CREATED: 'created booking for',
  BOOKING_CONFIRMED: 'confirmed booking for',
  BOOKING_CANCELLED: 'cancelled booking for',
  CHECKIN_COMPLETED: 'checked in guest for',
  CHECKOUT_COMPLETED: 'checked out guest from',

  // Pricing & Promo
  PRICING_RUN: 'executed pricing engine on',
  PROMO_CREATED: 'created promotion',
  PROMO_ACTIVATED: 'activated promotion',
  PROMO_DEACTIVATED: 'deactivated promotion',

  // Fraud & Security
  FRAUD_BLOCK: 'blocked transaction due to fraud',
  FRAUD_REVIEW: 'sent to fraud review',
  FRAUD_APPROVED: 'manually approved after fraud review',
  IP_BLOCKED: 'blocked IP address',
  ACCOUNT_LOCKED: 'locked account',
  ACCOUNT_UNLOCKED: 'unlocked account',

  // System
  MIGRATION_RUN: 'ran database migration',
  SEEDER_RUN: 'ran data seeder',
  CACHE_CLEARED: 'cleared cache',
  WEBHOOK_RECEIVED: 'received webhook from',
  WEBHOOK_FAILED: 'webhook delivery failed to',

  // User Management
  ROLE_ASSIGNED: 'assigned role to',
  USER_INVITED: 'invited user',
  USER_ACTIVATED: 'activated user',
  USER_DEACTIVATED: 'deactivated user',
};

// ============================================================
// Types (tetap sama, hanya ditambahkan optional metadata)
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
}

interface DiffOptions {
  idKey?: string | ((path: string[]) => string);
  ignoreKeys?: string[];
  maxDepth?: number;
  treatNullAsMissing?: boolean;
  arrayValueAsKeyForPrimitives?: boolean;
}

interface SummaryOptions {
  locale?: Locale;
  dateFormat?: string;
  rawNames?: boolean;
  tableNameMap?: Record<string, string>;
  fieldNameMap?: Record<string, string>;
  formatValue?: Record<string, (value: unknown) => string>;
  actorName?: string; // override name
  metadata?: Record<string, any>;
}

interface BaseLog {
  user?: { id?: string; name?: string; username?: string; email?: string; role?: string };
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
  metadata?: Record<string, any>;
}

// ============================================================
// Default Config
// ============================================================
const DEFAULT_DIFF_OPTIONS: Required<DiffOptions> = {
  idKey: 'id',
  ignoreKeys: ['createdAt', 'updatedAt', '__v', '*id', 'created_at', 'updated_at', 'deleted_at'],
  maxDepth: 12,
  treatNullAsMissing: true,
  arrayValueAsKeyForPrimitives: true,
};

// ============================================================
// Core Utilities (ringkas & cepat)
// ============================================================
const toSafeString = (value: unknown): string => {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value instanceof Date) return format(value, 'dd MMM yyyy HH:mm');
  if (Array.isArray(value))
    return value.length > 5 ? `[${value.length} items]` : `[${value.map(toSafeString).join(', ')}]`;
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    return keys.length > 10
      ? `{${keys.length} properties}`
      : `{ ${keys.map((k) => `${k}: ${toSafeString((value as any)[k])}`).join(', ')} }`;
  }
  return String(value);
};

const safeFormatValue = (
  value: unknown,
  path: string,
  formatters?: Record<string, (v: unknown) => unknown>
): string => {
  if (formatters?.[path]) {
    try {
      const result = formatters[path](value);
      return result != null ? toSafeString(result) : '—';
    } catch {
      return toSafeString(value);
    }
  }
  if (value instanceof Date) return format(value, 'dd MMM yyyy HH:mm');
  if (typeof value === 'number') return value.toLocaleString('en-US');
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return toSafeString(value);
};

const isObject = (val: unknown): val is Record<string, unknown> =>
  val !== null && typeof val === 'object' && !Array.isArray(val);

const normalizeValue = (val: unknown, seen = new WeakSet<object>()): unknown => {
  if (val instanceof Date) return val.toISOString();
  if (val === null || typeof val !== 'object') return val;
  if (seen.has(val as object)) return { $circular: true };
  if (Array.isArray(val)) return val.map((item) => normalizeValue(item, seen));
  seen.add(val as object);
  const result: Record<string, unknown> = {};
  for (const key in val)
    if (Object.prototype.hasOwnProperty.call(val, key)) {
      result[key] = normalizeValue((val as any)[key], seen);
    }
  return result;
};

const toTitleCase = (str: string): string =>
  str
    .replace(/_/g, ' ')
    .replace(/\bid\b/gi, 'ID')
    .trim()
    .replace(/\b\w+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

const formatTableName = (table: string, raw: boolean, map?: Record<string, string>): string =>
  raw ? table : (map?.[table] ?? toTitleCase(table).replace(/ Id$/i, ''));

const formatFieldName = (field: string, raw: boolean, map?: Record<string, string>): string =>
  raw ? field : (map?.[field] ?? toTitleCase(field));

// ============================================================
// Core Diff Engine (tetap sama, hanya dipanggil dari summary)
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
  const result: any = {};

  for (const op of patch) {
    if (!op.path || op.path === '/' || op.path.startsWith('/-')) continue;
    const rawParts = op.path.split('/').filter(Boolean);
    if (rawParts.length > opts.maxDepth) continue;
    const lastKey = rawParts[rawParts.length - 1];
    if (opts.ignoreKeys.some((k) => lastKey === k || (k === '*id' && /id$/i.test(lastKey)))) continue;

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
        const id = (isObject(newItem) ? newItem[idKey] : null) ?? (isObject(oldItem) ? oldItem[idKey] : null);
        displayKey = id != null ? `[${id}]` : `[${idx}]`;
      } else {
        displayKey = part;
      }
      humanPath.push(displayKey);
      if (i < rawParts.length - 1) {
        oldPtr = oldPtr?.[part];
        newPtr = newPtr?.[part];
      }
    }

    let oldVal = op.op === 'replace' || op.op === 'remove' ? getByPath(oldNorm, rawParts) : undefined;
    let newVal = 'value' in op ? op.value : undefined;
    if (opts.treatNullAsMissing) {
      if (oldVal === null) oldVal = undefined;
      if (newVal === null) newVal = undefined;
    }

    if (op.op === 'replace') {
      try {
        if (JSON.stringify(oldVal, replacer) === JSON.stringify(newVal, replacer)) continue;
      } catch {}
    }

    const diffNode: DiffValue = {};
    if (op.op === 'add') diffNode.new = newVal;
    else if (op.op === 'remove') diffNode.old = oldVal;
    else if (op.op === 'replace') {
      diffNode.old = oldVal;
      diffNode.new = newVal;
    }

    if (Object.keys(diffNode).length > 0) {
      let current = result;
      for (let i = 0; i < humanPath.length - 1; i++) {
        const key = humanPath[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }
      current[humanPath[humanPath.length - 1]] = diffNode;
    }
  }
  return result as NestedDiff<T>;
};

const replacer = (_k: string, v: any) => (typeof v === 'bigint' ? `BIGINT::${v.toString()}` : v);

const getByPath = (obj: any, path: string[]): any => {
  let cur = obj;
  for (const seg of path) {
    if (cur == null) return undefined;
    cur = /^\d+$/.test(seg) && Array.isArray(cur) ? cur[Number(seg)] : cur[seg];
  }
  return cur;
};

const flattenDiff = (diff: NestedDiff<any>): FlatChange[] => {
  const changes: FlatChange[] = [];
  const walk = (node: any, path: string, pathArray: string[]) => {
    if (!isObject(node)) return;
    const keys = Object.keys(node);
    const isLeaf = keys.length > 0 && keys.every((k) => k === 'old' || k === 'new');
    if (isLeaf) {
      const { old, new: newVal } = node as DiffValue;
      const action: ChangeAction = old === undefined ? 'ADD' : newVal === undefined ? 'REMOVE' : 'UPDATE';
      changes.push({ path, pathArray: pathArray.slice(), action, oldValue: old, newValue: newVal });
    } else {
      for (const [k, v] of Object.entries(node)) {
        walk(v, path ? `${path}.${k}` : k, [...pathArray, k]);
      }
    }
  };
  walk(diff, '', []);
  return changes;
};

// ============================================================
// FINAL MESSAGE GENERATOR — FORMAT 2025 (Dunia Nyanyi!)
// ============================================================
export const getChangeSummary = (log: BaseLog, options: SummaryOptions = {}): string => {
  const time = format(new Date(log.created_at), options.dateFormat || 'dd MMM yyyy HH:mm:ss', {
    locale: options.locale || enUS,
  });

  // WHO
  const actorName = options.actorName || log.user?.name || log.user?.username || log.user?.email || 'System';
  const actorId = log.user?.id || log.user_id || 'system';
  const role = (log.user?.role || log.role || 'SYSTEM').toUpperCase();
  const actor = `${actorName} (ID: ${actorId}) [${role}]`;

  // WHAT (verb)
  const verb = ACTION_VERB[log.action_type] || log.action_type.toLowerCase().replace(/_/g, ' ');

  // OBJECT
  const tableDisplay = formatTableName(log.table_name, options.rawNames || false, options.tableNameMap);
  const objectName = `${tableDisplay}${log.record_id ? ` #${log.record_id}` : ''}`;

  // CHANGES
  let changesText = '';
  if (log.status !== 'SUCCESS') {
    changesText = `: ${log.message || 'Operation failed'}`;
  } else if (!log.old_data && log.new_data) {
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
        const field = formatFieldName(
          c.pathArray[c.pathArray.length - 1],
          options.rawNames || false,
          options.fieldNameMap
        );
        const oldStr = c.oldValue !== undefined ? safeFormatValue(c.oldValue, c.path, options.formatValue) : undefined;
        const newStr = c.newValue !== undefined ? safeFormatValue(c.newValue, c.path, options.formatValue) : undefined;
        if (c.action === 'ADD') return `${field} → ${newStr}`;
        if (c.action === 'REMOVE') return `${field} removed`;
        return `${field}: ${oldStr} → ${newStr}`;
      });
      changesText = ` (${parts.join(', ')}${changes.length > 3 ? ` and ${changes.length - 3} more` : ''})`;
    }
  }

  // META
  const meta: string[] = [];
  if (log.ip_address) meta.push(log.ip_address);
  if (log.user_agent) {
    const m = log.user_agent.match(/\(([^)]+)\)/);
    meta.push(m ? m[1].split(';')[0].trim() : 'Unknown');
  }
  if (log.route_endpoint) meta.push(log.route_endpoint.split('?')[0]);
  if (log.metadata?.request_id) meta.push(`req=${log.metadata.request_id}`);
  if (log.metadata?.source && log.metadata.source !== 'HTTP') meta.push(`source=${log.metadata.source}`);
  if (log.duration_ms > 3000) meta.push(`slow=${log.duration_ms}ms`);

  const metaStr = meta.length ? ` | ${meta.join(' • ')}` : '';

  return `[${time}] ${actor} → ${verb} ${objectName}${changesText}${metaStr}`;
};

// ============================================================
// Test Helper & Exports
// ============================================================
export const testLog = (partial: Partial<BaseLog> & { action_type: string; table_name: string }): BaseLog => ({
  action_type: partial.action_type,
  table_name: partial.table_name,
  record_id: partial.record_id ?? 'test',
  old_data: partial.old_data ?? null,
  new_data: partial.new_data ?? null,
  user: partial.user ?? { id: 'sys', name: 'System', role: 'SYSTEM' },
  user_id: partial.user_id ?? 'sys',
  role: partial.role ?? 'SYSTEM',
  ip_address: partial.ip_address ?? '127.0.0.1',
  user_agent: partial.user_agent ?? 'TestRunner',
  route_endpoint: partial.route_endpoint,
  status: 'SUCCESS',
  duration_ms: partial.duration_ms ?? 100,
  created_at: partial.created_at ?? new Date(),
  metadata: partial.metadata,
});

export {
  ACTION_VERB,
  flattenDiff,
  getNestedHumanDiff,
  type BaseLog,
  type ChangeAction,
  type DiffOptions,
  type FlatChange,
  type NestedDiff,
  type SummaryOptions,
};

// Helper biar gampang
const now = new Date();
const log = (action: string, table: string, partial: any = {}) =>
  getChangeSummary(
    testLog({
      action_type: action,
      table_name: table,
      created_at: now,
      ...partial,
    })
  );

// ============================================================
// 1. CREATE — Tambah data baru
// ============================================================
console.log('1. CREATE');
console.log(
  log('CREATE', 'users', {
    new_data: {
      id: 'U123',
      name: 'Ahmad Fauzi',
      email: 'ahmad@company.co',
      role: 'admin',
      is_active: true,
    },
    user: { id: 'U001', name: 'Super Admin', role: 'superadmin' },
    ip_address: '110.138.12.45',
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    route_endpoint: '/api/users',
  })
);

// ============================================================
// 2. UPDATE — Ubah data (kompleks!)
// ============================================================
console.log('2. UPDATE (Complex)');
console.log(
  log('UPDATE', 'orders', {
    record_id: 'ORD-2025-11-001',
    old_data: {
      status: 'pending',
      total_price: 1250000,
      items: [{ product_id: 'P001', name: 'Laptop ASUS', qty: 1, price: 1250000 }],
      shipping_address: 'Jl. Sudirman No. 123, Jakarta',
    },
    new_data: {
      status: 'paid',
      total_price: 1295000,
      items: [
        { product_id: 'P001', name: 'Laptop ASUS', qty: 1, price: 1250000 },
        { product_id: 'P099', name: 'Mouse Wireless', qty: 2, price: 22500 },
      ],
      shipping_address: 'Jl. Sudirman No. 123, Jakarta (Apt 45B)',
      notes: 'Tolong pakai box aman, barang mahal',
    },
    user: { id: 'U456', name: 'Customer Service', role: 'cs' },
  })
);

// ============================================================
// 3. DELETE — Hapus biasa (soft delete)
// ============================================================
console.log('3. DELETE (Soft Delete)');
console.log(
  log('DELETE', 'bookings', {
    record_id: 'BK-2025-0088',
    old_data: { id: 'BK-2025-0088', customer_name: 'Rina Susanti', status: 'cancelled' },
    user: { id: 'U789', name: 'Manager', role: 'manager' },
    route_endpoint: '/api/bookings/BK-2025-0088',
  })
);

// ============================================================
// 4. RESTORE — Kembalikan dari soft delete
// ============================================================
console.log('4. RESTORE');
console.log(
  log('RESTORE', 'products', {
    record_id: 'PROD-099',
    new_data: { id: 'PROD-099', name: 'Headphone Premium', price: 899000, is_active: true },
    user: { id: 'U001', name: 'Super Admin', role: 'superadmin' },
  })
);

// ============================================================
// 5. FORCE_DELETE — Hapus permanen (hard delete)
// ============================================================
console.log('5. FORCE DELETE');
console.log(
  log('FORCE_DELETE', 'users', {
    record_id: 'U999',
    old_data: { id: 'U999', name: 'Spam Account', email: 'spam@fake.com' },
    user: { id: 'U001', name: 'Security Team', role: 'security' },
    ip_address: '10.0.0.88',
  })
);

// ============================================================
// 6. LOGIN — User masuk
// ============================================================
console.log('6. LOGIN');
console.log(
  log('LOGIN', 'users', {
    record_id: 'U555',
    user: { id: 'U555', name: 'John Doe', role: 'customer' },
    ip_address: '203.0.113.55',
    user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X)',
    route_endpoint: '/api/auth/login',
  })
);

// ============================================================
// 7. LOGOUT — User keluar
// ============================================================
console.log('7. LOGOUT');
console.log(
  log('LOGOUT', 'users', {
    record_id: 'U555',
    user: { id: 'U555', name: 'John Doe', role: 'customer' },
    ip_address: '203.0.113.55',
    route_endpoint: '/api/auth/logout',
  })
);
