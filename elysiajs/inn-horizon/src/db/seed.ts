import { db } from '.';
import { createFormatter, getChangeSummary } from '../utils/human-diff';
import { hashPassword } from '../utils/users';

const SYSTEM_USER_ID = 'system';

const auditFormatter = createFormatter({
  total_price: (v) => `Rp ${(v as number).toLocaleString('id-ID')}`,
  revenue_impact: (v) => `+Rp ${(v as number).toLocaleString('id-ID')}`,
});

const createAuditLog = async (logData: {
  action: string;
  table: string;
  recordId?: string | null;
  oldData?: unknown;
  newData?: unknown;
  actor: { id: string; role: string; name?: string };
  ip?: string;
  userAgent?: string;
  options?: { source: string; batch_id?: string; revenue_impact?: number };
  durationMs?: number;
  bulk?: { count: number; meta: string };
}) => {
  const isSystem = logData.actor.id === SYSTEM_USER_ID;
  const actorName = isSystem ? 'SYSTEM' : logData.actor.name || 'User';

  const actionDisplay = logData.bulk ? `SEED ${logData.table}` : logData.action;

  const recordDisplay = logData.record_id ? `#${logData.record_id}` : logData.bulk ? 'SEEDING' : '';

  const durationDisplay = `[${logData.durationMs ?? 0}ms]`;

  let resultText = '';
  if (logData.bulk) {
    resultText = `→ ${logData.bulk.count} records added`;
    if (logData.bulk.meta) resultText += ` (${logData.bulk.meta})`;
  } else if (logData.new_data) {
    const fieldCount = Object.keys(logData.new_data as object).length;
    resultText = `→ ${fieldCount} fields`;
  }

  const summary =
    `[${actorName}] ${actionDisplay} ${logData.table} ${recordDisplay} ${durationDisplay} ${resultText}`.trim();

  console.log(summary);

  const data = {
    user: isSystem ? undefined : { connect: { id: logData.actor.id } },
    actor_role: logData.actor.role,
    action: logData.action,
    table_name: logData.table,
    record_id: logData.recordId ?? null,
    changes: logData.changes && logData.changes.length > 0 ? logData.changes : null,
    old_data: logData.oldData ? logData.oldData : null,
    new_data: logData.newData ? logData.newData : null,
    duration_ms: logData.durationMs ?? 0,
    ip_address: logData.ip ?? '0.0.0.0',
    user_agent: logData.userAgent ?? 'prisma-seeder',
    route: null,
    status: 'succeeded',
    metadata: {
      source: logData.options?.source ?? 'SEEDER',
      batch_id: logData.bulk ? `SEED_${Date.now()}` : logData.options?.batch_id,
      revenue_impact: logData.options?.revenue_impact,
      ...(logData.bulk ? { imported_count: logData.bulk.count, note: logData.bulk.meta } : {}),
    },
  };

  // Simpan ke DB (tetap sama)
  await db.systemLog.create({
    data: {
      ...data,
      message: getChangeSummary(data, { rawNames: true }),
    },
  });
};

async function main() {
  console.log('Memulai seeding Inn Horizon...');

  // =================================================================
  // 1. SEED ROLES
  // =================================================================
  const rolesToSeed = [{ name: 'Admin' }, { name: 'Host' }, { name: 'Customer' }, { name: 'System' }];

  const roleResult = await db.role.createMany({
    data: rolesToSeed,
    skipDuplicates: true,
  });

  if (roleResult.count > 0) {
    await createAuditLog({
      action: 'CREATE',
      table: 'roles',
      recordId: 'SEEDING',
      oldData: null,
      newData: rolesToSeed,
      actor: { id: SYSTEM_USER_ID, role: 'System' },
      options: { source: 'SEEDER' },
      bulk: { count: roleResult.count, meta: 'initial master data' },
    });
    console.log(`Roles seeded: ${roleResult.count} records`);
  }

  // =================================================================
  // 2. SEED COUNTRIES
  // =================================================================
  const countriesToSeed = [
    { name: 'Indonesia', code: 'ID' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Thailand', code: 'TH' },
    { name: 'United States', code: 'US' },
  ];

  const countryResult = await db.country.createMany({
    data: countriesToSeed,
    skipDuplicates: true,
  });

  if (countryResult.count > 0) {
    await createAuditLog({
      action: 'CREATE',
      table: 'countries',
      recordId: 'SEEDING',
      oldData: null,
      newData: countriesToSeed,
      actor: { id: SYSTEM_USER_ID, role: 'System' },
      options: { source: 'SEEDER' },
      bulk: { count: countryResult.count, meta: 'initial master data' },
    });
    console.log(`Countries seeded: ${countryResult.count} records`);
  }

  // =================================================================
  // 3. AMBIL REFERENCE
  // =================================================================
  const systemRole = await db.role.findFirst({ where: { name: 'System' } });
  const adminRole = await db.role.findFirst({ where: { name: 'Admin' } });
  const indonesia = await db.country.findFirst({ where: { code: 'ID' } });

  if (!systemRole || !adminRole || !indonesia) {
    throw new Error('Fatal: Master data tidak lengkap!');
  }

  // =================================================================
  // 4. CREATE SYSTEM USER
  // =================================================================
  const systemUser = await db.user.upsert({
    where: { username: 'system' },
    update: {},
    create: {
      username: 'system',
      email: 'system@inn_horizon.local',
      password_hash: await hashPassword('__SYSTEM__'),
      role_id: systemRole.id,
      country_id: indonesia.id,
      first_name: 'System',
      last_name: 'Automaton',
      is_active: true,
    },
  });

  await createAuditLog({
    action: 'CREATE',
    table: 'users',
    recordId: systemUser.id,
    oldData: null,
    newData: systemUser,
    actor: { id: SYSTEM_USER_ID, role: 'System' },
    options: { source: 'SEEDER' },
  });

  console.log(`System user created → ${systemUser.id}`);

  // =================================================================
  // 5. CREATE ADMIN USER
  // =================================================================
  const adminUser = await db.user.upsert({
    where: { email: 'admin@inn_horizon.com' },
    update: { role_id: adminRole.id },
    create: {
      username: 'admin',
      email: 'admin@inn_horizon.com',
      password_hash: await hashPassword('inn_horizon_2025'),
      role_id: adminRole.id,
      country_id: indonesia.id,
      first_name: 'Inn',
      last_name: 'Horizon',
      is_active: true,
      is_verified: true,
    },
  });

  await createAuditLog({
    action: 'CREATE',
    table: 'users',
    recordId: adminUser.id,
    oldData: null,
    newData: adminUser,
    actor: { id: SYSTEM_USER_ID, role: 'System' },
    options: { source: 'SEEDER' },
  });

  console.log(`Admin user created → ${adminUser.email}`);
  console.log(`   Default password: inn_horizon_2025`);

  console.log('\nSEEDING SELESAI! Sistem siap digunakan.');
  console.log('   Login: admin@inn_horizon.com / inn_horizon_2025');
}

main()
  .catch((e) => {
    console.error('SEEDING GAGAL:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
