import os from 'node:os';
import { omit, title } from 'radash';
import { db } from '../../db';

export type ActionType = 'CREATE' | 'UPDATE' | 'DELETE';
export type LogSource = 'HTTP' | 'SEEDER' | 'MIGRATION' | 'CLI' | 'CRON' | 'TEST';
export interface DataSnapshot extends Record<string, any> {}

// ===============================================
// CONFIGURATION
// ===============================================
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

// ===============================================
// UTILS
// ===============================================
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

export function getScriptUserAgent(name: string = 'Script') {
  const runtime = typeof Bun !== 'undefined' ? `Bun/${Bun.version}` : `Node/${process.version}`;
  return `InnHorizon/1.0-${name} (${os.platform()}/${os.release()}; ${os.arch()}) ${runtime}`;
}

// ===============================================
// MESSAGE GENERATOR
// ===============================================
export function generateAuditMessage(
  actor: { id: string; role?: string },
  action: ActionType,
  table: string,
  recordId: string,
  oldData: DataSnapshot | null,
  newData: DataSnapshot | null,
  isBulk: boolean = false
): string {
  const rolePrefix = actor.role ? `[${actor.role.toUpperCase()}] ` : '';
  const actorLabel = `${rolePrefix}User#${actor.id}`;
  const rid = recordId.startsWith('BULK_') || recordId === 'SEEDING' ? 'batch' : `#${recordId}`;

  // BULK / BATCH ACTION
  if (isBulk || (newData && 'batch_action' in newData)) {
    const batch = (newData as any) || {};
    const count = batch.total_records ?? 0;
    const meta = batch.metadata || batch.names_list || 'records';
    const label =
      batch.batch_action === 'SEEDING' ? 'BATCH SEED' : batch.batch_action?.replace(/_/g, ' ') || 'BULK ACTION';

    const emoji = action === 'DELETE' ? '🔴' : action === 'UPDATE' ? '🟡' : '🟢';
    return `${emoji} ${actorLabel} │ ${label} → ${table} │ ${count} ${meta}`;
  }

  // SINGLE ACTIONS
  if (action === 'DELETE') {
    return `🔴 ${actorLabel} │ DELETE → ${table}${rid}`;
  }

  if (action === 'CREATE') {
    const safeNew = newData && typeof newData === 'object' ? newData : {};
    const fields = Object.keys(omit(safeNew, IGNORED_FIELDS)).length;
    return `🟢 ${actorLabel} │ CREATE → ${table}${rid} │ ${fields} fields populated`;
  }

  // UPDATE (single)
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
      const label = title(key.replace(/_/g, ' '));
      const change = `${label}: ${o} → ${n}`;
      PRIORITY_FIELDS.includes(key as any) ? priority.push(change) : normal.push(change);
    }
  }

  const total = priority.length + normal.length;
  if (total === 0) {
    return `🟡 ${actorLabel} │ UPDATE → ${table}${rid} │ No changes detected`;
  }

  let changes = priority.length > 0 ? priority.join(' │ ') : normal.join(' │ ');
  if (priority.length > 0 && normal.length > 0) {
    changes += ` │ +${normal.length} other`;
  }

  return `🟡 ${actorLabel} │ UPDATE → ${table}${rid} │ ${changes}`;
}

// ===============================================
// CREATE LOG — SATU PINTU MASUK
// ===============================================
export async function createAuditLog(
  action: ActionType,
  table: string,
  recordId: string | number,
  oldData: DataSnapshot | null,
  newData: DataSnapshot | null,
  userId: string | number,
  userRole = 'User',
  ip = '0.0.0.0',
  ua = getScriptUserAgent(),
  options: {
    route?: string;
    source: LogSource;
  }
) {
  const { route, source } = options;

  const isBulkAction = !!(
    String(recordId).includes('BULK_') ||
    recordId === 'SEEDING' ||
    (newData && 'batch_action' in newData)
  );

  const finalOldData = isBulkAction ? undefined : (oldData ?? undefined);
  const finalNewData = isBulkAction ? undefined : (newData ?? undefined);

  const message = generateAuditMessage(
    { id: String(userId), role: userRole },
    action,
    table,
    String(recordId),
    oldData,
    newData,
    isBulkAction
  );

  try {
    await db.systemLogs.create({
      data: {
        action_type: action,
        table_name: table,
        record_id: String(recordId),
        old_data: finalOldData,
        new_data: finalNewData,
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
