import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const supabase = await createClient();

  // Pobieramy szczegółowe dane psa
  const { data: dog, error } = await supabase
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
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas pobierania danych psa' },
      { status: 500 }
    );
  }

  if (!dog) {
    return NextResponse.json(
      { error: 'Nie znaleziono psa o podanym ID' },
      { status: 404 }
    );
  }

  // Przygotowanie danych do odpowiedzi
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

  const dogData = {
    id: dog.id,
    name: dog.name,
    approximate_age: dog.approximate_age,
    color: dog.color,
    description: dog.description,
    gender: dog.gender,
    mixed_breed: dog.mixed_breed,
    weight: dog.weight,
    status: dog.status,
    breed: {
      id: 'id' in breedInfo ? breedInfo.id : undefined,
      name: breedInfo.name,
      size: breedInfo.size,
      coat_type: 'coat_type' in breedInfo ? breedInfo.coat_type : undefined,
      energy_level: 'energy_level' in breedInfo ? breedInfo.energy_level : undefined,
      shedding_level: 'shedding_level' in breedInfo ? breedInfo.shedding_level : undefined,
      sociability: 'sociability' in breedInfo ? breedInfo.sociability : undefined,
      trainability: 'trainability' in breedInfo ? breedInfo.trainability : undefined,
      description: 'description' in breedInfo ? breedInfo.description : undefined,
    },
    shelter: dog.shelter && Array.isArray(dog.shelter) && dog.shelter.length > 0
      ? {
          id: dog.shelter[0].id,
          name: dog.shelter[0].name,
          city: dog.shelter[0].city,
          address: dog.shelter[0].address,
          phone: dog.shelter[0].phone,
          email: dog.shelter[0].email,
        }
      : null,
    primary_image: primaryImage,
    images: Array.isArray(dog.images)
      ? dog.images.map((img: any) => ({
          id: img.id,
          url: img.image_path,
          is_primary: img.is_primary,
        }))
      : [],
    tags: dogTags,
  };

  return NextResponse.json(dogData);
}
