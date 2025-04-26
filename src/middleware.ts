import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Publiczne ścieżki, które nie wymagają autentykacji
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/dogs',
    '/auth/callback',
    '/api/public',
  ];

  // Sprawdź czy ścieżka jest publiczna
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return await updateSession(request);
  }

  // Sprawdź czy ścieżka jest statycznym zasobem
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(jpg|jpeg|png|gif|ico|svg|webp)$/)
  ) {
    return;
  }

  // Dla pozostałych ścieżek wymagana jest autentykacja
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
