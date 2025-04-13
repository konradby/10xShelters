import { Button } from '@heroui/react';
import Link from 'next/link';

export const LoginPrompt = () => {
  return (
    <div className="text-center py-12 bg-primary-50 rounded-xl shadow-lg border border-primary-200">
      <h2 className="text-2xl font-bold text-primary-800 mb-4">
        Zaloguj się, aby zobaczyć wyniki wyszukiwania
      </h2>
      <p className="text-gray-700 mb-8 max-w-md mx-auto">
        Aby korzystać z wyszukiwania psów za pomocą sztucznej inteligencji,
        musisz być zalogowanym użytkownikiem. Zaloguj się lub zarejestruj, aby
        zobaczyć dopasowane psy.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/login">
          <Button
            variant="bordered"
            color="primary"
            className="text-lg font-medium py-3 px-6 border-2 border-primary-600 text-primary-700 hover:bg-primary-100"
            size="lg"
          >
            Zaloguj się
          </Button>
        </Link>
        <Link href="/register">
          <Button
            color="primary"
            className="text-lg font-bold py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white shadow-md"
            size="lg"
          >
            Zarejestruj się
          </Button>
        </Link>
      </div>
    </div>
  );
};
