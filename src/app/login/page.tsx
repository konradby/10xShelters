'use client';

import { login, LoginState } from './actions';
import { Card, CardBody, Button, Input, Form } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';

const initialState: LoginState = {};

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useFormState(login, initialState);

  if (state.success) {
    router.push('/');
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#F5F7F2]">
      <Card className="w-full max-w-md border-none shadow-lg rounded-xl">
        <CardBody className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#2C4A27]">
            Logowanie
          </h1>

          <Form
            action={formAction}
            className="space-y-4 w-full"
            validationBehavior="aria"
          >
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
                data-e2e-id="login-email"
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
                data-e2e-id="login-password"
              />
            </div>

            <div className="w-full flex flex-col gap-2 mt-6">
              <Button
                type="submit"
                className="w-full bg-[#2C4A27] text-white hover:bg-[#3C5A37] rounded-lg"
                data-e2e-id="login-submit"
              >
                Zaloguj się
              </Button>

              <Button
                as="a"
                href="/register"
                className="w-full bg-[#A7C4A0] text-[#2C4A27] hover:bg-[#8BAD84] rounded-lg"
                variant="flat"
              >
                Zarejestruj się
              </Button>
            </div>
          </Form>

          {state.error && (
            <div className="mt-4 text-center text-sm">
              <p className="text-red-500" data-e2e-id="login-error">
                {state.error}
              </p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
