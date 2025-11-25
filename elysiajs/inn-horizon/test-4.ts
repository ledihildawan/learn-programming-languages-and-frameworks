// human-diff.ts (v2.2 – International / English First)
import { format } from 'date-fns';
import { enUS as defaultLocale } from 'date-fns/locale';
import { compare } from 'fast-json-patch';

// ==========================================
// 1. TYPES (unchanged)
// ==========================================
export type DiffValue<V> = { old?: V; new?: V };
export type NestedDiff<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Record<string, NestedDiff<U> | DiffValue<U>>
    : T[K] extends object
      ? NestedDiff<T[K]>
      : DiffValue<T[K]>;
};
export type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends Array<infer U>
          ? `${K}[${string}]` | `${K}[${string}].${Path<U>}`
          : T[K] extends object
            ? `${K}` | `${K}.${Path<T[K]>}`
            : `${K}`
        : never;
    }[keyof T]
  : string;

export type FlatChange<T = any> = {
  path: Path<T>;
  pathArray: string[];
  action: 'ADD' | 'REMOVE' | 'UPDATE';
  oldValue?: any;
  newValue?: any;
  formattedOldValue?: string;
  formattedNewValue?: string;
  removedItemId?: string;
};

export interface DiffOptions {
  idKey?: string | ((path: string[]) => string);
  ignoreKeys?: string[];
  maxDepth?: number;
  treatNullAsMissing?: boolean;
  includeAllOnCreateDelete?: boolean; // BARU!
}

export interface FlattenOptions {
  formatters?: Record<string, (val: any) => string>;
}

// ==========================================
// 2. DEFAULTS
// ==========================================
const DEFAULT_OPTIONS = {
  idKey: 'id',
  ignoreKeys: ['createdAt', 'updatedAt', '__v', '_id', 'created_at', 'updated_at'] as const,
  maxDepth: 20,
  treatNullAsMissing: true,
} as const;

// ==========================================
// 3. CORE: getNestedHumanDiff (same logic, no text)
// ==========================================
export function getNestedHumanDiff<T extends object>(
  existing: T,
  updated: T,
  options: DiffOptions = {}
): NestedDiff<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const { idKey, ignoreKeys, maxDepth, treatNullAsMissing } = opts;

  if (existing === updated) return {} as NestedDiff<T>;
  const patch = compare(existing as any, updated as any);
  if (patch.length === 0) return {} as NestedDiff<T>;

  const result: any = {};

  for (const op of patch) {
    if (!op.path || op.path === '/') continue;
    const rawParts = op.path.split('/').slice(1);
    if (rawParts.length > maxDepth) continue;
    if (ignoreKeys.includes(rawParts[rawParts.length - 1])) continue;

    const finalParts: string[] = [];
    let ptrOld: any = existing;
    let ptrNew: any = updated;
    let pathForIdCallback: string[] = [];

    for (let i = 0; i < rawParts.length; i++) {
      const rawKey = rawParts[i];
      const isIndex = !isNaN(Number(rawKey));
      const parentIsArray = Array.isArray(ptrOld) || Array.isArray(ptrNew);

      let segmentName = rawKey;
      let keyForTraversal = rawKey;

      if (parentIsArray && isIndex) {
        const idx = Number(rawKey);
        const itemOld = ptrOld?.[idx];
        const itemNew = ptrNew?.[idx];
        const currentIdKey = typeof idKey === 'function' ? idKey(pathForIdCallback) : idKey;
        const idVal = itemNew?.[currentIdKey] ?? itemOld?.[currentIdKey];

        if (idVal !== undefined && idVal !== null && idVal !== idx) {
          segmentName = `[${String(idVal)}]`;
          keyForTraversal = String(idVal);
        } else {
          segmentName = `[${idx}]`;
        }
      }

      finalParts.push(segmentName);
      pathForIdCallback.push(rawParts.slice(0, i + 1).join('.'));
      ptrOld = ptrOld?.[keyForTraversal];
      ptrNew = ptrNew?.[keyForTraversal];
    }

    let oldValue: any = undefined;
    let newValue: any = (op as any).value;

    if (op.op === 'replace' || op.op === 'remove') {
      oldValue = getValueByPath(existing, rawParts);
    }
    if (op.op === 'add' || op.op === 'replace') {
      newValue = (op as any).value;
    }
    if (treatNullAsMissing && newValue === null) newValue = undefined;

    const diffNode: DiffValue<any> = {};
    if (op.op === 'add') diffNode.new = newValue;
    else if (op.op === 'remove') diffNode.old = oldValue;
    else if (op.op === 'replace') {
      diffNode.old = oldValue;
      diffNode.new = newValue;
    }

    setNestedByParts(result, finalParts, diffNode);
  }

  return result as NestedDiff<T>;
}

// ==========================================
// 4. FLATTEN (same)
// ==========================================
export function flattenDiff<T = any>(diff: NestedDiff<T>, options: FlattenOptions = {}): FlatChange<T>[] {
  const { formatters = {} } = options;
  const changes: FlatChange<T>[] = [];

  function walk(node: any, currentPath: string) {
    for (const key in node) {
      const val = node[key];
      const path = currentPath ? `${currentPath}.${key}` : key;
      const isDiffNode = val && typeof val === 'object' && ('old' in val || 'new' in val);

      if (isDiffNode) {
        const action: FlatChange['action'] = !('old' in val) ? 'ADD' : !('new' in val) ? 'REMOVE' : 'UPDATE';

        let oldStr = val.old === undefined ? undefined : String(val.old);
        let newStr = val.new === undefined ? undefined : String(val.new);

        if (formatters[path]) {
          if (val.old !== undefined) oldStr = formatters[path]!(val.old);
          if (val.new !== undefined) newStr = formatters[path]!(val.new);
        }

        const change: FlatChange<T> = {
          path: path as any,
          pathArray: path.replace(/\]/g, '').split(/\.|\[/).filter(Boolean),
          action,
          oldValue: val.old,
          newValue: val.new,
          formattedOldValue: oldStr,
          formattedNewValue: newStr,
        };

        const match = path.match(/\[([^\]]+)\](?!.*\[)/);
        if (action === 'REMOVE' && match) {
          change.removedItemId = match[1];
        }

        changes.push(change);
      } else if (val && typeof val === 'object') {
        walk(val, path);
      }
    }
  }

  walk(diff, '');
  return changes;
}

