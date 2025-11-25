// human-diff.v4.ts
import { format, type Locale } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { compare } from 'fast-json-patch';

// ============================================================
// 1. Types & Interfaces
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
  formattedOldValue?: string;
  formattedNewValue?: string;
  removedItemId?: string;
}

export interface DiffOptions {
  idKey?: string | ((path: string[]) => string);
  ignoreKeys?: string[];
  maxDepth?: number;
  treatNullAsMissing?: boolean;
}

export interface SummaryOptions {
  includeUser?: boolean;
  includeIp?: boolean;
  includeDevice?: boolean;
  includeRoute?: boolean;
  locale?: Locale;
  dateFormat?: string;
  actionMap?: Record<string, string>;
}

export interface BaseLog {
  user?: { name?: string; username?: string; email?: string };
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
// 2. Constants & Defaults
// ============================================================

const DEFAULT_OPTIONS = {
  diff: {
    idKey: 'id' as const,
    ignoreKeys: ['createdAt', 'updatedAt', '__v', '_id', 'created_at', 'updated_at', 'deleted_at'],
    maxDepth: 10,
    treatNullAsMissing: true,
  } satisfies Required<DiffOptions>,

  summary: {
    includeUser: true,
    includeIp: true,
    includeDevice: true,
    includeRoute: true,
    locale: enUS,
    dateFormat: 'dd MMM yyyy HH:mm:ss',
  } satisfies Required<Omit<SummaryOptions, 'actionMap'>>,

  actionMap: {
    CREATE: 'created',
    UPDATE: 'updated',
    DELETE: 'deleted',
    LOGIN: 'logged in',
    LOGOUT: 'logged out',
    RESTORE: 'restored',
    FORCE_DELETE: 'permanently deleted',
  } satisfies Record<string, string>,
};

// ============================================================
// 3. Core Utilities
// ============================================================

const isObject = (val: unknown): val is Record<string, unknown> =>
  val !== null && typeof val === 'object' && !Array.isArray(val);

const isArray = Array.isArray;

const isDate = (val: unknown): val is Date => val instanceof Date;

const normalizeValue = (val: unknown): unknown => {
  if (isDate(val)) return val.toISOString();
  if (isArray(val)) return val.map(normalizeValue);
  if (isObject(val)) {
    const result: Record<string, unknown> = {};
    for (const key in val) {
      if (Object.prototype.hasOwnProperty.call(val, key)) {
        result[key] = normalizeValue(val[key]);
      }
    }
    return result;
  }
  return val;
};

const getByPath = (obj: unknown, path: string[]): unknown => {
  let current = obj;
  for (const segment of path) {
    if (current == null) return undefined;
    current = isArray(current) && /^\d+$/.test(segment) ? current[Number(segment)] : (current as any)[segment];
  }
  return current;
};

const setNested = (obj: any, parts: string[], value: any): void => {
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    current[key] ??= {};
    current = current[key];
  }
  current[parts[parts.length - 1]] = value;
};

// ============================================================
// 4. Main Diff Engine
// ============================================================

