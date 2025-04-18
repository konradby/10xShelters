import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { AIMatchRequestSchema } from '@/lib/schemas/ai-match.schema';
import { AIService } from '@/lib/ai-service';
import { AIMatch } from './types';

export async function POST(request: Request) {
  const supabase = await createClient();

  const body = await request.json();
  const validationResult = AIMatchRequestSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error.errors[0].message },
      { status: 400 }
    );
  }

  const aiService = new AIService();
  let aiMatches: AIMatch[] | null = null;

  try {
    aiMatches = await aiService.matchDogs(body);
  } catch (error) {
    console.error('Error in AI service:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas przetwarzania AI' },
      { status: 503 }
    );
  }

  if (!aiMatches || !Array.isArray(aiMatches) || aiMatches.length === 0) {
    return NextResponse.json(
      { error: 'Nie otrzymano wyników dopasowania' },
      { status: 404 }
    );
  }

  const { data: dogs, error: dogsError } = await supabase
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
      aiMatches.map((m) => m.dog_id)
    )
    .limit(body.limit);

  if (dogsError) {
    console.error('Error fetching dogs:', dogsError);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas pobierania danych psów' },
      { status: 500 }
    );
  }

  if (!dogs || dogs.length === 0) {
    return NextResponse.json({ error: 'Nie znaleziono psów' }, { status: 404 });
  }

  const response = {
    matches: dogs.map((dog: any) => {
      const match = aiMatches?.find((m) => m.dog_id === dog.id);
      const breedInfo =
        Array.isArray(dog.breed) && dog.breed.length > 0
          ? dog.breed[0]
          : { name: '', size: '' };

      return {
        dog_id: dog.id,
        match_percentage: match?.match_percentage || 0,
        reasoning: match?.reasoning || '',
        dog: {
          id: dog.id,
          name: dog.name,
          breed: {
            name: breedInfo.name,
            size: breedInfo.size,
          },
          primary_image: dog.primary_image,
        },
      };
    }),
  };

  return NextResponse.json(response);
}
