import { login, signup } from './actions';
import { Card, CardBody, Button, Input } from '@heroui/react';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardBody className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Logowanie</h1>

          <form className="space-y-4">
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="twoj@email.pl"
                required
              />
            </div>

            <div>
              <Input
                id="password"
                name="password"
                type="password"
                label="Hasło"
                placeholder="********"
                required
              />
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <Button formAction={login} color="primary" className="w-full">
                Zaloguj się
              </Button>

              <Button
                formAction={signup}
                color="secondary"
                variant="flat"
                className="w-full"
              >
                Zarejestruj się
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            <MessageDisplay />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function MessageDisplay() {
  'use client';
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
    </>
  );
}
