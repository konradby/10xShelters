import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './db/database.types';

export async function middleware(request: NextRequest) {
  try {
    // Inicjalizacja klienta supabase dla middleware
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient<Database>(supabaseUrl, supabaseKey);

    // Pobierz token z cookie
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Tutaj możesz dodać logikę autoryzacji, np. przekierowanie na stronę logowania
    // jeśli użytkownik nie jest zalogowany, a próbuje uzyskać dostęp do chronionych stron

    return NextResponse.next();
  } catch (error) {
    console.error('Błąd middleware:', error);
    return NextResponse.next();
  }
}

// Określ, dla których ścieżek middleware ma być uruchamiane
export const config = {
  matcher: [
    // Dodaj ścieżki, które wymagają sprawdzenia autoryzacji
    '/dashboard/:path*',
    '/profile/:path*',
    // Możesz też wykluczyć pewne ścieżki
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
