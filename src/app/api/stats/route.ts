import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Pobieramy statystyki z bazy danych
    const [
      { data: shelters, error: sheltersError },
      { data: dogs, error: dogsError },
      { data: adoptions, error: adoptionsError },
    ] = await Promise.all([
      supabase.from('shelters').select('id'),
      supabase.from('dogs').select('id'),
      supabase.from('adoptions').select('id'),
    ]);

    // Sprawdzamy czy wystąpiły błędy
    if (sheltersError || dogsError || adoptionsError) {
      console.error('Database errors:', {
        sheltersError,
        dogsError,
        adoptionsError,
      });
      return NextResponse.json(
        { error: 'Błąd podczas pobierania danych z bazy' },
        { status: 500 }
      );
    }

    // Zwracamy statystyki
    return NextResponse.json({
      sheltersCount: shelters?.length || 0,
      dogsCount: dogs?.length || 0,
      adoptionsCount: adoptions?.length || 0,
    });
  } catch (error) {
    console.error('Error in stats endpoint:', error);
    return NextResponse.json(
      { error: 'Wystąpił nieoczekiwany błąd podczas pobierania statystyk' },
      { status: 500 }
    );
  }
}
