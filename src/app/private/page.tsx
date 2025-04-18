import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Card, CardBody } from '@heroui/react';

export default async function PrivatePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-lg mx-auto">
        <CardBody>
          <h1 className="text-2xl font-bold mb-4">Strona prywatna</h1>
          <p className="mb-2">Witaj {data.user.email}</p>
          <p>Ta strona jest dostępna tylko dla zalogowanych użytkowników.</p>
        </CardBody>
      </Card>
    </div>
  );
}
