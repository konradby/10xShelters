'use client';

import Link from 'next/link';
import { Button } from '@heroui/button';
import { useAuth } from '@/hooks/useAuth';

export const Header = () => {
  const { isLoggedIn, user, isLoading } = useAuth();

  return (
    <header className="bg-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-white hover:text-primary-100 transition-colors">
            10xShelter
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          {isLoading ? (
            <div className="animate-pulse h-10 w-24 bg-primary-600 rounded" />
          ) : isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-white font-semibold bg-primary-800 px-3 py-1 rounded-md">
                {user?.email}
              </span>
              <Button
                variant="bordered"
                className="border-white text-white hover:bg-primary-600 font-medium"
              >
                Wyloguj
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="bordered"
                  className="border-white text-white hover:bg-primary-600 font-medium"
                >
                  Zaloguj się
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  color="primary"
                  className="bg-white text-primary-800 hover:bg-primary-100 font-bold py-2 px-4 shadow-md"
                >
                  Zarejestruj się
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