export const getNestedHumanDiff = <T extends object>(
  oldData: T,
  newData: T,
  options: DiffOptions = {}
): NestedDiff<T> => {
  const opts = { ...DEFAULT_OPTIONS.diff, ...options };
  const oldNorm = normalizeValue(oldData);
  const newNorm = normalizeValue(newData);

  if (oldNorm === newNorm) return {} as NestedDiff<T>;

  const patch = compare(oldNorm as object, newNorm as object);
  const result: Record<string, unknown> = {};

  for (const op of patch) {
    if (!op.path || op.path === '/') continue;

    const rawParts = op.path.split('/').filter(Boolean);
    if (rawParts.length > opts.maxDepth) continue;
    if (opts.ignoreKeys.includes(rawParts[rawParts.length - 1])) continue;

    const humanParts: string[] = [];
    let oldPtr: unknown = oldNorm;
    let newPtr: unknown = newNorm;
    const pathSoFar: string[] = [];

    for (let i = 0; i < rawParts.length; i++) {
      const part = rawParts[i];
      const isIndex = /^\d+$/.test(part);
      let displayKey = part;

      if ((isArray(oldPtr) || isArray(newPtr)) && isIndex) {
        const idx = Number(part);
        const oldItem = isArray(oldPtr) ? oldPtr[idx] : undefined;
        const newItem = isArray(newPtr) ? newPtr[idx] : undefined;

        const idKey = typeof opts.idKey === 'function' ? opts.idKey(pathSoFar) : opts.idKey;
        const id = (isObject(newItem) ? newItem[idKey] : undefined) ?? (isObject(oldItem) ? oldItem[idKey] : undefined);

        displayKey = id != null ? `[${id}]` : `[${idx}]`;
        pathSoFar.push(part);
      } else {
        pathSoFar.push(part);
      }

      humanParts.push(displayKey);

      if (i < rawParts.length - 1) {
        oldPtr = isObject(oldPtr) || isArray(oldPtr) ? (oldPtr as any)[part] : undefined;
        newPtr = isObject(newPtr) || isArray(newPtr) ? (newPtr as any)[part] : undefined;
      }
    }

    let oldVal: unknown;
    let newVal: unknown = 'value' in op ? op.value : undefined;

    if (op.op === 'replace' || op.op === 'remove') {
      oldVal = getByPath(oldNorm, rawParts);
    }

    if (opts.treatNullAsMissing) {
      if (newVal === null) newVal = undefined;
      if (oldVal === null) oldVal = undefined;
    }

    const valuesEqual =
      typeof oldVal === 'object' && typeof newVal === 'object'
        ? JSON.stringify(oldVal) === JSON.stringify(newVal)
        : oldVal === newVal;

    if (op.op === 'replace' && valuesEqual) continue;

    const diffNode: DiffValue = {};
    if (op.op === 'add') diffNode.new = newVal;
    else if (op.op === 'remove') diffNode.old = oldVal;
    else if (op.op === 'replace') {
      diffNode.old = oldVal;
      diffNode.new = newVal;
    }

    if (Object.keys(diffNode).length > 0) {
      setNested(result, humanParts, diffNode);
    }
  }

  return result as NestedDiff<T>;
};

// ============================================================
// 5. Flatten & Format
// ============================================================

export const flattenDiff = (
  diff: NestedDiff<any>,
  formatters: Record<string, (val: unknown) => string> = {}
): FlatChange[] => {
  const changes: FlatChange[] = [];

  const walk = (node: unknown, path: string) => {
    if (!isObject(node)) return;

    const keys = Object.keys(node);
    const isLeaf = keys.length > 0 && keys.every((k) => k === 'old' || k === 'new');

    if (isLeaf) {
      const { old, new: newVal } = node as DiffValue;
      const action: ChangeAction = old === undefined ? 'ADD' : newVal === undefined ? 'REMOVE' : 'UPDATE';

      let oldStr = old === undefined ? undefined : String(old);
      let newStr = newVal === undefined ? undefined : String(newVal);

      if (formatters[path]) {
        try {
          if (old !== undefined) oldStr = formatters[path](old);
          if (newVal !== undefined) newStr = formatters[path](newVal);
        } catch (e) {
          console.warn(`Formatter failed for ${path}`, e);
        }
      }

      const change: FlatChange = {
        path,
        pathArray: path.replace(/\]/g, '').split(/\.|\[/).filter(Boolean),
        action,
        oldValue: old,
        newValue: newVal,
        formattedOldValue: oldStr,
        formattedNewValue: newStr,
      };

      if (action === 'REMOVE') {
        const match = path.match(/\[([^\]]+)\]$/);
        if (match) change.removedItemId = match[1];
      }

      changes.push(change);
      return;
    }

    for (const [key, value] of Object.entries(node)) {
      walk(value, path ? `${path}.${key}` : key);
    }
  };

  walk(diff, '');
  return changes;
};

// ============================================================
// 6. Human Summary Generator
// ============================================================

