import { DogSize } from '@/types';

export interface AIMatch {
  dog_id: string;
  match_percentage: number;
  reasoning: string;
}

export interface DogBreed {
  name: string;
  size: DogSize;
}

export interface Dog {
  id: string;
  name: string;
  breed: DogBreed;
  primary_image: string;
}
