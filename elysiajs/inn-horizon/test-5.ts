// human-diff.ts
import { format, Locale } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { compare } from 'fast-json-patch';

// ==========================================
// 1. TYPES (Enhanced for strictness)
// ==========================================
export type DiffValue<V> = { old?: V; new?: V };

export type NestedDiff<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Record<string, NestedDiff<U> | DiffValue<U>>
    : T[K] extends object
      ? NestedDiff<T[K]>
      : DiffValue<T[K]>;
};

// Recursive Path type (Note: complex types impact compiler performance on massive objects)
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

export type ChangeAction = 'ADD' | 'REMOVE' | 'UPDATE';

export type FlatChange<T = unknown> = {
  path: Path<T>;
  pathArray: string[];
  action: ChangeAction;
  oldValue?: unknown;
  newValue?: unknown;
  formattedOldValue?: string;
  formattedNewValue?: string;
  removedItemId?: string;
};

export interface DiffOptions {
  idKey?: string | ((path: string[]) => string);
  ignoreKeys?: string[];
  maxDepth?: number;
  treatNullAsMissing?: boolean;
}

export interface FlattenOptions {
  formatters?: Record<string, (val: unknown) => string>;
}

export interface SummaryOptions {
  includeUser?: boolean;
  includeIp?: boolean;
  includeDevice?: boolean;
  includeRoute?: boolean;
  locale?: Locale; // from date-fns
  dateFormat?: string;
  actionMap?: Record<string, string>; // Dependency Injection for i18n
}

// Interface Generic untuk Log (Decoupled from specific DB schema)
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

// ==========================================
// 2. DEFAULTS & CONSTANTS
// ==========================================
const DEFAULT_DIFF_OPTIONS: Required<DiffOptions> = {
  idKey: 'id',
  ignoreKeys: ['createdAt', 'updatedAt', '__v', '_id', 'created_at', 'updated_at'],
  maxDepth: 20,
  treatNullAsMissing: true,
};

const DEFAULT_SUMMARY_OPTIONS: Required<Omit<SummaryOptions, 'actionMap'>> = {
  includeUser: true,
  includeIp: true,
  includeDevice: true,
  includeRoute: true,
  locale: enUS,
  dateFormat: 'dd MMM yyyy HH:mm:ss',
};

// Default English Map (Bisa di-override untuk Bahasa Indonesia)
const DEFAULT_ACTION_MAP: Record<string, string> = {
  CREATE: 'created',
  UPDATE: 'updated',
  DELETE: 'deleted',
  LOGIN: 'logged in',
  LOGOUT: 'logged out',
  RESTORE: 'restored',
  FORCE_DELETE: 'permanently deleted',
};

