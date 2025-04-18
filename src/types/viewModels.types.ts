import { UUID, DogSize, UserRole } from './types';

// Model dla karty psa w wynikach wyszukiwania
export type DogCardViewModel = {
  id: UUID;
  name: string;
  breedName: string;
  size: DogSize;
  imageUrl: string;
  matchPercentage: number;
};

// Model dla sekcji statystyk
export type StatsViewModel = {
  sheltersCount: number;
  dogsCount: number;
  adoptionsCount: number;
  availableDogsCount: number;
  adoptedDogsCount: number;
  sheltersByCity: Record<string, number>;
};

// Model statusu uwierzytelniania
export type AuthStatusViewModel = {
  isLoggedIn: boolean;
  user: {
    id: UUID;
    email: string;
    role: UserRole;
  } | null;
};