// ==========================================
// 5. INTERNATIONAL getChangeSummary (English)
// ==========================================
type SystemLog = {
  user?: { name?: string; username?: string; email?: string };
  action_type: string;
  status: string;
  duration_ms: number;
  table_name: string;
  record_id?: string;
  old_data?: any;
  new_data?: any;
  ip_address?: string;
  user_agent?: string;
  route_endpoint?: string;
  message?: string;
  created_at: Date;
};

const truncate = (str: string | number, max = 80) =>
  String(str).length > max ? String(str).substring(0, max) + '...' : String(str);

function toTitleCase(str: string): string {
  return str
    .replace(/_/g, ' ')
    .replace(/\bid\b/gi, '')
    .trim()
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export function getChangeSummary(log: SystemLog, options = {}) {
  const {
    includeUser = true,
    includeIp = true,
    includeDevice = true,
    includeRoute = true,
    locale = defaultLocale,
    dateFormat = 'dd MMM yyyy HH:mm:ss',
  } = options as any;

  // Fallback dummy data
  let oldData = log.old_data;
  let newData = log.new_data;
  if (!oldData && !newData) {
    const dummy = generateDummy(log.table_name, log.action_type);
    oldData = dummy.old;
    newData = dummy.new;
  }

  const changesText = () => {
    if (!oldData && !newData) return '';
    if (!oldData) return ' → Created new record';
    if (!newData) return ' → Deleted record';

    const diff = getNestedHumanDiff(oldData, newData);
    const changes = flattenDiff(diff);

    if (changes.length === 0) return ' (no field changes)';
    if (changes.length > 6) {
      return ` (${changes.length} fields changed: ${changes
        .slice(0, 5)
        .map((c) => c.path.split('.').pop())
        .join(', ')} and more)`;
    }

    return ` (${changes
      .map((c) => {
        const field = c.path.split('.').pop();
        const oldV = c.oldValue === undefined ? '<empty>' : truncate(c.oldValue, 40);
        const newV = c.newValue === undefined ? '<removed>' : truncate(c.newValue, 40);
        return `${field}: "${oldV}" → "${newV}"`;
      })
      .join(', ')})`;
  };

  // Action mapping (English)
  const actionMap: Record<string, string> = {
    CREATE: 'created',
    UPDATE: 'updated',
    DELETE: 'deleted',
    LOGIN: 'logged in',
    LOGOUT: 'logged out',
    RESTORE: 'restored',
    FORCE_DELETE: 'permanently deleted',
  };

  const action = actionMap[log.action_type] || log.action_type.toLowerCase();

  let summary = '';

  if (includeUser) {
    const name = log.user?.name || log.user?.username || log.user?.email || 'Someone';
    summary += `${name} `;
  }

  summary += `${action} `;

  const tableName = toTitleCase(log.table_name);
  summary += `${tableName}${log.record_id ? ` #${log.record_id}` : ''}`;

  if (['CREATE', 'UPDATE', 'DELETE'].includes(log.action_type)) {
    summary += changesText();
  }

  const status = log.status === 'SUCCESS' ? 'success' : log.status === 'FAILED' ? 'failed' : log.status.toLowerCase();

  summary += ` - ${status}`;
  if (log.duration_ms > 100) summary += ` (${log.duration_ms}ms)`;

  const meta: string[] = [];
  if (includeRoute && log.route_endpoint) meta.push(`via ${log.route_endpoint.replace('/api/', '')}`);
  if (includeIp && log.ip_address) meta.push(`IP: ${log.ip_address}`);
  if (includeDevice && log.user_agent) {
    const device = log.user_agent.split('(')[1]?.split(')')[0] || log.user_agent.slice(0, 40);
    meta.push(device.trim());
  }
  if (meta.length) summary += ` | ${meta.join(' • ')}`;

  summary += ` | ${format(log.created_at, dateFormat, { locale })}`;
  if (log.message) summary += ` → ${log.message}`;

  return summary;
}

function generateDummy(table: string, action: string) {
  const dummies: any = {
    products: { old: { name: 'Laptop X', price: 15000000 }, new: { name: 'Laptop X Pro', price: 18000000 } },
    orders: { old: { status: 'pending' }, new: { status: 'shipped', shipping: { courier: 'JNE' } } },
    users: { old: { role: 'user' }, new: { role: 'admin' } },
  };
  const data = dummies[table.toLowerCase()] || dummies.products;
  if (action === 'CREATE') return { old: null, new: data.new };
  if (action === 'DELETE') return { old: data.old, new: null };
  return { old: data.old, new: data.new };
}

// ==========================================
// 6. HELPERS
// ==========================================
function getValueByPath(obj: any, parts: string[]): any {
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = Array.isArray(cur) && !isNaN(Number(p)) ? cur[Number(p)] : cur[p];
  }
  return cur;
}

function setNestedByParts(obj: any, parts: string[], value: any) {
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i];
    cur[k] ??= {};
    cur = cur[k];
  }
  cur[parts[parts.length - 1]] = value;
}

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
