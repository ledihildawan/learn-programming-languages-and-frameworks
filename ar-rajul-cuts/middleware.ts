import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // const res = await fetch(`/api/user/profile`, {
  //   headers: {
  //     Cookie: request.headers.get('Cookie') || '',
  //   },
  //   credentials: 'include',
  // });

  // const isAuthenticated = res.ok;

  // console.log(res);

  // const isAuthPage = ['/sign-in', '/sign-up'].includes(request.nextUrl.pathname);

  // if (isAuthenticated && isAuthPage) {
  //   return NextResponse.redirect(new URL('/profile', request.url));
  // }

  // if (!isAuthenticated && !isAuthPage) {
  //   return NextResponse.redirect(new URL('/sign-in', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [],
};
