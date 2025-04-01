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

export const ensureFreshToken = async ({
  jwt,
  email,
  token,
  userId,
  column = 'verificationToken',
}: {
  jwt: any;
  email: string;
  userId: number;
  token?: string;
  column?: string;
}) => {
  const decoded = await decodeToken(jwt)(token || '');

  if (decoded)
    return {
      token,
      isFreshToken: false,
    };

  const newToken = await createToken(jwt)(email);

  await db
    .update(usersTable)
    .set({ [column]: newToken })
    .where(eq(usersTable.userId, userId));

  return {
    token: newToken,
    isFreshToken: true,
  };
};
