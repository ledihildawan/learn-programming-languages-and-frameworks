// human-diff.ts (v3.0 - Ultimate Edition)
import { compare } from 'fast-json-patch';

// ==========================================
// 1. ADVANCED TYPES
// ==========================================

// Discriminator untuk membedakan DiffNode asli vs Data user yg mirip
const DIFF_FLAG = Symbol('DiffNode');

export type DiffValue<V> = {
  [DIFF_FLAG]: true; // Penanda unik (tidak akan muncul di JSON stringify)
  type: 'created' | 'deleted' | 'updated' | 'moved';
  old?: V;
  new?: V;
};

/** Nested diff tree */
export type NestedDiff<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Record<string, NestedDiff<U> | DiffValue<U>>
    : T[K] extends object
      ? NestedDiff<T[K]>
      : DiffValue<T[K]>;
};

/** Recursive Path Helper */
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

// ==========================================
// 2. CONFIG & OPTIONS
// ==========================================
export interface DiffOptions {
  idKey?: string | ((path: string[]) => string);
  ignoreKeys?: string[];
  maxDepth?: number;
  treatNullAsMissing?: boolean;
  /** Abaikan jika nilai berubah tapi secara loose equality sama (misal 1 vs "1") */
  ignoreLooseTypeChanges?: boolean;
}

export interface FlattenOptions {
  prefix?: string;
  formatters?: Record<string, (val: any, type: 'old' | 'new') => string>;
  /** Custom text untuk summary */
  dictionary?: {
    added?: string;
    removed?: string;
    updated?: string;
    moved?: string;
  };
}

const DEFAULT_OPTS = {
  idKey: 'id',
  ignoreKeys: ['createdAt', 'updatedAt', '__v', '_id'],
  maxDepth: 20,
  treatNullAsMissing: true,
  ignoreLooseTypeChanges: false,
} as const;

// ==========================================
// 3. MAIN CORE
// ==========================================
export function getNestedHumanDiff<T extends object>(
  existing: T,
  updated: T,
  options: DiffOptions = {}
): NestedDiff<T> {
  const opts = { ...DEFAULT_OPTS, ...options };
  const { idKey, ignoreKeys, maxDepth, treatNullAsMissing } = opts;

  if (existing === updated) return {} as NestedDiff<T>;

  const patch = compare(existing as any, updated as any);
  const result: any = {};

  // Helper untuk mengecek DiffValue
  const createDiffNode = (type: DiffValue<any>['type'], oldV: any, newV: any): DiffValue<any> => ({
    [DIFF_FLAG]: true,
    type,
    old: oldV,
    new: newV,
  });

  for (const op of patch) {
    if (!op.path || op.path === '/') continue;

    const rawParts = op.path.split('/').slice(1); // ['items', '0', 'price']
    if (rawParts.length > maxDepth) continue;

    // Skip ignored keys
    if (ignoreKeys.includes(rawParts[rawParts.length - 1])) continue;

    // --- PATH RESOLUTION (INDEX -> ID) ---
    const finalParts: string[] = [];
    let ptrOld: any = existing;
    let ptrNew: any = updated;
    let currentPathArr: string[] = [];

    // Kita traverse struktur untuk mengubah index array menjadi [ID]
    for (let i = 0; i < rawParts.length; i++) {
      const key = rawParts[i];
      const isIndex = !Number.isNaN(Number(key));
      const parentIsArray = Array.isArray(ptrOld) || Array.isArray(ptrNew);

      if (parentIsArray && isIndex) {
        const idx = Number(key);
        const itemNew = ptrNew?.[idx];
        const itemOld = ptrOld?.[idx];

        // Tentukan ID key dinamis
        const currentIdKey = typeof idKey === 'function' ? idKey(currentPathArr) : idKey;

        // Prioritas ambil ID dari item baru, lalu item lama (jika dihapus)
        const idVal = itemNew?.[currentIdKey] ?? itemOld?.[currentIdKey];

        finalParts.push(idVal != null ? `[${idVal}]` : `[${idx}]`);
      } else {
        finalParts.push(key);
      }

      currentPathArr.push(rawParts.slice(0, i + 1).join('.'));
      ptrOld = ptrOld?.[key];
      ptrNew = ptrNew?.[key];
    }

    // --- VALUE RESOLUTION ---
    let oldValue: any;
    let newValue: any = (op as any).value;

    // Handling berdasarkan tipe operasi JSON Patch
    if (op.op === 'replace' || op.op === 'remove' || op.op === 'move') {
      oldValue = getValueByPathParts(existing, rawParts);
    }

    // Normalisasi Null/Undefined
    if (treatNullAsMissing) {
      if (newValue === null) newValue = undefined;
      if (oldValue === null) oldValue = undefined;
    }

    // Deep Check Redundancy (Opsional untuk safety)
    if (isDeepEqual(oldValue, newValue)) continue;

    // Tentukan tipe perubahan
    let diffNode: DiffValue<any> | null = null;

    switch (op.op) {
      case 'add':
        diffNode = createDiffNode('created', undefined, newValue);
        break;
      case 'remove':
        diffNode = createDiffNode('deleted', oldValue, undefined);
        break;
      case 'replace':
        diffNode = createDiffNode('updated', oldValue, newValue);
        break;
      case 'move':
        // Move agak tricky. Di visual diff, biasanya kita anggap remove di tempat lama & add di tempat baru
        // atau kita tandai sebagai 'moved'. Untuk simplicity kita anggap updated value (posisi).
        // Namun karena kita memapping by ID, 'move' index seringkali tidak mengubah path ID
        // KECUALI jika urutan di UI penting.
        // Jika path by ID sama, berarti item itu cuma pindah urutan.
        // Kita skip jika user tidak peduli urutan, atau kita flag khusus.
        diffNode = createDiffNode('moved', oldValue, getValueByPathParts(updated, rawParts));
        break;
    }

    if (diffNode) {
      setNestedByParts(result, finalParts, diffNode);
    }
  }

  return result as NestedDiff<T>;
}

