import db from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import mail from '../mail';
import { setupTemplateEmailSignIn } from '../mail/sign-in';
import { setupTemplateEmailSignUp } from '../mail/sign-up';
import type { TokenPayload } from './types';

export const sendVerificationEmail = async (email: string, token: string, type: 'signup' | 'signin') => {
  await mail.sendMail({
    to: email,
    from: 'lhildawan@gmail.com',
    subject:
      type === 'signup' ? 'Welcome! Please Verify Your Email to Complete Registration' : 'Your Magic Link to Sign In',
    html: type === 'signup' ? setupTemplateEmailSignUp(token) : setupTemplateEmailSignIn(token),
  });
};

export const decodeToken =
  (jwt) =>
  async (token: string): Promise<TokenPayload | null> => {
    try {
      return (await jwt.verify(token)) as TokenPayload;
    } catch {
      return null;
    }
  };

export const createToken =
  (jwt) =>
  async (email: string): Promise<string> => {
    return await jwt.sign({ email });
  };

export const createTokenVerification =
  (jwt) =>
  async ({ email, userId, verificationToken }: { email: string; userId: number; verificationToken: string }) => {
    const decoded = await decodeToken(jwt)(verificationToken || '');

    if (decoded)
      return {
        isFreshToken: false,
        verificationToken,
        oldVerificationToken: verificationToken || null,
      };

    const newVerificationToken = await createToken(jwt)(email);

    await db.update(usersTable).set({ verificationToken: newVerificationToken }).where(eq(usersTable.userId, userId));

    return {
      isFreshToken: true,
      verificationToken: newVerificationToken,
      oldVerificationToken: verificationToken || null,
    };
  };
