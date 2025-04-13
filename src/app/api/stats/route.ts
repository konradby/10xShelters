import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Cache dla statystyk (TTL: 5 minut)
const CACHE_TTL = 5 * 60 * 1000;
let statsCache: {
  timestamp: number;
  data: any;
} | null = null;

export async function GET() {
  try {
    // Sprawdzenie cache'u
    if (statsCache && Date.now() - statsCache.timestamp < CACHE_TTL) {
      return NextResponse.json(statsCache.data);
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Pobieramy szczegółowe statystyki z widoku shelter_stats
    const { data: shelterStats, error: shelterStatsError } = await supabase
      .from('shelter_stats')
      .select('*');

    if (shelterStatsError) {
      console.error('Error fetching shelter stats:', shelterStatsError);
      return NextResponse.json(
        { error: 'Błąd podczas pobierania statystyk schronisk' },
        { status: 500 }
      );
    }

    // Obliczamy sumaryczne statystyki
    const totalStats = {
      sheltersCount: shelterStats?.length || 0,
      dogsCount:
        shelterStats?.reduce((sum, stat) => sum + (stat.total_dogs || 0), 0) ||
        0,
      availableDogsCount:
        shelterStats?.reduce(
          (sum, stat) => sum + (stat.available_dogs || 0),
          0
        ) || 0,
      adoptedDogsCount:
        shelterStats?.reduce(
          (sum, stat) => sum + (stat.adopted_dogs || 0),
          0
        ) || 0,
      sheltersByCity:
        shelterStats?.reduce(
          (acc, stat) => {
            const city = stat.shelter_city || 'Nieznane';
            acc[city] = (acc[city] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        ) || {},
    };

    // Aktualizujemy cache
    statsCache = {
      timestamp: Date.now(),
      data: totalStats,
    };

    return NextResponse.json(totalStats);
  } catch (error) {
    console.error('Error in stats endpoint:', error);
    return NextResponse.json(
      { error: 'Wystąpił nieoczekiwany błąd podczas pobierania statystyk' },
      { status: 500 }
    );
  }
}
