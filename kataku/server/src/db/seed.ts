import { seed } from 'drizzle-seed';
import { db } from './index';
import * as schema from './schema';

const main = async () => {
  const titlesOfCourtesy = ['Mr.', 'Ms.', 'Dr.', 'Prof.'];
  const accountProviders = ['Google', 'Facebook', 'Twitter', 'GitHub'];
  const accountScopes = ['read', 'write', 'admin'];
  const status = ['active', 'inactive', 'suspended'];
  const notesAuthors = ['admin', 'user1', 'user2', 'user3'];

  await seed(db, schema).refine((funcs) => ({
    user: {
      count: 4,
      columns: {
        name: funcs.fullName(),
        email: funcs.email(),
        emailVerified: funcs.boolean(),
        image: `https://randomuser.me/api/portraits/men/${funcs.int({ minValue: 1, maxValue: 99 })}.jpg`,
        createdAt: funcs.date({ minDate: '2020-01-01', maxDate: '2024-12-31' }),
        updatedAt: funcs.date({ minDate: '2020-01-01', maxDate: '2024-12-31' }),
        username: funcs.userName(),
        displayUsername: funcs.fullName(),
      },
    },
    session: {
      count: 4,
      columns: {
        expiresAt: funcs.date({ minDate: '2023-01-01', maxDate: '2024-12-31' }),
        token: crypto.randomUUID(),
        createdAt: funcs.date({ minDate: '2020-01-01', maxDate: '2024-12-31' }),
        updatedAt: funcs.date({ minDate: '2020-01-01', maxDate: '2024-12-31' }),
        ipAddress: funcs.ip(),
        userAgent: funcs.userAgent(),
        userId: funcs.valuesFromArray({ values: notesAuthors }),
      },
    },
    account: {
      count: 4,
      columns: {
        id: crypto.randomUUID(),
        accountId: crypto.randomUUID(),
        providerId: funcs.valuesFromArray({ values: accountProviders }),
        userId: crypto.randomUUID(),
        accessToken: crypto.randomUUID(),
        refreshToken: crypto.randomUUID(),
        idToken: crypto.randomUUID(),
        accessTokenExpiresAt: funcs.date({ minDate: '2023-01-01', maxDate: '2024-12-31' }),
        refreshTokenExpiresAt: funcs.date({ minDate: '2023-01-01', maxDate: '2024-12-31' }),
        scope: funcs.valuesFromArray({ values: accountScopes }),
        password: funcs.password(),
        createdAt: funcs.date({ minDate: '2020-01-01', maxDate: '2024-12-31' }),
        updatedAt: funcs.date({ minDate: '2020-01-01', maxDate: '2024-12-31' }),
      },
    },
    verification: {
      count: 4,
      columns: {
        identifier: funcs.email(),
        value: crypto.randomUUID(),
        expiresAt: funcs.date({ minDate: '2023-01-01', maxDate: '2024-12-31' }),
        createdAt: funcs.date({ minDate: '2023-01-01', maxDate: '2024-12-31' }),
        updatedAt: funcs.date({ minDate: '2023-01-01', maxDate: '2024-12-31' }),
      },
    },
    note: {
      count: 4,
      columns: {
        title: funcs.sentence({ min: 5, max: 10 }),
        slug: funcs.slug(),
        content: funcs.paragraph(),
        createdAt: funcs.date({ minDate: '2020-01-01', maxDate: '2024-12-31' }),
        updatedAt: funcs.date({ minDate: '2020-01-01', maxDate: '2024-12-31' }),
        author: funcs.valuesFromArray({ values: notesAuthors }),
      },
    },
  }));
};

main();
