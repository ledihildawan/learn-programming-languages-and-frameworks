import { db } from '.';
import { createAuditLog, getScriptUserAgent } from '../utils/system-logs';
import { hashPassword } from '../utils/users';

const UA = getScriptUserAgent('Seeder');
const SEEDER_IP = '0.0.0.0';

// ===================================================================
// DATA MASTER (bisa ditambah kapan saja)
// ===================================================================
const rolesData = [{ name: 'Admin' }, { name: 'Host' }, { name: 'Customer' }, { name: 'System' }];

const countriesData = [
  { name: 'Indonesia', code: 'ID' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Thailand', code: 'TH' },
  { name: 'United States', code: 'US' },
];

// ===================================================================
// HELPER: Log Batch Seeding (super ringkas)
// ===================================================================
async function logBatchSeed(systemUserId: string, table: string, items: any[]) {
  const names = items.map((i: any) => i.name || i.code || i.username || 'item').join(', ');

  await createAuditLog(
    'CREATE',
    'roles',
    'SEEDING',
    null,
    {
      batch_action: 'SEEDING',
      total_records: rolesData.length,
      names_list: rolesData.map((r) => r.name).join(', '),
    },
    systemUserId,
    'System',
    '0.0.0.0',
    UA,
    { source: 'SEEDER' } // ← KEREN BANGET!
  );
}

// ===================================================================
// MAIN SEEDER
// ===================================================================
async function main() {
  console.log('\n🚀 Memulai Database Seeding Inn Horizon...\n');

  // 1. Insert master data (skipDuplicates agar idempotent)
  await db.roles.createMany({ data: rolesData, skipDuplicates: true });
  await db.countries.createMany({ data: countriesData, skipDuplicates: true });

  // 2. Ambil referensi penting
  const systemRole = await db.roles.findFirst({ where: { name: 'System' } });
  const adminRole = await db.roles.findFirst({ where: { name: 'Admin' } });
  const defaultCountry = await db.countries.findFirst({ where: { code: 'ID' } });

  if (!systemRole || !defaultCountry) {
    throw new Error('❌ Fatal: Role "System" atau Country "ID" tidak ditemukan.');
  }

  // 3. Buat / pastikan System User ada
  const systemUser = await db.users.upsert({
    where: { username: 'system' },
    update: {
      country_id: defaultCountry.id,
      role_id: systemRole.id,
    },
    create: {
      username: 'system',
      email: 'system@inn_horizon.com',
      password_hash: await hashPassword('system'), // ganti kalau mau password lain
      role_id: systemRole.id,
      country_id: defaultCountry.id,
      first_name: 'System',
      last_name: 'Automaton',
    },
  });

  console.log(`✅ System User siap → ID: ${systemUser.id}`);

  // 4. Log semua seeding (batch + single)
  await logBatchSeed(String(systemUser.id), 'roles', rolesData);
  await logBatchSeed(String(systemUser.id), 'countries', countriesData);

  // Log pembuatan System User (single create)
  await createAuditLog(
    'CREATE',
    'users',
    systemUser.id,
    null,
    { username: 'system', email: 'system@inn_horizon.com', role: 'System' },
    systemUser.id,
    'System',
    '0.0.0.0',
    UA,
    { source: 'SEEDER' }
  );

  // 5. Buat Admin User (opsional, tapi sangat direkomendasikan)
  if (adminRole) {
    const adminUser = await db.users.upsert({
      where: { email: 'admin@inn_horizon.com' },
      update: {
        role_id: adminRole.id,
      },
      create: {
        username: 'platform_admin',
        email: 'admin@inn_horizon.com',
        password_hash: await hashPassword('inn_horizon'), // password default: inn_horizon
        role_id: adminRole.id,
        country_id: defaultCountry.id,
        first_name: 'Inn',
        last_name: 'Horizon',
      },
    });

    console.log(`🔑 Admin User siap → ${adminUser.email} (password: inn_horizon)`);

    await createAuditLog(
      'CREATE',
      'users',
      String(adminUser.id),
      null,
      {
        username: adminUser.username,
        email: adminUser.email,
        role: 'Admin',
      },
      systemUser.id,
      'System',
      SEEDER_IP,
      UA,
      { source: 'SEEDER' }
    );
  }

  console.log('\n🎉 Database Seeding Selesai! Semua audit log tercatat dengan format baru.\n');
}

// ===================================================================
// EKSEKUSI
// ===================================================================
main()
  .catch((e) => {
    console.error('❌ SEEDING GAGAL:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
    console.log('🔌 Prisma client disconnected.\n');
  });
