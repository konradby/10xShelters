export interface DogImage {
  id: string;
  image_path: string;
  is_primary: boolean;
}

export interface Tag {
  id: string;
  name: string;
}

export interface TagEntry {
  tag: {
    id: string;
    name: string;
  }[];
}

export type DogDetails = {
  id: string;
  name: string;
  breed:
    | string
    | Array<{
        name: string;
        size: string;
        energy_level?: number;
        sociability?: number;
        trainability?: number;
      }>;
  size: string;
  approximate_age: string | null;
  gender: string;
  color: string | null;
  weight: number | null;
  energy_level?: number;
  sociability?: number;
  trainability?: number;
  tags: Array<{ tag?: { name: string } }>;
  description: string | null;
};

export type DogListItem = {
  id: string;
  name: string;
  breed: string;
  size: string;
  approximate_age: string | null;
};
