// src/utils/audit.ts → FINAL & 100% BISA JALAN (NO ERROR, NO BULLSHIT)
import isEqual from 'fast-deep-equal';
import { omit } from 'radash';
import { SystemLogsStatus } from '../../../generated/prisma/enums';
import { db } from '../../db';

export type ActionType = 'CREATE' | 'UPDATE' | 'DELETE';
export type LogSource = 'HTTP' | 'SEEDER' | 'MIGRATION' | 'CLI' | 'CRON' | 'TEST';

interface Actor {
  id: string;
  role?: string;
}

interface AuditOptions {
  route?: string;
  source: LogSource;
}

interface BulkInfo {
  count: number;
  meta?: string;
}

interface CreateAuditLogParams {
  action: ActionType;
  table: string;
  recordId?: string;
  oldData?: Record<string, any> | null;
  newData?: Record<string, any> | null;
  actor: Actor;
  ip?: string;
  userAgent?: string;
  options: AuditOptions;
  durationMs?: number;
  bulk?: BulkInfo;
  status: SystemLogsStatus;
}

// CONFIG
const IGNORED_FIELDS = new Set([
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
]);

// UTILS
const normalize = (val: any): string => {
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'number' || typeof val === 'bigint') return String(val);
  try {
    const json = JSON.stringify(val);
    return json.length > 100 ? '[object]' : json;
  } catch {
    return '[invalid]';
  }
};

const hasRealChanges = (oldData: any, newData: any): boolean => {
  if (!oldData || !newData) return true;
  const keys = new Set([...Object.keys(oldData), ...Object.keys(newData)]);
  for (const key of keys) {
    if (!IGNORED_FIELDS.has(key) && !isEqual(oldData[key], newData[key])) {
      return true;
    }
  }
  return false;
};

const extractChanges = (oldData: any, newData: any): { old: any; new: any; list: string[] } => {
  const oldF: any = {};
  const newF: any = {};
  const changes: string[] = [];
  const keys = new Set([...Object.keys(oldData || {}), ...Object.keys(newData || {})]);

  for (const key of keys) {
    if (!IGNORED_FIELDS.has(key)) {
      const o = oldData?.[key];
      const n = newData?.[key];
      if (!isEqual(o, n)) {
        oldF[key] = o;
        newF[key] = n;
        changes.push(`${key}: ${normalize(o)} to ${normalize(n)}`);
      }
    }
  }
  return {
    old: Object.keys(oldF).length ? oldF : undefined,
    new: Object.keys(newF).length ? newF : undefined,
    list: changes,
  };
};

const generateMessage = (
  actor: Actor,
  action: ActionType,
  table: string,
  recordId: string,
  isBulk: boolean,
  durationMs: number,
  bulk?: BulkInfo,
  changes?: string[],
  newData?: Record<string, any> | null
): string => {
  const role = actor.role?.toUpperCase() || 'USER';
  const actorLabel = `[${role}]`;
  const dur = `[${durationMs.toFixed(0)}ms]`;

  const shouldShowId = recordId && recordId !== 'unknown' && recordId !== 'SEEDING' && !recordId.startsWith('BULK_');

  const ridDisplay = shouldShowId ? ` ${recordId}` : '';

  // BULK / SEED / BULK_CREATE / BULK_UPDATE
  if (isBulk || bulk) {
    const count = bulk?.count ?? 0;
    const meta = bulk?.meta ? ` (${bulk.meta})` : '';
    const type = recordId === 'SEEDING' ? 'SEED' : action === 'CREATE' ? 'BULK_CREATE' : 'BULK_UPDATE';
    return `${actorLabel} ${type} ${table}${ridDisplay} ${dur} | ${count} records added${meta}`;
  }

  // DELETE
  if (action === 'DELETE') {
    return `${actorLabel} DELETE ${table}${ridDisplay} ${dur}`;
  }

  if (action === 'CREATE') {
    const data = newData || {};
    const fields = Object.keys(omit(data, Array.from(IGNORED_FIELDS))).length;
    return `${actorLabel} CREATE ${table}${ridDisplay} ${dur} | ${fields} fields`;
  }

  const changeStr = changes && changes.length > 0 ? changes.join(' | ') : 'no changes';

  return `${actorLabel} UPDATE ${table}${ridDisplay} ${dur} | ${changeStr}`;
};

export const createAuditLog = async (params: CreateAuditLogParams) => {
  const {
    action,
    table,
    recordId,
    oldData = null,
    newData = null,
    actor,
    ip = null,
    userAgent,
    options,
    durationMs = 0,
    bulk,
    status,
  } = params;

  const { route, source } = options;
  const finalRecordId = recordId ?? 'unknown';
  const isBulk = !!(finalRecordId === 'SEEDING' || finalRecordId.startsWith('BULK_') || bulk);

  // Skip jika tidak ada perubahan atau 0 records
  if (action === 'UPDATE' && !isBulk && !hasRealChanges(oldData, newData)) {
    return;
  }
  if (bulk && bulk.count === 0) {
    return;
  }

  let finalOldData: any = undefined;
  let finalNewData: any = undefined;
  let changes: string[] = [];

  if (!isBulk) {
    if (action === 'UPDATE' && oldData && newData) {
      const result = extractChanges(oldData, newData);
      finalOldData = result.old;
      finalNewData = result.new;
      changes = result.list;
    } else if (action === 'CREATE' && newData) {
      finalNewData = omit(newData, Array.from(IGNORED_FIELDS));
    } else if (action === 'DELETE' && oldData) {
      finalOldData = omit(oldData, Array.from(IGNORED_FIELDS));
    }
  }

  const message = generateMessage(
    actor,
    action,
    table,
    finalRecordId,
    isBulk,
    durationMs,
    bulk,
    changes.length > 0 ? changes : undefined,
    finalNewData
  );

  try {
    await db.systemLog.create({
      data: {
        action_type: action,
        table_name: table,
        record_id: finalRecordId,
        old_data: finalOldData,
        new_data: finalNewData,
        user_id: actor.id,
        ip_address: ip,
        user_agent: userAgent || undefined,
        route_endpoint: source === 'HTTP' ? route : undefined,
        source,
        message,
        duration_ms: Number(durationMs.toFixed(0)),
        status,
      },
    });
  } catch (err) {
    console.error('Audit log failed:', (err as any).message);
  }
};
