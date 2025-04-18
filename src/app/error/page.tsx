'use client';

import { Button } from '@heroui/react';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Wystąpił błąd</h1>
      <p className="mb-6 text-center">
        Nie udało się zweryfikować Twojego konta. Link mógł wygasnąć lub być
        nieprawidłowy.
      </p>
      <Link href="/login">
        <Button color="primary">Wróć do strony logowania</Button>
      </Link>
    </div>
  );
}