// ==========================================
// 4. FLATTENING & FORMATTING
// ==========================================
export type FlatChange<T = any> = {
  path: Path<T>;
  key: string; // leaf key (misal: 'price')
  action: 'ADD' | 'REMOVE' | 'UPDATE' | 'MOVE';
  oldValue?: any;
  newValue?: any;
  sentence: string; // Human sentence: "Harga berubah dari 10k ke 20k"
  removedItemId?: string;
};

export function flattenDiff<T = any>(diff: NestedDiff<T>, options: FlattenOptions = {}): FlatChange<T>[] {
  const {
    prefix = '',
    formatters = {},
    dictionary = { added: 'ditambah', removed: 'dihapus', updated: 'diubah', moved: 'dipindah' },
  } = options;

  const changes: FlatChange<T>[] = [];

  function walk(node: any, currentPath: string) {
    if (!node || typeof node !== 'object') return;

    for (const key in node) {
      const val = node[key];
      const path = currentPath ? `${currentPath}.${key}` : key;

      // CEK 1: Apakah ini DiffNode kita? (Gunakan Symbol check untuk safety 100%)
      if (val && val[DIFF_FLAG] === true) {
        const dVal = val as DiffValue<any>;

        let fmtOld = dVal.old;
        let fmtNew = dVal.new;

        // Formatter
        const formatter = formatters[path];
        if (formatter) {
          if (dVal.old !== undefined) fmtOld = formatter(dVal.old, 'old');
          if (dVal.new !== undefined) fmtNew = formatter(dVal.new, 'new');
        } else {
          // Default primitive formatter
          if (fmtOld instanceof Date) fmtOld = fmtOld.toISOString();
          if (fmtNew instanceof Date) fmtNew = fmtNew.toISOString();
        }

        // Action mapping
        const actionMap: Record<string, FlatChange<T>['action']> = {
          created: 'ADD',
          deleted: 'REMOVE',
          updated: 'UPDATE',
          moved: 'MOVE',
        };

        // Build Sentence
        let sentence = '';
        const label = key.replace(/_/g, ' '); // simple humanize key

        if (dVal.type === 'created') sentence = `${label} ${dictionary.added}: ${fmtNew}`;
        else if (dVal.type === 'deleted') sentence = `${label} ${dictionary.removed}: ${fmtOld}`;
        else if (dVal.type === 'moved') sentence = `${label} ${dictionary.moved}`;
        else sentence = `${label} ${dictionary.updated} dari ${fmtOld} menjadi ${fmtNew}`;

        const change: FlatChange<T> = {
          path: path as Path<T>,
          key,
          action: actionMap[dVal.type],
          oldValue: dVal.old,
          newValue: dVal.new,
          sentence,
        };

        // Extract ID for removals (Regex capture [ID])
        const idMatch = path.match(/\[([^\]]+)\]$/);
        if (dVal.type === 'deleted' && idMatch) {
          change.removedItemId = idMatch[1];
        }

        changes.push(change);
      }
      // RECURSIVE WALK
      else {
        walk(val, path);
      }
    }
  }

  walk(diff, prefix);
  return changes;
}

