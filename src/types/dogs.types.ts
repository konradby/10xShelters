export interface TagEntry {
  tag: {
    id: string;
    name: string;
  }[];
}

export type Tag = {
  id: string;
  name: string;
};

export type DogTag = {
  tag: Tag;
};

export type DogImage = {
  id: string;
  image_path: string;
  is_primary: boolean;
};

export type Shelter = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
};

export type Breed = {
  id: string;
  name: string;
  size: string;
  coat_type: string;
  energy_level: number;
  shedding_level: number;
  sociability: number;
  trainability: number;
  description: string;
};

export type DogDetailsDTO = {
  id: string;
  name: string;
  approximate_age: number;
  color: string;
  description: string;
  gender: 'male' | 'female';
  mixed_breed: boolean;
  weight: number;
  status: string;
  size: string;
  breed: Breed;
  shelter: Shelter;
  images: DogImage[];
  tags: DogTag[];
};

export type DogListItem = {
  id: string;
  name: string;
  breed: string;
  size: string;
  approximate_age: string | null;
};
