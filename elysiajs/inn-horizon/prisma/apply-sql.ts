import fs from 'fs';
import path from 'path';
import { prisma } from '.';

async function main() {
  console.log('🚀 Mulai menerapkan Trigger & Index custom...');

  const sqlPath = path.join(__dirname, 'sql', 'init_core_constraints_indexes_triggers.sql');
  const sqlContent = fs.readFileSync(sqlPath, 'utf-8');

  try {
    await prisma.$executeRawUnsafe(sqlContent);
    console.log('✅ Berhasil! Trigger & Index sudah terpasang.');
  } catch (e) {
    console.error('❌ Gagal menerapkan SQL:', e);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