// ==========================================
// 5. UTILS (Helpers)
// ==========================================
function getValueByPathParts(obj: any, parts: string[]) {
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = Array.isArray(cur) && !Number.isNaN(Number(p)) ? cur[Number(p)] : cur[p];
  }
  return cur;
}

function setNestedByParts(obj: any, parts: string[], value: any) {
  let cur = obj;
  for (let i = 0; i < parts.length; i++) {
    const key = parts[i];
    if (i === parts.length - 1) {
      cur[key] = value;
    } else {
      cur[key] ??= {};
      cur = cur[key];
    }
  }
}

function isDeepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.hasOwn(b, key)) return false;
    if (!isDeepEqual(a[key], b[key])) return false;
  }
  return true;
}

// ==========================================
// DEMO USAGE
// ==========================================

const oldD = {
  id: 1023,
  order_number: 'ORD-20250128-AB12',
  customer_id: 5,
  items_count: 3,
  items_sum_total_price: 1520000,
  status: 'paid',
  created_at: '2025-01-28 14:23:11',
  customer: { id: 5, name: 'Daniel Santoso', email: 'daniel@example.com', phone: '08123456789' },
  items: [
    {
      id: 991,
      product_id: 41,
      qty: 2,
      price: 250000,
      total_price: 500000,
      product: { id: 41, name: 'Keyboard Mechanical', category: { id: 3, name: 'Aksesoris Komputer' } },
    },
    {
      id: 992,
      product_id: 56,
      qty: 1,
      price: 1020000,
      total_price: 1020000,
      product: { id: 56, name: 'Monitor 27 Inch 144Hz', category: { id: 2, name: 'Monitor' } },
    },
  ],
  payments: [{ id: 201, method: 'bank_transfer', amount: 1520000, paid_at: '2025-01-28 14:25:00' }],
};

const newD = {
  id: 1023,
  order_number: 'ORD-20250128-AB12',
  customer_id: 5,
  items_count: 3,
  items_sum_total_price: 1770000,
  status: 'shipped',
  created_at: '2025-01-28 14:23:11',
  updated_at: '2025-01-29 10:12:45',

  customer: {
    id: 5,
    name: 'Daniel Santoso',
    email: 'daniel@example.com',
    phone: '081298765432',
  },

  items: [
    {
      id: 991,
      product_id: 41,
      qty: 2,
      price: 250000,
      total_price: 500000,
      product: {
        id: 41,
        name: 'Keyboard Mechanical',
        sku: 'KBM-001',
        stock: 12,
        category: {
          id: 3,
          name: 'Aksesoris Komputer',
        },
      },
    },
    {
      id: 992,
      product_id: 56,
      qty: 2,
      price: 1020000,
      total_price: 2040000,
      product: {
        id: 56,
        name: 'Monitor 27 Inch 144Hz',
        sku: 'MNTR-27-144',
        stock: 5,
        category: {
          id: 2,
          name: 'Monitor',
        },
      },
    },
  ],

  payments: [
    {
      id: 201,
      method: 'bank_transfer',
      amount: 1520000,
      paid_at: '2025-01-28 14:25:00',
    },
    {
      id: 202,
      method: 'shipping_fee',
      amount: 250000,
      paid_at: '2025-01-29 09:50:00',
    },
  ],

  shipping: {
    shipping_number: 'SHP-EXP-8877123',
    courier: 'JNE Express',
    cost: 250000,
    shipped_at: '2025-01-29 10:00:00',
    address: 'Jl. Melati No. 22, Jakarta Selatan',
  },
};

const diff = getNestedHumanDiff(oldD, newD);
const flat = flattenDiff(diff, {
  formatters: {
    'meta.approved': (v) => (v ? 'Disetujui' : 'Pending'),
  },
});

console.log(flat.map((f) => f.sentence));
// Output:
// [
//   "approved diubah dari Pending menjadi Disetujui",
//   "name diubah dari Ayam menjadi Ayam Bakar",
//   "items[P2] dihapus: [object Object]"
// ]
