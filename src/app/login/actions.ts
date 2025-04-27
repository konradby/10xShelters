'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

export type LoginState = {
  error?: string;
  success?: boolean;
};

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  if (!data.email || !data.password) {
    return { error: 'Email i hasło są wymagane' };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error('Błąd logowania:', error);
    return { error: 'Nieprawidłowe dane logowania' };
  }

  revalidatePath('/', 'layout');
  return { success: true };
}
