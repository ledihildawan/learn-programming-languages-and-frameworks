import os from 'os';
import { db } from '.';
import { Role } from '../../generated/prisma/browser';
import { withDuration } from '../utils';
import { createAuditLog } from '../utils/system-logs';
import { hashPassword } from '../utils/users';

function getPrimaryLocalIPAddress(): string {
  const interfaces = os.networkInterfaces();

  // Pola IP yang sering digunakan oleh Jaringan Virtual Host-Only/NAT
  const VIRTUAL_IP_PATTERNS = [
    '192.168.56.', // Default VirtualBox Host-Only
    '192.168.99.', // Lama digunakan oleh Docker Machine
    '172.17.', // Default Docker Bridge Network
    '172.18.', // Docker Bridge Network range
    '172.19.', // Docker Bridge Network range
    '172.20.', // Docker Bridge Network range
    '172.21.', // Docker Bridge Network range
    '172.22.', // Docker Bridge Network range
    '172.23.', // Docker Bridge Network range
    '172.24.', // Docker Bridge Network range
    '192.168.128.', // VMware Workstation/Fusion
    '192.168.177.', // VMware Workstation/Fusion
  ];

  for (const name in interfaces) {
    const normalizedName = name.toLowerCase();

    // 1. Heuristik: Abaikan Antarmuka Virtual berdasarkan Nama
    if (
      normalizedName.includes('virtualbox') ||
      normalizedName.includes('vmware') ||
      normalizedName.includes('docker') ||
      normalizedName.includes('veth') ||
      normalizedName.includes('taptun') || // Umum untuk VPN/Tunnel di Mac/Linux
      normalizedName.includes('bridge') // Jaringan Bridge Linux
    ) {
      continue;
    }

    const interfaceList = interfaces[name];

    if (interfaceList) {
      for (const iface of interfaceList) {
        // 2. Filter: Harus IPv4 dan bukan internal (loopback)
        if (iface.family === 'IPv4' && !iface.internal) {
          // 3. Heuristik Khusus: Abaikan berdasarkan Pola IP
          const isVirtualIP = VIRTUAL_IP_PATTERNS.some((prefix) => iface.address.startsWith(prefix));

          if (isVirtualIP) {
            continue;
          }

          // IP yang lolos semua filter adalah IP Utama
          return iface.address;
        }
      }
    }
  }

  // Fallback: Jika tidak ada IP lokal utama yang ditemukan
  return '127.0.0.1';
}

const ipAddress = getPrimaryLocalIPAddress();

// ===================================================================
// DATA MASTER (bisa ditambah kapan saja)
// ===================================================================
const rolesData: Role[] = [{ name: 'Admin' }, { name: 'Host' }, { name: 'Customer' }, { name: 'System' }];

