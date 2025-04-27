import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { Database } from '@/db/database.types';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: request,
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: request,
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  await supabase.auth.getSession();

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

  // Jeśli użytkownik nie jest zalogowany i próbuje uzyskać dostęp do chronionej ścieżki
  if (!publicPaths.some((path) => pathname.startsWith(path))) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Jeśli użytkownik jest zalogowany i próbuje uzyskać dostęp do strony logowania/rejestracji
  if (pathname === '/login' || pathname === '/register') {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return response;
}
