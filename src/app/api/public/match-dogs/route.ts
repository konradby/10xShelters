import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { AIMatchRequestSchema } from '@/lib/schemas/ai-match.schema';
import { AIService } from '@/lib/ai-service';
import { AIMatch } from './types';

export async function POST(request: Request) {
  const supabase = await createClient();

  const body = await request.json();
  const validationResult = AIMatchRequestSchema.safeParse(body);
  console.log('🚀 ~ POST ~ validationResult:', validationResult);

  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error.errors[0].message },
      { status: 400 }
    );
  }

  // Najpierw pobieramy dane psów z bazy danych
  const { data: dogs, error: dogsError } = await supabase
    .from('dogs')
    .select(
      `
      id,
      name,
      approximate_age,
      color,
      description,
      gender,
      mixed_breed,
      weight,
      status,
      breed:breeds (
        id,
        name,
        size,
        coat_type,
        energy_level,
        shedding_level,
        sociability,
        trainability,
        description
      ),
      shelter:shelters (
        id,
        name,
        city,
        address,
        phone,
        email
      ),
      images:dog_images (
        id,
        image_path,
        is_primary
      ),
      tags:dog_tags (
        tag:tags (
          id,
          name
        )
      )
      `
    )
    .eq('status', 'available')
    .limit(10);

  if (dogsError) {
    console.error('Error fetching dogs:', dogsError);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas pobierania danych psów' },
      { status: 500 }
    );
  }

  if (!dogs || dogs.length === 0) {
    return NextResponse.json(
      { error: 'Nie znaleziono dostępnych psów' },
      { status: 404 }
    );
  }

  // Następnie przekazujemy dane do serwisu AI
  const aiService = new AIService();
  let aiMatches: AIMatch[] | null = null;

  try {
    aiMatches = await aiService.matchDogs(body, dogs);
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

  // Przygotowujemy odpowiedź z dopasowanymi psami
  const matchedDogs = dogs
    .filter((dog) => aiMatches?.some((match) => match.dog_id === dog.id))
    .slice(0, body.limit);

  const response = {
    matches: matchedDogs.map((dog: any) => {
      const match = aiMatches?.find((m) => m.dog_id === dog.id);
      const breedInfo =
        Array.isArray(dog.breed) && dog.breed.length > 0
          ? dog.breed[0]
          : { name: '', size: '' };

      const primaryImage = Array.isArray(dog.images)
        ? dog.images.find((img: any) => img.is_primary)?.image_path ||
          dog.images[0]?.image_path ||
          null
        : null;

      const dogTags = Array.isArray(dog.tags)
        ? dog.tags.map((tagEntry: any) => tagEntry.tag).filter(Boolean)
        : [];

      return {
        dog_id: dog.id,
        match_percentage: match?.match_percentage || 0,
        reasoning: match?.reasoning || '',
        dog: {
          id: dog.id,
          name: dog.name,
          approximate_age: dog.approximate_age,
          color: dog.color,
          description: dog.description,
          gender: dog.gender,
          mixed_breed: dog.mixed_breed,
          weight: dog.weight,
          breed: {
            id: breedInfo.id,
            name: breedInfo.name,
            size: breedInfo.size,
            coat_type: breedInfo.coat_type,
            energy_level: breedInfo.energy_level,
            shedding_level: breedInfo.shedding_level,
            sociability: breedInfo.sociability,
            trainability: breedInfo.trainability,
            description: breedInfo.description,
          },
          shelter: dog.shelter
            ? {
                id: dog.shelter.id,
                name: dog.shelter.name,
                city: dog.shelter.city,
                address: dog.shelter.address,
                phone: dog.shelter.phone,
                email: dog.shelter.email,
              }
            : null,
          primary_image: primaryImage,
          images: Array.isArray(dog.images)
            ? dog.images.map((img: any) => ({
                id: img.id,
                path: img.image_path,
                is_primary: img.is_primary,
              }))
            : [],
          tags: dogTags,
        },
      };
    }),
  };

  return NextResponse.json(response);
}
