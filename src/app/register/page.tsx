'use client';

import { signup } from './actions';
import { Card, CardBody, Button, Input, Form } from '@heroui/react';
import { useSearchParams } from 'next/navigation';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#F5F7F2]">
      <Card className="w-full max-w-md border-none shadow-lg rounded-xl">
        <CardBody className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#2C4A27]">
            Rejestracja
          </h1>

          <Form action={signup} className="space-y-4" validationBehavior="aria">
            <div className="w-full">
              <label htmlFor="email" className="block mb-1 text-[#2C4A27]">
                Email:
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="twoj@email.pl"
                required
                className="rounded-lg text-[#2C4A27]"
              />
            </div>

            <div className="w-full">
              <label htmlFor="password" className="block mb-1 text-[#2C4A27]">
                Hasło:
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
                className="rounded-lg text-[#2C4A27]"
              />
            </div>

            <div className="w-full flex flex-col gap-2 mt-6">
              <Button
                type="submit"
                className="w-full bg-[#2C4A27] text-white hover:bg-[#3C5A37] rounded-lg"
              >
                Zarejestruj się
              </Button>

              <Button
                as="a"
                href="/login"
                className="w-full bg-[#A7C4A0] text-[#2C4A27] hover:bg-[#8BAD84] rounded-lg"
                variant="flat"
              >
                Powrót do logowania
              </Button>
            </div>
          </Form>

          <div className="mt-4 text-center text-sm">
            <MessageDisplay />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function MessageDisplay() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-[#2C4A27]">{message}</p>}
    </>
  );
}
