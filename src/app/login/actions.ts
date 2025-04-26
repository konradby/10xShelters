'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  if (!data.email || !data.password) {
    redirect('/login?error=Email i hasło są wymagane');
  }

  await supabase.auth.signInWithPassword(data).catch((error) => {
    console.error('Błąd logowania:', error);
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  });

  revalidatePath('/', 'layout');
  redirect('/');
}
