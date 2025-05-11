import { logError } from '@/lib';
import { DogDetailsDTO } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';

const dogDetailsQuery = `
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
      `;

export class DogsService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getDogById(id: string): Promise<DogDetailsDTO | null> {
    const { data, error } = await this.supabase
      .from('dogs')
      .select(dogDetailsQuery)
      .eq('id', id)
      .single();

    if (error || !data?.id) {
      logError('Error fetching dog by id:', { data, error });
      return null;
    }

    return data as unknown as DogDetailsDTO;
  }

  async getDogs(limit: number = 10): Promise<DogDetailsDTO[]> {
    const { data, error } = await this.supabase
      .from('dogs')
      .select(dogDetailsQuery)
      .eq('status', 'available')
      .limit(limit);

    if (error) {
      logError('Error fetching dogs:', { error });
      return [];
    }

    return data as unknown as DogDetailsDTO[];
  }
}
