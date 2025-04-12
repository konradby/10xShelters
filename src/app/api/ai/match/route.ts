import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AIMatchRequestSchema } from '@/lib/schemas/ai-match.schema';
import { AIService } from '@/lib/ai-service';
import { AIMatchResponseDTO, DogSize } from '@/types/types';

interface AIMatch {
  dog_id: string;
  match_percentage: number;
  reasoning: string;
}

interface DogBreed {
  name: string;
  size: DogSize;
}

interface Dog {
  id: string;
  name: string;
  breed: DogBreed;
  primary_image: string;
}

export async function POST(request: Request) {
  try {
    // Autoryzacja
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Brak autoryzacji' }, { status: 401 });
    }

    // Walidacja żądania
    const body = await request.json();
    const validationResult = AIMatchRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    // Rate limiting
    const { data: recentSearches } = await supabase
      .from('ai_searches')
      .select('created_at')
      .eq('user_id', session.user.id)
      .gte('created_at', new Date(Date.now() - 60000).toISOString())
      .limit(10);

    if (recentSearches && recentSearches.length >= 10) {
      return NextResponse.json(
        { error: 'Przekroczono limit zapytań. Spróbuj ponownie za minutę.' },
        { status: 429 }
      );
    }

    // Zapisanie wyszukiwania
    await supabase.from('ai_searches').insert({
      user_id: session.user.id,
      prompt: body.prompt,
      limit: body.limit,
    });

    // Przetwarzanie przez AI
    const aiService = new AIService();
    const aiMatches = (await aiService.matchDogs(body)) as AIMatch[];

    // Pobranie danych psów
    const { data: dogs } = await supabase
      .from('dogs')
      .select(
        `
        id,
        name,
        breed:breeds (
          name,
          size
        ),
        primary_image
      `
      )
      .in(
        'id',
        aiMatches.map((match: AIMatch) => match.dog_id)
      )
      .limit(body.limit);

    if (!dogs) {
      return NextResponse.json(
        { error: 'Nie znaleziono psów' },
        { status: 404 }
      );
    }

    // Przygotowanie odpowiedzi
    const response: AIMatchResponseDTO = {
      matches: dogs.map((dog: any) => {
        const match = aiMatches.find((m: AIMatch) => m.dog_id === dog.id);
        return {
          dog_id: dog.id,
          match_percentage: match?.match_percentage || 0,
          reasoning: match?.reasoning || '',
          dog: {
            id: dog.id,
            name: dog.name,
            breed: {
              name: dog.breed.name,
              size: dog.breed.size,
            },
            primary_image: dog.primary_image,
          },
        };
      }),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in AI match endpoint:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    );
  }
}
