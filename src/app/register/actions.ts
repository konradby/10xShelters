'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function signup(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  console.log("🚀 ~ signup ~ data:", data)

  if (!data.email || !data.password) {
    redirect('/register?error=Email i hasło są wymagane');
  }

  await supabase.auth
    .signUp({
      ...data,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })
    .catch((error) => {
      console.error('Błąd rejestracji:', error);
      redirect(`/register?error=${encodeURIComponent(error.message)}`);
    });

  revalidatePath('/', 'layout');
  redirect(
    '/register?message=Sprawdź swoją skrzynkę email, aby potwierdzić rejestrację'
  );
}
