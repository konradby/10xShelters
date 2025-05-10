import { logError } from '@/lib';
import { DogDetails } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest ,
): Promise<NextResponse<DogDetails | { error: string }>> {
  const id = request.nextUrl.pathname.split('/').pop();
  const supabase = await createClient();

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
    logError('Wystąpił błąd podczas pobierania danych psa', {error});
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas pobierania danych psa' },
      { status: 500 }
    );
  }

  if (!dog) {
    return NextResponse.json({ error: 'Dog not found' }, { status: 404 });
  }

  return NextResponse.json(dog as unknown as DogDetails);
}
