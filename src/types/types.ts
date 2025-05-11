// Typy pomocnicze
export type UUID = string;
export type Email = string;
export type Phone = string;
export type PostalCode = string;

// Typy wyliczeniowe
export const OUserRole = {
  EMPLOYEE: 'employee',
  USER: 'user',
} as const;

export type UserRole = (typeof OUserRole)[keyof typeof OUserRole];

export const ODogStatus = {
  AVAILABLE: 'available',
  ADOPTED: 'adopted',
} as const;

export type DogStatus = (typeof ODogStatus)[keyof typeof ODogStatus];

export const ODogGender = {
  MALE: 'male',
  FEMALE: 'female',
} as const;

export type DogGender = (typeof ODogGender)[keyof typeof ODogGender];

export const ODogSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export type DogSize = (typeof ODogSize)[keyof typeof ODogSize];

// Authentication DTOs
export type RegisterUserDTO = {
  email: Email;
  password: string;
  full_name: string;
  phone: Phone;
  role: UserRole;
};

export type LoginDTO = {
  email: Email;
  password: string;
};

export type AuthResponseDTO = {
  access_token: string;
  refresh_token: string;
  user: {
    id: UUID;
    email: Email;
    role: UserRole;
  };
};

// Shelter DTOs
export type ShelterListDTO = {
  data: Array<{
    id: UUID;
    name: string;
    city: string;
    active: boolean;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export type ShelterDTO = {
  id: UUID;
  name: string;
  address: string;
  city: string;
  postal_code: PostalCode;
  phone: Phone;
  email: Email;
  description: string | null;
  active: boolean;
};

export type CreateShelterDTO = Omit<ShelterDTO, 'id' | 'active'>;

// Dog DTOs
export type DogListDTO = {
  data: Array<{
    id: UUID;
    name: string;
    breed: {
      id: UUID;
      name: string;
      size: DogSize;
    };
    shelter: {
      id: UUID;
      name: string;
      city: string;
    };
    status: DogStatus;
    primary_image: string;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export type DogDTO = {
  id: UUID;
  name: string;
  breed: {
    id: UUID;
    name: string;
    size: DogSize;
    coat_type: string;
    shedding_level: number;
  };
  shelter: {
    id: UUID;
    name: string;
    address: string;
    city: string;
    phone: Phone;
    email: Email;
  };
  approximate_age: string | null;
  weight: number | null;
  color: string | null;
  gender: DogGender;
  status: DogStatus;
  description: string | null;
  images: Array<{
    id: UUID;
    url: string;
    is_primary: boolean;
  }>;
};

export type CreateDogDTO = {
  name: string;
  shelter_id: UUID;
  breed_id: UUID;
  approximate_age: string | null;
  weight: number | null;
  color: string | null;
  gender: DogGender;
  description: string | null;
};

export type UpdateDogStatusDTO = {
  status: DogStatus;
};

// AI Matching DTOs
export type AIMatchRequestDTO = {
  prompt: string;
  limit: number;
};

export type AiMatchDogDetails = {
  dog_id: UUID;
  match_percentage: number;
  reasoning: string;
  dog_details: {
    id: UUID;
    name: string;
    breed: {
      name: string;
      size: DogSize;
    };
    primary_image: string;
  };
};

export type AIMatchResponseDTO = AiMatchDogDetails[];

// Command Models
export type RegisterUserCommand = RegisterUserDTO;
export type LoginCommand = LoginDTO;
export type CreateShelterCommand = CreateShelterDTO;
export type CreateDogCommand = CreateDogDTO;
export type UpdateDogStatusCommand = UpdateDogStatusDTO;
export type AIMatchCommand = AIMatchRequestDTO;
