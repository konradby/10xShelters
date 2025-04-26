import { UserRole } from '@/types';

export interface AppUser {
  id: string;
  email: string;
  role: UserRole;
}
