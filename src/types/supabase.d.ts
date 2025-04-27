import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../db/database.types';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      // Dodaj inne zmienne środowiskowe Supabase, jeśli są potrzebne
    }
  }
}

// Możesz również dodać rozszerzenie dla kontekstu API Routes, jeśli używasz
declare module 'next' {
  interface NextApiRequest {
    supabase?: SupabaseClient<Database>;
  }
}
