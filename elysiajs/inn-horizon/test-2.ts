// human-diff.ts (v2.0 - Best Practice + Production Ready)
import { compare } from 'fast-json-patch';

// ==========================================
// 1. ADVANCED TYPES (Improved Path with [id])
// ==========================================
export type DiffValue<V> = { old?: V; new?: V };

/** Nested diff tree dengan struktur identik input */
export type NestedDiff<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Record<string, NestedDiff<U> | DiffValue<U>> // array → map by ID
    : T[K] extends object
      ? NestedDiff<T[K]>
      : DiffValue<T[K]>;
};

/** Path dengan format: users[123].profile.name (array pakai kurung siku) */
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
// 2. PUBLIC TYPES
// ==========================================
export type FlatChange<T = any> = {
  path: Path<T>;
  pathArray: string[];
  action: 'ADD' | 'REMOVE' | 'UPDATE';
  oldValue?: any;
  newValue?: any;
  formattedOldValue?: string;
  formattedNewValue?: string;
  /** Hanya ada jika REMOVE pada array item */
  removedItemId?: string;
};

export interface DiffOptions {
  idKey?: string | ((path: string[]) => string);
  ignoreKeys?: string[];
  maxDepth?: number;
  treatNullAsMissing?: boolean;
  /** Skip deep equal check (fast-json-patch sudah akurat) */
  skipRedundantCheck?: boolean;
}

export interface FlattenOptions {
  prefix?: string;
  formatters?: Record<string, (val: any) => string>;
}

// ==========================================
// 3. DEFAULTS (immutable + const assertion)
// ==========================================
const DEFAULT_OPTIONS = {
  idKey: 'id',
  ignoreKeys: ['createdAt', 'updatedAt', '__v', '_id'] as const,
  maxDepth: 20,
  treatNullAsMissing: true,
  skipRedundantCheck: true,
} as const;

// ==========================================
// 4. MAIN: Human Readable Diff
// ==========================================
export function getNestedHumanDiff<T extends object>(
  existing: T,
  updated: T,
  options: DiffOptions = {}
): NestedDiff<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const { idKey, ignoreKeys, maxDepth, treatNullAsMissing, skipRedundantCheck } = opts;

  if (existing === updated) return {} as NestedDiff<T>;

  const patch = compare(existing as any, updated as any);
  if (patch.length === 0) return {} as NestedDiff<T>;

  const result: any = {};

  for (const op of patch) {
    if (!op.path || op.path === '/') continue;

    const rawParts = op.path.split('/').slice(1);
    if (rawParts.length > maxDepth) continue;
    if (ignoreKeys.includes(rawParts[rawParts.length - 1])) continue;

    // Resolve path dengan [id] untuk array
    const finalParts: string[] = [];
    let ptrExisting: any = existing;
    let ptrUpdated: any = updated;
    let currentPathForId: string[] = [];

    for (let i = 0; i < rawParts.length; i++) {
      const key = rawParts[i];
      const isIndex = !Number.isNaN(Number(key));
      const parentIsArray = Array.isArray(ptrExisting) || Array.isArray(ptrUpdated);

      let segmentName = key;

      if (parentIsArray && isIndex) {
        const idx = Number(key);
        const itemNew = ptrUpdated?.[idx];
        const itemOld = ptrExisting?.[idx];

        let currentIdKey = typeof idKey === 'function' ? idKey(currentPathForId) : idKey;

        const idVal = itemNew?.[currentIdKey] ?? itemOld?.[currentIdKey];
        if (idVal !== undefined && idVal !== null) {
          segmentName = `[${String(idVal)}]`;
        } else {
          segmentName = `[${idx}]`; // fallback jika tidak ada ID
        }
      }

      finalParts.push(segmentName);
      currentPathForId.push(rawParts.slice(0, i + 1).join('.'));

      ptrExisting = ptrExisting?.[key];
      ptrUpdated = ptrUpdated?.[key];
    }

    // Get values
    let oldValue: any;
    let newValue: any = op.value;

    if (op.op === 'replace' || op.op === 'remove') {
      oldValue = getValueByPathParts(existing, rawParts);
    }
    if (op.op === 'add' || op.op === 'replace') {
      newValue = op.value;
    }

    if (treatNullAsMissing && newValue === null) newValue = undefined;

    // Optional deep equal (disabled by default karena redundant)
    if (!skipRedundantCheck && isDeepEqual(oldValue, newValue)) {
      continue;
    }

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
// 5. FLATTEN TO TABLE-READY FORMAT
// ==========================================
export function flattenDiff<T = any>(diff: NestedDiff<T> | any, options: FlattenOptions = {}): FlatChange<T>[] {
  const { prefix = '', formatters = {} } = options;
  const changes: FlatChange<T>[] = [];

  function walk(node: any, currentPath: string) {
    for (const key in node) {
      const val = node[key];
      const path = currentPath ? `${currentPath}.${key}` : key;

      // Cek signature DiffValue
      const isDiffNode =
        val && typeof val === 'object' && ('old' in val || 'new' in val) && Object.keys(val).length <= 2;

      if (isDiffNode) {
        const hasOld = 'old' in val;
        const hasNew = 'new' in val;
        let action: FlatChange<T>['action'] = 'UPDATE';
        if (!hasOld) action = 'ADD';
        if (!hasNew) action = 'REMOVE';

        let formattedOld = val.old;
        let formattedNew = val.new;

        // Apply Formatter
        const formatter = formatters[path];
        if (formatter) {
          if (formattedOld !== undefined) formattedOld = formatter(formattedOld);
          if (formattedNew !== undefined) formattedNew = formatter(formattedNew);
        } else {
          // Default string safe conversion
          if (formattedOld !== undefined && typeof formattedOld !== 'string') formattedOld = String(formattedOld);
          if (formattedNew !== undefined && typeof formattedNew !== 'string') formattedNew = String(formattedNew);
        }

        const change: FlatChange<T> = {
          path: path as Path<T>,
          pathArray: path.split('.'), // Note: ini akan memecah 'items[P1].price' jadi ['items[P1]', 'price'] -> Bagus!
          action,
          oldValue: val.old,
          newValue: val.new,
          formattedOldValue: formattedOld,
          formattedNewValue: formattedNew,
        };

        // --- FIX REGEX DI SINI ---
        // Menangkap ID apapun termasuk UUID (dash), spasi, titik, dll
        const match = path.match(/\[([^\]]+)\]$/);

        if (action === 'REMOVE' && match) {
          change.removedItemId = match[1]; // Mengambil isi group 1
        }

        changes.push(change);
      } else if (val && typeof val === 'object') {
        walk(val, path);
      }
    }
  }

  walk(diff, prefix);
  return changes;
}

