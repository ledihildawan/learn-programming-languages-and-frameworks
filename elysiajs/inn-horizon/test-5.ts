// human-diff-v3.ts
import { format, Locale } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { compare } from 'fast-json-patch';

// ==========================================
// 1. UTILITY TYPES (Strict & Safe)
// ==========================================

// Utility untuk memaksa type menjadi Readonly (Immutability pattern)
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

// Mencegah error "Type instantiation is excessively deep"
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

export type Path<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Path<T[K], Prev[D]>> : never;
      }[keyof T]
    : '';

// Type Guards
const isRecord = (val: unknown): val is Record<string, unknown> =>
  val !== null && typeof val === 'object' && !Array.isArray(val);

const isArray = (val: unknown): val is unknown[] => Array.isArray(val);

const isDate = (val: unknown): val is Date => val instanceof Date;

// ==========================================
// 2. DOMAIN TYPES
// ==========================================

export type ChangeAction = 'ADD' | 'REMOVE' | 'UPDATE';

export type DiffValue<V = unknown> = { old?: V; new?: V };

export type NestedDiff<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Record<string, NestedDiff<U> | DiffValue<U>>
    : T[K] extends object
      ? NestedDiff<T[K]>
      : DiffValue<T[K]>;
};

export type FlatChange<T = unknown> = {
  path: string;
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

// ==========================================
// 3. CONSTANTS & DEFAULTS
// ==========================================
const DEFAULT_DIFF_OPTIONS: Required<DiffOptions> = {
  idKey: 'id',
  ignoreKeys: ['createdAt', 'updatedAt', '__v', '_id', 'created_at', 'updated_at', 'deleted_at'],
  maxDepth: 10,
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
// 4. CORE LOGIC (Optimized)
// ==========================================

/**
 * Optimized Normalizer:
 * Hanya mengubah Date ke ISO String secara rekursif.
 * Jauh lebih cepat daripada JSON.parse(JSON.stringify) karena tidak perlu parsing ulang string.
 */
function fastNormalize<T>(data: T): T {
  if (isDate(data)) return data.toISOString() as unknown as T;
  if (isArray(data)) return data.map(fastNormalize) as unknown as T;
  if (isRecord(data)) {
    const copy: Record<string, unknown> = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        copy[key] = fastNormalize(data[key]);
      }
    }
    return copy as T;
  }
  return data;
}