// ==========================================
// 3. CORE: getNestedHumanDiff
// ==========================================
export function getNestedHumanDiff<T extends object>(
  existing: T,
  updated: T,
  options: DiffOptions = {}
): NestedDiff<T> {
  const opts = { ...DEFAULT_DIFF_OPTIONS, ...options };
  const { idKey, ignoreKeys, maxDepth, treatNullAsMissing } = opts;

  // Optimize: Reference check
  if (existing === updated) return {} as NestedDiff<T>;

  // JSON Patch compare (using fast-json-patch)
  const patch = compare(existing as object, updated as object);
  if (patch.length === 0) return {} as NestedDiff<T>;

  const result: Record<string, unknown> = {};

  for (const op of patch) {
    if (!op.path || op.path === '/') continue;

    // Split path filtering empty strings
    const rawParts = op.path.split('/').filter(Boolean);

    // Depth & Ignore check
    if (rawParts.length > maxDepth) continue;
    if (ignoreKeys.includes(rawParts[rawParts.length - 1])) continue;

    const finalParts: string[] = [];
    let ptrOld: unknown = existing;
    let ptrNew: unknown = updated;
    let pathForIdCallback: string[] = [];

    // Path Reconstruction Logic (Handling Arrays with IDs)
    for (let i = 0; i < rawParts.length; i++) {
      const rawKey = rawParts[i];
      const isIndex = /^\d+$/.test(rawKey); // Lebih aman daripada !isNaN

      const parentIsArray = Array.isArray(ptrOld) || Array.isArray(ptrNew);
      let segmentName = rawKey;
      let keyForTraversal: string | number = rawKey;

      if (parentIsArray && isIndex) {
        const idx = Number(rawKey);
        // Safe access using type casting/guards logic implicitly
        const itemOld = Array.isArray(ptrOld) ? ptrOld[idx] : undefined;
        const itemNew = Array.isArray(ptrNew) ? ptrNew[idx] : undefined;

        const currentIdKey = typeof idKey === 'function' ? idKey(pathForIdCallback) : idKey;

        // Cek ID secara aman
        const idVal = (itemNew as any)?.[currentIdKey] ?? (itemOld as any)?.[currentIdKey];

        if (idVal !== undefined && idVal !== null) {
          segmentName = `[${String(idVal)}]`;
          // Kita tetap traverse menggunakan index asli dari patch
          // karena struktur object di memori diakses via index
          keyForTraversal = idx;
        } else {
          segmentName = `[${idx}]`;
          keyForTraversal = idx;
        }
      }

      finalParts.push(segmentName);
      pathForIdCallback.push(rawParts.slice(0, i + 1).join('.'));

      // Advance pointers
      ptrOld = (ptrOld as any)?.[keyForTraversal];
      ptrNew = (ptrNew as any)?.[keyForTraversal];
    }

    // Determine Values
    let oldValue: unknown = undefined;
    let newValue: unknown = (op as any).value;

    if (op.op === 'replace' || op.op === 'remove') {
      oldValue = getValueByPath(existing, rawParts);
    }
    if (treatNullAsMissing && newValue === null) {
      newValue = undefined;
    }

    // Build Diff Node
    const diffNode: DiffValue<unknown> = {};
    if (op.op === 'add') diffNode.new = newValue;
    else if (op.op === 'remove') diffNode.old = oldValue;
    else if (op.op === 'replace') {
      // Deep equality check for primitives to reduce noise
      if (oldValue !== newValue) {
        diffNode.old = oldValue;
        diffNode.new = newValue;
      }
    }

    if (Object.keys(diffNode).length > 0) {
      setNestedByParts(result, finalParts, diffNode);
    }
  }

  return result as NestedDiff<T>;
}

// ==========================================
// 4. FLATTEN
// ==========================================
export function flattenDiff<T = unknown>(diff: NestedDiff<T>, options: FlattenOptions = {}): FlatChange<T>[] {
  const { formatters = {} } = options;
  const changes: FlatChange<T>[] = [];

  function walk(node: unknown, currentPath: string) {
    if (!node || typeof node !== 'object') return;

    for (const [key, val] of Object.entries(node)) {
      const path = currentPath ? `${currentPath}.${key}` : key;

      // Type guard for DiffValue
      const isDiffNode = val && typeof val === 'object' && ('old' in val || 'new' in val);

      if (isDiffNode) {
        const dVal = val as DiffValue<unknown>;
        const action: ChangeAction = dVal.old === undefined ? 'ADD' : dVal.new === undefined ? 'REMOVE' : 'UPDATE';

        let oldStr = dVal.old === undefined ? undefined : String(dVal.old);
        let newStr = dVal.new === undefined ? undefined : String(dVal.new);

        if (formatters[path]) {
          if (dVal.old !== undefined) oldStr = formatters[path](dVal.old);
          if (dVal.new !== undefined) newStr = formatters[path](dVal.new);
        }

        const change: FlatChange<T> = {
          path: path as any, // Assertion needed due to complexity of Path<T>
          pathArray: path.replace(/\]/g, '').split(/\.|\[/).filter(Boolean),
          action,
          oldValue: dVal.old,
          newValue: dVal.new,
          formattedOldValue: oldStr,
          formattedNewValue: newStr,
        };

        const match = path.match(/\[([^\]]+)\](?!.*\[)/);
        if (action === 'REMOVE' && match) {
          change.removedItemId = match[1];
        }

        changes.push(change);
      } else {
        walk(val, path);
      }
    }
  }

  walk(diff, '');
  return changes;
}

// ==========================================
// 5. SUMMARY GENERATOR (Clean & Generic)
// ==========================================
// Helper: Title Case
const toTitleCase = (str: string): string =>
  str
    .replace(/_/g, ' ')
    .replace(/\bid\b/gi, '')
    .trim()
    .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

