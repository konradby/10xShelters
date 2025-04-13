import { Button } from '@heroui/react';
import Link from 'next/link';

export const LoginPrompt = () => {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        Zaloguj się, aby zobaczyć wyniki wyszukiwania
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Aby korzystać z wyszukiwania psów za pomocą sztucznej inteligencji,
        musisz być zalogowanym użytkownikiem. Zaloguj się lub zarejestruj, aby
        zobaczyć dopasowane psy.
      </p>
      <div className="flex justify-center gap-4">
        <Button as={Link} href="/login" variant="bordered" color="primary">
          Zaloguj się
        </Button>
        <Button as={Link} href="/register" color="primary">
          Zarejestruj się
        </Button>
      </div>
    </div>
  );
};
