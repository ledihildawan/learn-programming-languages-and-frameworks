import { faker } from '@faker-js/faker'; // Menggunakan faker untuk data acak
import { db } from './db'; // Pastikan sudah menghubungkan ke database Anda
import { account, note, session, user, verification } from './schema'; // Impor skema Anda

// Fungsi untuk melakukan seeding
async function seedDatabase() {
  // Menambahkan pengguna
  const newUser = await db
    .insert(user)
    .values({
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      emailVerified: true,
      image: faker.image.avatar(),
      createdAt: new Date(),
      updatedAt: new Date(),
      username: faker.internet.userName(),
      displayUsername: faker.name.firstName(),
    })
    .returning();

  const userId = newUser[0].id;
  const username = newUser[0].username;

  // Menambahkan sesi
  await db.insert(session).values({
    id: faker.datatype.uuid(),
    expiresAt: new Date(Date.now() + 3600 * 1000), // 1 jam ke depan
    token: faker.datatype.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ipAddress: faker.internet.ip(),
    userAgent: faker.internet.userAgent(),
    userId: userId,
  });

  // Menambahkan akun
  await db.insert(account).values({
    id: faker.datatype.uuid(),
    accountId: faker.datatype.uuid(),
    providerId: 'google',
    userId: userId,
    accessToken: faker.datatype.uuid(),
    refreshToken: faker.datatype.uuid(),
    idToken: faker.datatype.uuid(),
    accessTokenExpiresAt: new Date(Date.now() + 7200 * 1000), // 2 jam ke depan
    refreshTokenExpiresAt: new Date(Date.now() + 14400 * 1000), // 4 jam ke depan
    scope: 'email profile',
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Menambahkan verifikasi
  await db.insert(verification).values({
    id: faker.datatype.uuid(),
    identifier: userId,
    value: faker.datatype.uuid(),
    expiresAt: new Date(Date.now() + 86400 * 1000), // 1 hari ke depan
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Menambahkan catatan
  await db.insert(note).values({
    title: faker.lorem.sentence(),
    slug: faker.lorem.slug(),
    content: faker.lorem.paragraph(),
    createdAt: new Date(),
    updatedAt: new Date(),
    author: username,
  });

  console.log('Database seeding completed!');
}

// Memanggil fungsi seeding
seedDatabase().catch((error) => {
  console.error('Error during seeding:', error);
});