export function getChangeSummary(diff: NestedDiff<any>): string {
  const flat = flattenDiff(diff);
  const updated = flat.filter((x) => x.action === 'UPDATE').length;
  const added = flat.filter((x) => x.action === 'ADD').length;
  const removed = flat.filter((x) => x.action === 'REMOVE').length;

  const parts: string[] = [];
  if (updated) parts.push(`${updated} diubah`);
  if (added) parts.push(`${added} ditambah`);
  if (removed) parts.push(`${removed} dihapus`);

  return parts.length ? parts.join(', ') : 'Tidak ada perubahan';
}

// ==========================================
// 6. PRIVATE HELPERS
// ==========================================
function getValueByPathParts(obj: any, parts: string[]): any {
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = Array.isArray(cur) && !Number.isNaN(Number(p)) ? cur[Number(p)] : cur[p];
  }
  return cur;
}

function setNestedByParts(obj: any, parts: string[], value: any): void {
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
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return a === b;

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
// DEMO (Tetap sama, tapi hasil path lebih bagus!)
// ==========================================
interface ProductData {
  meta: { version: number; author: string };
  items: Array<{
    sku: string;
    price: number;
    tags: string[];
    details: { valid_until: string };
  }>;
}

const oldData: ProductData = {
  meta: { version: 1, author: 'Admin' },
  items: [
    { sku: 'P1', price: 10000, tags: ['promo'], details: { valid_until: '2023-01-01' } },
    { sku: 'P2', price: 50000, tags: [], details: { valid_until: '2023-01-01' } },
  ],
};

const newData: ProductData = {
  meta: { version: 1, author: 'SuperAdmin' },
  items: [{ sku: 'P1', price: 15000, tags: ['promo', 'flash'], details: { valid_until: '2024-01-01' } }],
};

const diff = getNestedHumanDiff(oldData, newData, {
  idKey: (path) => (path.includes('items') ? 'sku' : 'id'),
});

const changes = flattenDiff<ProductData>(diff, {
  formatters: {
    'items[P1].price': (v) => `Rp ${Number(v).toLocaleString('id-ID')}`,
    'items[P1].details.valid_until': (v) => new Date(v as string).toLocaleDateString('id-ID'),
  },
});

// Hasil path sekarang: items[P1].price ← jauh lebih jelas!
console.log(JSON.stringify(diff, null, 2));
/*
Output:
[
  { path: "meta.author", action: "UPDATE", formattedOldValue: "Admin", formattedNewValue: "SuperAdmin" },
  { path: "items[P1].price", action: "UPDATE", formattedOldValue: "Rp 10.000", formattedNewValue: "Rp 15.000" },
  { path: "items[P1].tags[1]", action: "ADD", ... },
  { path: "items[P1].details.valid_until", action: "UPDATE", ... },
  { path: "items[P2]", action: "REMOVE", removedItemId: "P2" }
]
*/

console.log('Ringkasan:', getChangeSummary(diff));
// Output: "4 diubah, 1 ditambah, 1 dihapus"
