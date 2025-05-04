import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Redirect logged-in users away from auth pages
  if (
    token &&
    (pathname === '/sign-in' ||
     pathname === '/sign-up' ||
     pathname === '/connect')
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect guests trying to access protected pages
  if (
    !token &&
    (pathname.startsWith('/connect') ||
     pathname.startsWith('/video') ||
     pathname.startsWith('/profile'))
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

 
export const config = {
    matcher: [
      '/connect/:path*',
      '/video/:path*',
      '/sign-in',
      '/sign-up',
      '/profile/:path*',
    ],
  };
  
  