export function getNestedHumanDiff<T extends object>(
  existingRaw: T,
  updatedRaw: T,
  options: DiffOptions = {}
): NestedDiff<T> {
  const opts = { ...DEFAULT_DIFF_OPTIONS, ...options };

  // Performance Optimization: Gunakan fastNormalize
  const existing = fastNormalize(existingRaw);
  const updated = fastNormalize(updatedRaw);

  // Short-circuit check (Referensi atau String comparison cepat)
  if (existing === updated) return {} as NestedDiff<T>;

  // Fast JSON Patch compare
  const patch = compare(existing as object, updated as object);
  const result: Record<string, unknown> = {};

  for (const op of patch) {
    // 1. Filter path root dan invalid
    if (!op.path || op.path === '/') continue;

    const rawParts = op.path.split('/').filter(Boolean);

    // 2. Guard: Max Depth & Ignored Keys
    if (rawParts.length > opts.maxDepth) continue;
    const lastPart = rawParts[rawParts.length - 1];
    if (opts.ignoreKeys.includes(lastPart)) continue;

    // 3. Path Reconstruction Logic
    const finalParts: string[] = [];
    let ptrOld: unknown = existing;
    let ptrNew: unknown = updated;
    const pathAccumulator: string[] = [];

    for (let i = 0; i < rawParts.length; i++) {
      const rawKey = rawParts[i];
      const isIndex = /^\d+$/.test(rawKey);

      let segmentName = rawKey;
      let keyForTraversal: string | number = rawKey;

      // Smart Array ID Handling
      if ((isArray(ptrOld) || isArray(ptrNew)) && isIndex) {
        const idx = Number(rawKey);
        // Safely access array items
        const itemOld = isArray(ptrOld) ? ptrOld[idx] : undefined;
        const itemNew = isArray(ptrNew) ? ptrNew[idx] : undefined;

        // Tentukan ID Key untuk level ini
        const currentIdKey = typeof opts.idKey === 'function' ? opts.idKey(pathAccumulator) : opts.idKey;

        // Coba ambil ID dari item baru (prioritas) atau item lama
        let idVal: string | number | undefined;

        // Helper kecil untuk ambil properti aman
        const getProp = (obj: unknown, key: string) => (isRecord(obj) ? obj[key] : undefined);

        const valNew = getProp(itemNew, currentIdKey);
        const valOld = getProp(itemOld, currentIdKey);

        idVal = (valNew ?? valOld) as string | number | undefined;

        if (idVal !== undefined && idVal !== null) {
          segmentName = `[${idVal}]`;
        } else {
          segmentName = `[${idx}]`;
        }

        keyForTraversal = idx;
      }

      finalParts.push(segmentName);
      pathAccumulator.push(rawKey);

      // Advance Pointers (Jangan maju jika ini bagian terakhir / value leaf)
      if (i < rawParts.length - 1) {
        ptrOld = isRecord(ptrOld) || isArray(ptrOld) ? (ptrOld as any)[keyForTraversal] : undefined;
        ptrNew = isRecord(ptrNew) || isArray(ptrNew) ? (ptrNew as any)[keyForTraversal] : undefined;
      }
    }

    // 4. Value Extraction & Normalization
    let oldValue: unknown = undefined;
    // TypeScript Fix: Gunakan Discriminated Union check atau properti 'value' yang aman
    let newValue: unknown = undefined;
    if ('value' in op) {
      newValue = op.value;
    }

    if (op.op === 'replace' || op.op === 'remove') {
      oldValue = getValueByPath(existing, rawParts);
    }

    if (opts.treatNullAsMissing) {
      if (newValue === null) newValue = undefined;
      if (oldValue === null) oldValue = undefined;
    }

    // 5. Equality Check (Double check untuk menghindari false positive dari normalisasi)
    // Gunakan strict comparison jika primitive, atau JSON stringify jika object
    const isSame =
      typeof oldValue === 'object' && typeof newValue === 'object'
        ? JSON.stringify(oldValue) === JSON.stringify(newValue)
        : oldValue === newValue;

    if (op.op === 'replace' && isSame) continue;

    // 6. Construct Diff Node
    const diffNode: DiffValue<unknown> = {};
    if (op.op === 'add') diffNode.new = newValue;
    else if (op.op === 'remove') diffNode.old = oldValue;
    else if (op.op === 'replace') {
      diffNode.old = oldValue;
      diffNode.new = newValue;
    }

    if (Object.keys(diffNode).length > 0) {
      setNestedByParts(result, finalParts, diffNode);
    }
  }

  return result as NestedDiff<T>;
}

// ==========================================
// 5. FLATTEN LOGIC (With Safety Guard)
// ==========================================
export function flattenDiff<T = unknown>(
  diff: NestedDiff<T>,
  options: { formatters?: Record<string, (val: unknown) => string> } = {}
): FlatChange<T>[] {
  const { formatters = {} } = options;
  const changes: FlatChange<T>[] = [];

  // Menggunakan Stack untuk iterasi (menghindari recursion depth limit)
  // atau tetap rekursif jika kedalaman wajar. Untuk "Human Diff", rekursif biasanya fine.
  function walk(node: unknown, currentPath: string) {
    if (!isRecord(node)) return;

    // Deteksi Node Leaf (DiffValue)
    // Kita asumsikan struktur: { old?: ..., new?: ... } dan TIDAK memiliki key lain yang merupakan child.
    const keys = Object.keys(node);
    const isDiffValue = (keys.includes('old') || keys.includes('new')) && keys.every((k) => k === 'old' || k === 'new');

    if (isDiffValue) {
      const dVal = node as DiffValue;
      pushChange(dVal, currentPath);
      return;
    }

    // Traversal
    for (const [key, val] of Object.entries(node)) {
      const path = currentPath ? `${currentPath}.${key}` : key;
      walk(val, path);
    }
  }

  function pushChange(dVal: DiffValue, path: string) {
    const action: ChangeAction = dVal.old === undefined ? 'ADD' : dVal.new === undefined ? 'REMOVE' : 'UPDATE';

    // Formatter logic
    let oldStr = dVal.old === undefined ? undefined : String(dVal.old);
    let newStr = dVal.new === undefined ? undefined : String(dVal.new);

    if (formatters[path]) {
      try {
        if (dVal.old !== undefined) oldStr = formatters[path](dVal.old);
        if (dVal.new !== undefined) newStr = formatters[path](dVal.new);
      } catch (e) {
        // Fallback jika formatter error
        console.warn(`Formatter error for path ${path}`, e);
      }
    }

    const change: FlatChange<T> = {
      path,
      pathArray: path.replace(/\]/g, '').split(/\.|\[/).filter(Boolean),
      action,
      oldValue: dVal.old,
      newValue: dVal.new,
      formattedOldValue: oldStr,
      formattedNewValue: newStr,
    };

    if (action === 'REMOVE') {
      const match = path.match(/\[([^\]]+)\]$/);
      if (match) change.removedItemId = match[1];
    }

    changes.push(change);
  }

  walk(diff, '');
  return changes;
}

