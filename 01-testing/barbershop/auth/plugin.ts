import jwt from '@elysiajs/jwt';

export const authJwt = jwt({
  exp: '1m',
  name: 'jwtSignUp',
  secret: process.env.JWT_SECRET!,
});
