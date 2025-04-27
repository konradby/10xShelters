import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/db/database.types';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name);
          return cookie?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set(name, value, {
              ...options,
              sameSite: 'lax',
              path: '/',
            });
          } catch (error) {
            // Ignoruj błędy podczas ustawiania ciasteczek w Server Components
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set(name, '', {
              ...options,
              maxAge: 0,
              sameSite: 'lax',
              path: '/',
            });
          } catch (error) {
            // Ignoruj błędy podczas usuwania ciasteczek w Server Components
          }
        },
      },
    }
  );
}