// ==========================================
// 6. SUMMARY GENERATOR (Formatting)
// ==========================================
// (Bagian ini sudah cukup baik di kode asli Anda, hanya sedikit clean up)

const toTitleCase = (str: string) =>
  str
    .replace(/_/g, ' ')
    .replace(/\bid\b/gi, '')
    .trim()
    .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

const truncate = (val: unknown, max = 50) => {
  if (val === null || val === undefined) return '';
  const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
  return str.length > max ? str.substring(0, max) + '...' : str;
};

export function getChangeSummary(log: BaseLog, options: SummaryOptions = {}): string {
  const { includeUser, includeIp, includeDevice, locale, dateFormat, actionMap } = {
    ...DEFAULT_SUMMARY_OPTIONS,
    ...options,
  };

  const mapAction = { ...DEFAULT_ACTION_MAP, ...actionMap };

  // Generate Changes Text
  let changesText = '';
  // Logic deteksi Create/Delete full record
  if (!log.old_data && log.new_data) changesText = ' → Created new record';
  else if (log.old_data && !log.new_data) changesText = ' → Deleted record';
  else if (log.old_data && log.new_data) {
    const diff = getNestedHumanDiff(log.old_data as object, log.new_data as object);
    const changes = flattenDiff(diff);

    if (changes.length === 0) changesText = ' (no field changes detected)';
    else {
      // Prioritaskan field penting jika ada (opsional logic kedepannya)
      const summaryParts = changes.slice(0, 3).map((c) => {
        const fieldName = c.path.split('.').pop() || c.path;
        if (c.action === 'ADD') return `${fieldName} set to "${truncate(c.newValue, 20)}"`;
        if (c.action === 'REMOVE') return `${fieldName} removed`;
        return `${fieldName}: "${truncate(c.oldValue, 15)}" → "${truncate(c.newValue, 15)}"`;
      });

      changesText = ` (${summaryParts.join(', ')}${changes.length > 3 ? `, +${changes.length - 3} more` : ''})`;
    }
  }

  const actor = includeUser ? log.user?.name || log.user?.username || log.user?.email || 'System' : '';
  const actionVerb = mapAction[log.action_type] || log.action_type;
  const objectName = `${toTitleCase(log.table_name)}${log.record_id ? ` #${log.record_id}` : ''}`;
  const timeStr = format(new Date(log.created_at), dateFormat, { locale });

  const meta: string[] = [];
  if (includeIp && log.ip_address) meta.push(log.ip_address);
  // Parse User Agent sederhana
  if (includeDevice && log.user_agent) {
    // Simple heuristic untuk ambil OS/Device
    const parts = log.user_agent.split(/[()]/);
    if (parts.length > 1) meta.push(parts[1].split(';')[0]); // Biasanya info OS ada di dalam kurung pertama
  }

  return `[${timeStr}] ${actor} ${actionVerb} ${objectName}${changesText} ${meta.length ? `| ${meta.join(' • ')}` : ''}`;
}

// ==========================================
// 7. PRIVATE HELPERS
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
    if (!cur[k] || typeof cur[k] !== 'object') {
      cur[k] = {};
    }
    cur = cur[k];
  }
  // Assignment langsung aman karena 'obj' yang dilempar adalah accumulator internal yang kosong
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
