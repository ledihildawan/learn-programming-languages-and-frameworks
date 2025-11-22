// src/utils/audit.ts → VERSI FINAL & BULLETPROOF (2025)
import os from 'node:os';
import { omit, title } from 'radash';
import { db } from '../../db';

export type ActionType = 'CREATE' | 'UPDATE' | 'DELETE';
export type LogSource = 'HTTP' | 'SEEDER' | 'MIGRATION' | 'CLI' | 'CRON' | 'TEST';
export interface DataSnapshot extends Record<string, any> {}

const IGNORED_FIELDS = [
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
] as const;

const PRIORITY_FIELDS = ['status_id', 'role_id', 'is_active', 'total_cost', 'is_verified'] as const;

const formatLabel = (str: string) => title(str.replace(/_/g, ' '));

const normalize = (val: any): string => {
  if (val === null || val === undefined) return '∅';
  if (typeof val === 'boolean') return val ? '✓' : '✗';
  if (typeof val === 'number' || typeof val === 'bigint') return String(val);
  if (typeof val === 'object') {
    try {
      const json = JSON.stringify(val);
      return json.length > 80 ? '[Object]' : json;
    } catch {
      return '[Invalid]';
    }
  }
  return String(val);
};

export function generateAuditMessage(
  actor: { id: string; role?: string },
  action: ActionType,
  table: string,
  recordId: string,
  oldData: DataSnapshot | null,
  newData: DataSnapshot | null
): string {
  const rolePrefix = actor.role ? `[${actor.role.toUpperCase()}] ` : '';
  const actorLabel = `${rolePrefix}User#${actor.id}`;
  const tableLabel = formatLabel(table);
  const rid = recordId === 'SEEDING' ? 'batch' : `#${recordId}`;

  // 1. BATCH SEEDING → Prioritas tertinggi
  if (newData && 'batch_action' in newData && newData.batch_action === 'SEEDING') {
    const count = (newData.total_records as number) ?? 0;
    const names = (newData.names_list as string) ?? 'record(s)';
    return `🟢 ${actorLabel} │ BATCH SEED → ${tableLabel} │ +${count} ${names}`;
  }

  // 2. DELETE
  if (action === 'DELETE') {
    return `🔴 ${actorLabel} │ DELETE → ${tableLabel}${rid}`;
  }

  // 3. CREATE (single)
  if (action === 'CREATE') {
    const safeNew = newData && typeof newData === 'object' ? newData : {};
    const fields = Object.keys(omit(safeNew, IGNORED_FIELDS)).length;
    return `🟢 ${actorLabel} │ CREATE → ${tableLabel}${rid} │ ${fields} fields populated`;
  }

  // 4. UPDATE → Yang paling rawan error
  const oldObj = oldData && typeof oldData === 'object' ? oldData : {};
  const newObj = newData && typeof newData === 'object' ? newData : {};

  const cleanOld = omit(oldObj, IGNORED_FIELDS);
  const cleanNew = omit(newObj, IGNORED_FIELDS);

  const allKeys = new Set<string>([...Object.keys(cleanOld), ...Object.keys(cleanNew)]);

  const priority: string[] = [];
  const normal: string[] = [];

  for (const key of allKeys) {
    const o = normalize(cleanOld[key]);
    const n = normalize(cleanNew[key]);
    if (o !== n) {
      const label = formatLabel(key);
      const change = `${label}: ${o} → ${n}`;
      if (PRIORITY_FIELDS.includes(key as any)) {
        priority.push(change);
      } else {
        normal.push(change);
      }
    }
  }

  const total = priority.length + normal.length;
  if (total === 0) {
    return `🟡 ${actorLabel} │ UPDATE → ${tableLabel}${rid} │ No changes detected`;
  }

  let changes = priority.length > 0 ? priority.join(' │ ') : normal.join(' │ ');
  if (priority.length > 0 && normal.length > 0) {
    changes += ` │ +${normal.length} other`;
  }

  return `🟡 ${actorLabel} │ UPDATE → ${tableLabel}${rid} │ ${changes}`;
}

// CREATE LOG — Satu pintu masuk saja

export async function createAuditLog(
  action: ActionType,
  table: string,
  recordId: string | number,
  oldData: DataSnapshot | null,
  newData: DataSnapshot | null,
  userId: string | number,
  userRole = 'User',
  ip = '0.0.0.0',
  ua = getScriptUserAgent('Script'),
  options: {
    route?: string; // hanya diisi kalau source = 'HTTP'
    source: LogSource; // WAJIB!
  }
) {
  const { route, source } = options;

  const message = generateAuditMessage(
    { id: String(userId), role: userRole },
    action,
    table,
    String(recordId),
    oldData,
    newData
  );

  try {
    await db.systemLogs.create({
      data: {
        action_type: action,
        table_name: table,
        record_id: String(recordId),
        old_data: oldData ?? undefined,
        new_data: newData ?? undefined,
        user_id: String(userId),
        ip_address: ip,
        user_agent: ua,
        route_endpoint: source === 'HTTP' ? route : undefined,
        source,
        message,
      },
    });
  } catch (err) {
    console.error('Audit log gagal dicatat:', (err as any).message);
  }
}

export function getScriptUserAgent(name: string) {
  const runtime = typeof Bun !== 'undefined' ? `Bun/${Bun.version}` : `Node/${process.version}`;
  return `InnHorizon/1.0-${name} (${os.platform()}/${os.release()}; ${os.arch()}) ${runtime}`;
}