const countriesData = [
  { name: 'Indonesia', code: 'ID' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Thailand', code: 'TH' },
  { name: 'United States', code: 'US' },
];

const paymentMethodsData = [
  { name: 'Credit/Debit Card' },
  { name: 'Bank Transfer' },
  { name: 'GoPay' },
  { name: 'OVO' },
  { name: 'ShopeePay' },
  { name: 'QRIS' },
];

// ===================================================================
// HELPER: Log Batch Seeding (super ringkas)
// ===================================================================
async function logBatchSeed(
  systemUserId: string,
  table: string,
  items: any[],
  durationMs: number,
  newData?: Record<string, any> | null
) {
  console.log({ newData });
  await createAuditLog({
    action: 'CREATE',
    actor: { id: systemUserId, role: 'System' },
    options: { source: 'SEEDER' },
    table,
    durationMs,
    bulk: {
      count: items.length,
    },
    ip: ipAddress,
    status: 'SUCCESS',
    newData,
  });
}

// ===================================================================
// MAIN SEEDER
// ===================================================================
async function main() {
  console.log('\n🚀 Memulai Database Seeding Inn Horizon...\n');

  // 1. Insert master data (skipDuplicates agar idempotent)
  const { result: resultRolesData, duration_ms: durationMsRolesData } = await withDuration(async () => {
    const method = await db.role.createManyAndReturn({ data: rolesData, skipDuplicates: true });
    return method;
  });
  const { result: resultCountriesData, duration_ms: durationMsCountriesData } = await withDuration(async () => {
    const method = await db.country.createManyAndReturn({ data: countriesData, skipDuplicates: true });
    return method;
  });

  // 2. Ambil referensi penting
  const systemRole = await db.role.findFirst({ where: { name: 'System' } });
  const adminRole = await db.role.findFirst({ where: { name: 'Admin' } });
  const defaultCountry = await db.country.findFirst({ where: { code: 'ID' } });

  if (!systemRole || !defaultCountry) {
    throw new Error('❌ Fatal: Role "System" atau Country "ID" tidak ditemukan.');
  }

  // 3. Buat / pastikan System User ada
  const systemUserData = {
    username: 'system',
    email: 'system@inn_horizon.com',
    password_hash: await hashPassword('system'), // ganti kalau mau password lain
    role_id: systemRole.id,
    country_id: defaultCountry.id,
    first_name: 'System',
    last_name: 'Automaton',
  };
  const { result: systemUser, duration_ms: durationMsSystemUser } = await withDuration(async () => {
    const method = await db.user.upsert({
      where: { username: 'system' },
      update: {
        country_id: defaultCountry.id,
        role_id: systemRole.id,
      },
      create: systemUserData,
    });
    return method;
  });

  console.log(`✅ System User siap → ID: ${systemUser!.id}`);

  // 4. Log semua seeding (batch + single)
  await logBatchSeed(systemUser!.id, 'roles', rolesData, durationMsRolesData, resultRolesData);
  await logBatchSeed(systemUser!.id, 'countries', countriesData, durationMsCountriesData, resultCountriesData);

  // Log pembuatan System User (single create)
  await createAuditLog({
    action: 'CREATE',
    table: 'users',
    options: { source: 'SEEDER' },
    actor: { id: systemUser!.id, role: 'System' },
    durationMs: durationMsSystemUser,
    ip: ipAddress,
    newData: systemUser,
    recordId: systemUser!.id,
    status: 'SUCCESS',
  });

  // 5. Buat Admin User (opsional, tapi sangat direkomendasikan)
  if (adminRole) {
    const adminUserData = {
      username: 'platform_admin',
      email: 'admin@inn_horizon.com',
      password_hash: await hashPassword('inn_horizon'), // password default: inn_horizon
      role_id: adminRole.id,
      country_id: defaultCountry.id,
      first_name: 'Inn',
      last_name: 'Horizon',
    };
    const { result: adminUser, duration_ms: durationMsAdminUser } = await withDuration(async () => {
      const method = await db.user.upsert({
        where: { email: 'admin@inn_horizon.com' },
        update: {
          role_id: adminRole.id,
        },
        create: adminUserData,
      });
      return method;
    });

    console.log(`🔑 Admin User siap → ${adminUser!.email} (password: inn_horizon)`);

    await createAuditLog({
      action: 'CREATE',
      table: 'users',
      actor: { id: systemUser!.id, role: 'System' },
      options: {
        source: 'SEEDER',
      },
      durationMs: durationMsAdminUser,
      ip: ipAddress,
      newData: systemUser,
      recordId: adminUser!.id,
      status: 'SUCCESS',
    });
  }

  const { result: resultPaymentMethodsData, duration_ms: durationMsPaymentMethodsData } = await withDuration(
    async () => {
      const method = await db.paymentMethod.createManyAndReturn({ data: paymentMethodsData, skipDuplicates: true });
      return method;
    }
  );

  await logBatchSeed(
    systemUser!.id,
    'payment_methods',
    paymentMethodsData,
    durationMsPaymentMethodsData,
    resultPaymentMethodsData
  );

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
