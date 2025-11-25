// src/lib/jsonDiff.ts
import { compare } from 'fast-json-patch';

export type NestedDiff<T = any> = { [K in keyof T]?: any };
export type DiffValue<T = any> = { old?: T; new?: T };

export interface DiffOptions {
  idKey?: string;
  ignoreKeys?: string[];
  maxDepth?: number;
  treatNullAsMissing?: boolean; // null → undefined = remove
}

const DEFAULT_OPTIONS = {
  idKey: 'id',
  ignoreKeys: ['createdAt', 'updatedAt', '__v', '_id'],
  maxDepth: 20,
  treatNullAsMissing: true,
} as const;

const pathCache = new Map<string, string[]>();

export function getNestedHumanDiff<T>(existing: T, updated: T, options: DiffOptions = {}): NestedDiff<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const { idKey, ignoreKeys, maxDepth, treatNullAsMissing } = opts;

  if (existing === updated) return {} as any;

  const patch = compare(existing as any, updated as any);
  if (patch.length === 0) return {} as any;

  const result: any = {};

  for (const op of patch) {
    if (!op.path || op.path === '/') continue;

    const parts = op.path.split('/').filter(Boolean);
    if (parts.some((p) => ignoreKeys.includes(p))) continue;
    if (parts.length > maxDepth) continue;

    const oldValue = getValueByPath(existing, op.path);
    let newValue = op.value;

    if (treatNullAsMissing && newValue === null) {
      newValue = undefined;
    }

    if (op.op === 'replace') {
      setNested(result, op.path, { old: oldValue, new: newValue });
    } else if (op.op === 'add') {
      setNested(result, op.path, { new: newValue });
    } else if (op.op === 'remove') {
      setNested(result, op.path, { old: oldValue });
    }
  }

  if (idKey) transformArrayToById(result, idKey);
  return result as NestedDiff<T>;
}

// Fast helpers
function getValueByPath(obj: any, path: string): any {
  let parts = pathCache.get(path);
  if (!parts) {
    parts = path.split('/').filter(Boolean);
    pathCache.set(path, parts);
  }
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    const i = Number(p);
    cur = Number.isNaN(i) ? cur[p] : cur[i];
  }
  return cur;
}

function setNested(obj: any, path: string, value: any): void {
  let parts = pathCache.get(path);
  if (!parts) {
    parts = path.split('/').filter(Boolean);
    pathCache.set(path, parts);
  }
  let cur = obj;
  for (let i = 0; i < parts.length; i++) {
    const k = parts[i];
    const isLast = i === parts.length - 1;
    const nextIsNum = parts[i + 1] && !Number.isNaN(Number(parts[i + 1]));
    if (isLast) cur[k] = value;
    else {
      if (cur[k] === undefined) cur[k] = nextIsNum ? [] : {};
      cur = cur[k];
    }
  }
}

function transformArrayToById(obj: any, idKey: string): void {
  if (!obj || typeof obj !== 'object') return;
  for (const key in obj) {
    const val = obj[key];
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      const keys = Object.keys(val);
      const isIndexed = keys.length > 0 && keys.every((k) => !Number.isNaN(Number(k)));
      if (isIndexed) {
        let hasId = false;
        const byId: any = {};
        for (const k of keys) {
          const item = val[k];
          if (item && item[idKey] !== undefined) {
            hasId = true;
            byId[item[idKey]] = item;
          }
        }
        if (hasId) {
          obj[key] = byId;
          continue;
        }
      }
      transformArrayToById(val, idKey);
    }
  }
}

// Bonus: Human summary
export function getChangeSummary(diff: NestedDiff): string {
  let changed = 0,
    added = 0,
    removed = 0;
  function count(obj: any) {
    for (const key in obj) {
      const v = obj[key];
      if (v && typeof v === 'object') {
        if ('old' in v && 'new' in v) changed++;
        else if ('new' in v) added++;
        else if ('old' in v) removed++;
        else count(v);
      }
    }
  }
  count(diff);
  const parts = [];
  if (changed) parts.push(`${changed} field berubah`);
  if (added) parts.push(`${added} ditambah`);
  if (removed) parts.push(`${removed} dihapus`);
  return parts.length ? parts.join(', ') : 'Tidak ada perubahan';
}

export function clearDiffCache() {
  pathCache.clear();
}

// ===================================================================
// EXAMPLE & BENCHMARK
// ===================================================================

const existing = {
  users: [{ id: 1, name: 'John', role: 'user', settings: { theme: 'light' } }],
  config: { version: '1.0' },
};

const updated = {
  users: [
    { id: 1, name: 'John Doe', role: 'admin', settings: { theme: 'dark' } },
    { id: 2, name: 'Jane', role: 'user' },
  ],
  config: { version: '2.0' },
};

const diff = getNestedHumanDiff(existing, updated, {
  idKey: 'id',
  ignoreKeys: ['updatedAt', 'createdAt', '__v'],
  maxDepth: 15,
  treatNullAsMissing: true,
});

console.log('TypeScript Diff Result:');
console.log(diff);

console.log(getChangeSummary(diff));
