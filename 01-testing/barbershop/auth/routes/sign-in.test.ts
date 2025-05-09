import db from '@/db';
import { usersTable } from '@/db/schema';
import { first } from '@/db/utils';
import { treaty } from '@elysiajs/eden';
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { eq } from 'drizzle-orm';
import { ERROR, INFO } from '../constants';
import { type SignInRoute } from './sign-in';

const api = treaty<SignInRoute>(`${process.env.API_BASE_URL_V1!}/auth/`);

describe('/sign-in', async () => {
  beforeEach(async () => {
    await db.insert(usersTable).values({
      email: 'lhildawan@gmail.com',
      isEmailVerified: false,
      isSignIn: false,
    });

    await db.insert(usersTable).values({
      email: 'delismj@gmail.com',
      isEmailVerified: false,
      isSignIn: false,
    });
  });

  afterEach(async () => {
    await db.delete(usersTable).where(eq(usersTable.email, 'lhildawan@gmail.com'));
    await db.delete(usersTable).where(eq(usersTable.email, 'delismj@gmail.com'));
  });

  it('should return 404 if the email is not registered', async () => {
    const res = await api['sign-in'].post({ email: 'ledihildawan@live.com' });

    expect(res.error?.status).toBe(404);
    expect(res.error?.value).toEqual(ERROR.EMAIL_NOT_FOUND);
  });

  it('should return 401 if email is not verified', async () => {
    const res = await api['sign-in'].post({ email: 'delismj@gmail.com' });

    expect(res.status).toBe(401);
    expect(res.error?.value).toEqual(ERROR.EMAIL_NOT_VERIFIED);
  });

  // it('should return 200 and magic link sent if email is verified and not sign in', async () => {
  //   const user = await first(db.select().from(usersTable).where(eq(usersTable.email, 'lhildawan@gmail.com')).limit(1));
  //   const updatedUser = await first(
  //     db
  //       .update(usersTable)
  //       .set({ isEmailVerified: true, emailVerifiedAt: new Date(), isSignIn: false })
  //       .where(eq(usersTable.userId, user!.userId))
  //       .returning()
  //   );

  //   expect(updatedUser!.isSignIn).toBeFalse();
  //   expect(updatedUser!.isEmailVerified).toBeTrue();

  //   const res = await api['sign-in'].post({ email: updatedUser!.email });

  //   console.log(res.data);

  //   expect(res.status).toBe(200);

  //   // expect(res.data).toStrictEqual(SUCCESS.EMAIL_VERIFIED);
  // });

  it('should return info if user is already signed in and token still valid', async () => {
    const user = await first(db.select().from(usersTable).where(eq(usersTable.email, 'lhildawan@gmail.com')).limit(1));
    const updatedUser = await first(
      db
        .update(usersTable)
        .set({ isEmailVerified: true, emailVerifiedAt: new Date(), isSignIn: true, lastSignInAt: new Date() })
        .where(eq(usersTable.userId, user!.userId))
        .returning()
    );

    const res = await api['sign-in'].post({ email: updatedUser!.email });

    expect(res.status).toBe(200);

    expect(res.data).toEqual(INFO.EMAIL_ALREADY_SIGNED_IN);
  });
});
