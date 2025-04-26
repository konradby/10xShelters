'use client';

import { Button, Card, CardBody } from '@heroui/react';
import { useSearchParams } from 'next/navigation';

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#F5F7F2]">
      <Card className="w-full max-w-md border-none shadow-lg rounded-xl">
        <CardBody className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#2C4A27]">
            {searchParams.get('error')
              ? 'Błąd weryfikacji'
              : 'Weryfikacja zakończona'}
          </h1>

          {searchParams.get('error') ? (
            <>
              <p className="text-red-500 mb-4 text-center">
                {searchParams.get('error_description')}
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  as="a"
                  href="/login"
                  className="w-full rounded-lg bg-[#2C4A27] text-white hover:bg-[#3C5A37]"
                >
                  Wróć do logowania
                </Button>
                <Button
                  as="a"
                  href="/"
                  className="w-full rounded-lg bg-[#A7C4A0] text-[#2C4A27] hover:bg-[#8BAD84]"
                  variant="flat"
                >
                  Przejdź do strony głównej
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-[#2C4A27] mb-4 text-center">
                Twoje konto zostało pomyślnie zweryfikowane! Możesz teraz
                zalogować się do systemu.
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  as="a"
                  href="/login"
                  className="w-full rounded-lg bg-[#2C4A27] text-white hover:bg-[#3C5A37]"
                >
                  Zaloguj się
                </Button>
                <Button
                  as="a"
                  href="/"
                  className="w-full rounded-lg bg-[#A7C4A0] text-[#2C4A27] hover:bg-[#8BAD84]"
                  variant="flat"
                >
                  Przejdź do strony głównej
                </Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