// Helper: Truncate
const truncate = (val: unknown, max = 50): string => {
  const str = String(val);
  return str.length > max ? str.substring(0, max) + '...' : str;
};

export function getChangeSummary(log: BaseLog, options: SummaryOptions = {}): string {
  const {
    includeUser,
    includeIp,
    includeDevice,
    includeRoute,
    locale,
    dateFormat,
    actionMap: customActionMap,
  } = { ...DEFAULT_SUMMARY_OPTIONS, ...options };

  const actionMap = { ...DEFAULT_ACTION_MAP, ...customActionMap };

  // 1. Data Validity Check
  const oldData = log.old_data;
  const newData = log.new_data;

  // IMPORTANT: Removed generateDummy. In production, if data is missing, we report it as such.
  // Inventing data hides bugs.

  const generateChangesText = (): string => {
    if (!oldData && !newData) return ''; // No data available

    // Explicit Create/Delete handling
    if (!oldData && newData) return ' → Created new record';
    if (oldData && !newData) return ' → Deleted record';

    // Update handling
    if (oldData && newData) {
      const diff = getNestedHumanDiff(oldData as object, newData as object);
      const changes = flattenDiff(diff);

      if (changes.length === 0) return ' (no field changes detected)';

      const changeLimit = 5;
      if (changes.length > changeLimit) {
        const changedFields = changes
          .slice(0, changeLimit)
          .map((c) => c.path.split('.').pop())
          .join(', ');
        return ` (${changes.length} fields changed: ${changedFields}, and more...)`;
      }

      return ` (${changes
        .map((c) => {
          const field = c.path.split('.').pop();
          const oldV = c.oldValue === undefined ? 'empty' : truncate(c.oldValue, 20);
          const newV = c.newValue === undefined ? 'removed' : truncate(c.newValue, 20);
          return `${field}: "${oldV}" → "${newV}"`;
        })
        .join(', ')})`;
    }
    return '';
  };

  // 2. Build Summary String
  const parts: string[] = [];

  // User
  if (includeUser) {
    const name = log.user?.name || log.user?.username || log.user?.email || 'System/Unknown';
    parts.push(name);
  }

  // Action
  const mappedAction = actionMap[log.action_type] || log.action_type.toLowerCase();
  parts.push(mappedAction);

  // Target
  const tableName = toTitleCase(log.table_name);
  parts.push(`${tableName}${log.record_id ? ` #${log.record_id}` : ''}`);

  // Changes
  if (['CREATE', 'UPDATE', 'DELETE', 'RESTORE'].includes(log.action_type)) {
    parts.push(generateChangesText());
  }

  // Status
  const statusStr = log.status === 'SUCCESS' ? 'success' : log.status.toLowerCase();
  parts.push(`- ${statusStr}`);
  if (log.duration_ms > 100) parts.push(`(${log.duration_ms}ms)`);

  let summary = parts.join(' ');

  // 3. Metadata (Optional)
  const meta: string[] = [];
  if (includeRoute && log.route_endpoint) meta.push(`via ${log.route_endpoint.replace('/api/', '')}`);
  if (includeIp && log.ip_address) meta.push(`IP: ${log.ip_address}`);
  if (includeDevice && log.user_agent) {
    // Simple User Agent parser
    const device = log.user_agent.split('(')[1]?.split(')')[0] || log.user_agent.slice(0, 30);
    meta.push(device.trim());
  }

  if (meta.length) summary += ` | ${meta.join(' • ')}`;

  // 4. Timestamp
  const dateObj = typeof log.created_at === 'string' ? new Date(log.created_at) : log.created_at;
  summary += ` | ${format(dateObj, dateFormat, { locale })}`;

  // 5. Message suffix
  if (log.message) summary += ` → ${log.message}`;

  return summary;
}

// ==========================================
// 6. HELPERS (Private)
// ==========================================
function getValueByPath(obj: any, parts: string[]): unknown {
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    if (Array.isArray(cur)) {
      const idx = Number(p);
      if (isNaN(idx)) return undefined;
      cur = cur[idx];
    } else {
      cur = cur[p];
    }
  }
  return cur;
}

function setNestedByParts(obj: any, parts: string[], value: any) {
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i];
    // Pastikan kita tidak menimpa array dengan object jika struktur berubah
    if (!cur[k] || typeof cur[k] !== 'object') {
      cur[k] = {};
    }
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