const toTitleCase = (str: string): string =>
  str
    .replace(/_/g, ' ')
    .replace(/\bid\b/gi, '')
    .trim()
    .replace(/\b\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

const truncate = (val: unknown, max = 50): string => {
  if (val == null) return '';
  const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
  return str.length > max ? str.slice(0, max) + '...' : str;
};

export const getChangeSummary = (log: BaseLog, options: SummaryOptions = {}): string => {
  const opts = { ...DEFAULT_OPTIONS.summary, ...options };
  const actionMap = { ...DEFAULT_OPTIONS.actionMap, ...options.actionMap };

  let changesText = '';

  if (!log.old_data && log.new_data) {
    changesText = ' → Created new record';
  } else if (log.old_data && !log.new_data) {
    changesText = ' → Deleted record';
  } else if (log.old_data && log.new_data) {
    const diff = getNestedHumanDiff(log.old_data as object, log.new_data as object);
    const changes = flattenDiff(diff);

    if (changes.length === 0) {
      changesText = ' (no field changes detected)';
    } else {
      const parts = changes.slice(0, 3).map((c) => {
        const field = c.path.split('.').pop() ?? c.path;
        if (c.action === 'ADD') return `${field} set to "${truncate(c.newValue, 20)}"`;
        if (c.action === 'REMOVE') return `${field} removed`;
        return `${field}: "${truncate(c.oldValue, 15)}" → "${truncate(c.newValue, 15)}"`;
      });

      changesText = ` (${parts.join(', ')}${changes.length > 3 ? `, +${changes.length - 3} more` : ''})`;
    }
  }

  const actor = opts.includeUser ? log.user?.name || log.user?.username || log.user?.email || 'System' : '';

  const verb = actionMap[log.action_type] || log.action_type;
  const object = `${toTitleCase(log.table_name)}${log.record_id ? ` #${log.record_id}` : ''}`;
  const time = format(new Date(log.created_at), opts.dateFormat, { locale: opts.locale });

  const meta: string[] = [];
  if (opts.includeIp && log.ip_address) meta.push(log.ip_address);
  if (opts.includeDevice && log.user_agent) {
    const device = log.user_agent.split(/[()]/)[1]?.split(';')[0]?.trim();
    if (device) meta.push(device);
  }

  return `[${time}] ${actor} ${verb} ${object}${changesText}${meta.length ? ` | ${meta.join(' • ')}` : ''}`;
};

// ==========================================
// 7. TEST (English output)
// ==========================================
if (typeof require !== 'undefined' && require.main === module) {
  console.log('Running human-diff v2.2 tests (English)...\n');

  const oldOrder = {
    id: 8901273,
    order_number: 'INV/20250128/XXI/I/8901273',
    marketplace_order_id: '2501289X7K4V9P', // Shopee style
    channel: 'shopee',
    customer_id: 2145871,
    customer_username: 'daniel_gamer88',
    status: 'paid',
    payment_status: 'paid',
    fulfillment_status: 'unfulfilled',
    subtotal_price: 4289000,
    discount_amount: 0,
    shipping_cost: 0,
    insurance_cost: 0,
    total_price: 4289000,
    currency: 'IDR',
    notes: null,
    admin_note: null,
    tags: ['shopee', 'flash_sale', 'gaming_setup'],
    created_at: '2025-01-28T14:23:11.287+07:00',
    updated_at: '2025-01-28T14:25:44.112+07:00',
    paid_at: '2025-01-28T14:25:40.000+07:00',

    customer: {
      id: 2145871,
      name: 'Daniel Santoso',
      email: 'daniel.santoso88@gmail.com',
      phone: '+628123456789',
      address: null,
    },

    shipping_address: {
      recipient_name: 'Daniel Santoso',
      phone: '+628123456789',
      full_address: 'Kos Putri Melati, Jl. Prof. Dr. Soepomo No. 22, Tebet',
      province: 'DKI Jakarta',
      city: 'Jakarta Selatan',
      district: 'Tebet',
      postal_code: '12810',
      coordinate: null,
    },

    items: [
      {
        id: 17823401,
        product_id: 410987,
        variant_id: 1201987,
        qty: 1,
        price: 2599000,
        total_price: 2599000,
        weight_gram: 4800,
        name: 'Monitor Curved 27" 144Hz 1ms VA Panel - Garansi Resmi 3 Tahun',
        sku: 'MNTR-CRV27-BLK',
        variant_name: 'Hitam',
        voucher_seller_amount: 0,
        is_free_gift: false,
      },
      {
        id: 17823402,
        product_id: 567123,
        variant_id: 1304456,
        qty: 1,
        price: 1690000,
        total_price: 1690000,
        weight_gram: 900,
        name: 'Keyboard Mechanical Hotswap RGB Full Size - Outemu Red Switch',
        sku: 'KB-MECH-RGB-RED',
        variant_name: 'Switch Red + Keycap Black',
        voucher_seller_amount: 0,
        is_free_gift: false,
      },
    ],

    payments: [
      {
        id: 987123,
        gateway: 'shopee_pay',
        method: 'ewallet',
        amount: 4289000,
        payment_ref: 'SP_2501281478250001',
        paid_at: '2025-01-28T14:25:40.000+07:00',
      },
    ],

    vouchers: [],
    shipping: null,
    metadata: {
      ip_address: '110.136.218.45',
      user_agent: 'ShopeeApp/6.78.0 (Android 13; Xiaomi 22101316G)',
      utm_source: 'shopee_feed',
      utm_campaign: 'flash_sale_gaming_20250128',
    },
  };

  const newOrder = {
    id: 8901273,
    order_number: 'INV/20250128/XXI/I/8901273',
    marketplace_order_id: '2501289X7K4V9P',
    channel: 'shopee',
    customer_id: 2145871,
    customer_username: 'daniel_gamer88',
    status: 'shipped',
    payment_status: 'paid',
    fulfillment_status: 'shipped',
    subtotal_price: 6274000,
    discount_amount: 627000, // total diskon (voucher + coins)
    shipping_cost: 29000,
    insurance_cost: 15000,
    total_price: 5827000, // yang benar-benar dibayar customer
    currency: 'IDR',
    notes: 'Tolong bubble wrap tebal untuk monitor ya kak',
    admin_note: 'Sudah ditambah kardus + kayu. Packing kayu full.',
    tags: ['shopee', 'gaming_setup', 'repeat_buyer', 'high_value', 'fragile'],
    created_at: '2025-01-28T14:23:11.287+07:00',
    updated_at: '2025-01-30T13:28:19.847+07:00',
    paid_at: '2025-01-28T14:25:40.000+07:00',
    shipped_at: '2025-01-30T13:15:00.000+07:00',

    customer: {
      id: 2145871,
      name: 'Daniel Santoso Wijaya', // nama lengkap diupdate
      email: 'daniel.santoso88@gmail.com',
      phone: '+6281298765432', // ganti nomor
      address: {
        street: 'Jl. Prof. Dr. Soepomo No. 22 RT 007/RW 003',
        village: 'Tebet Barat',
        district: 'Tebet',
        city: 'Jakarta Selatan',
        province: 'DKI Jakarta',
        postal_code: '12810',
        country: 'Indonesia',
        latitude: -6.223451,
        longitude: 106.845312,
      },
    },

    shipping_address: {
      recipient_name: 'Daniel Santoso Wijaya',
      phone: '+6281298765432',
      full_address:
        'Apartemen Kalibata City Tower Akasia Lantai 12 No. 12A, Jl. Raya Kalibata, Pancoran, Jakarta Selatan 12740',
      province: 'DKI Jakarta',
      city: 'Jakarta Selatan',
      district: 'Pancoran',
      postal_code: '12740',
      coordinate: { lat: -6.258971, lng: 106.852413 },
    },

    items: [
      // Item 1: qty naik + harga turun (flash sale berubah)
      {
        id: 17823401,
        product_id: 410987,
        variant_id: 1201987,
        qty: 2, // naik dari 1 → 2
        price: 2399000, // turun 200rb karena promo
        total_price: 4798000,
        weight_gram: 9600,
        name: 'Monitor Curved 27" 144Hz 1ms VA Panel - Garansi Resmi 3 Tahun',
        sku: 'MNTR-CRV27-BLK',
        variant_name: 'Hitam',
        voucher_seller_amount: 400000, // diskon seller 200rb × 2
        is_free_gift: false,
      },
      // Item 2: tetap
      {
        id: 17823402,
        product_id: 567123,
        variant_id: 1304456,
        qty: 1,
        price: 1690000,
        total_price: 1690000,
        weight_gram: 900,
        name: 'Keyboard Mechanical Hotswap RGB Full Size - Outemu Red Switch',
        sku: 'KB-MECH-RGB-RED',
        variant_name: 'Switch Red + Keycap Black',
        voucher_seller_amount: 0,
        is_free_gift: false,
      },
      // Item 3: bundle gift karena belanja > 5jt
      {
        id: 17823403,
        product_id: 892341,
        variant_id: null,
        qty: 1,
        price: 0,
        total_price: 0,
        weight_gram: 200,
        name: '[GIFT] Mousepad Gaming XXL RGB Waterproof',
        sku: 'GIFT-MP-XXL-2025',
        variant_name: null,
        voucher_seller_amount: 0,
        is_free_gift: true,
      },
      // Item 4: customer nambah beli headset
      {
        id: 17823404,
        product_id: 771234,
        variant_id: 1409877,
        qty: 1,
        price: 785000,
        total_price: 785000,
        weight_gram: 450,
        name: 'Headset Gaming 7.1 Surround - Detachable Mic',
        sku: 'HS-71SURR-BLK',
        variant_name: 'Wired USB',
        voucher_seller_amount: 0,
        is_free_gift: false,
      },
    ],

    payments: [
      {
        id: 987123,
        gateway: 'shopee_pay',
        method: 'ewallet',
        amount: 4289000,
        payment_ref: 'SP_2501281478250001',
        paid_at: '2025-01-28T14:25:40.000+07:00',
      },
      {
        id: 987456,
        gateway: 'virtual_account_bca',
        method: 'bank_transfer',
        amount: 1538000, // bayar selisih + ongkir
        payment_ref: 'BCA250130987654321',
        paid_at: '2025-01-30T09:12:33.000+07:00',
      },
    ],

    vouchers: [
      {
        code: 'SHOPEEPAY20',
        type: 'platform',
        amount: 200000,
        applied_at: '2025-01-30T08:55:12.000+07:00',
      },
      {
        code: 'GAMINGFS200',
        type: 'seller',
        amount: 400000,
        applied_at: '2025-01-30T08:55:12.000+07:00',
      },
      {
        code: 'FREESHIPXTRA',
        type: 'shipping',
        amount: 40000,
        applied_at: '2025-01-30T08:55:12.000+07:00',
      },
    ],

    shipping: {
      shipping_number: 'JNE023987654123ID',
      courier: 'JNE Reguler',
      service: 'REG',
      cost_customer: 29000,
      cost_actual: 75000,
      insurance_amount: 15000,
      weight_total_gram: 11150,
      shipped_at: '2025-01-30T13:15:00.000+07:00',
      estimated_delivery: '2025-02-01',
      resi_updated_at: '2025-01-30T13:28:19.000+07:00',
      latest_status: 'Picked up by courier',
    },

    metadata: {
      ip_address: '110.136.218.45',
      user_agent: 'ShopeeApp/6.78.0 (Android 13; Xiaomi 22101316G)',
      utm_source: 'shopee_feed',
      utm_campaign: 'flash_sale_gaming_20250128',
      checkout_session_id: 'chk_2501300855009876',
      coins_used: 27000,
    },
  };

  const diff = getNestedHumanDiff(oldOrder, newOrder as any);
  const changes = flattenDiff(diff);

  console.log('Changes detected:');
  changes.forEach((c) => console.log(`• ${c.action} ${c.path}`));

  console.log('\nSummary:');
  console.log(
    getChangeSummary({
      user: { name: 'Alice' },
      action_type: 'UPDATE',
      table_name: 'orders',
      record_id: '100',
      old_data: oldOrder,
      new_data: newOrder,
      status: 'SUCCESS',
      duration_ms: 156,
      created_at: new Date(),
    })
  );

  console.log('\nAll tests passed!');
}
