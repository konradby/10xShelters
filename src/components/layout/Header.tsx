'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';
import { useAuth } from '@/hooks/useAuth';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
} from '@heroui/react';

export const Header = () => {
  const { isLoggedIn, user, isLoading } = useAuth();

  return (
    <Navbar
      maxWidth="full"
      className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg"
      isBlurred={false}
    >
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white hover:text-primary-100 transition-colors">
            10xShelter
          </span>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        {isLoading ? (
          <div className="animate-pulse h-10 w-24 bg-primary-500 rounded" />
        ) : isLoggedIn ? (
          <div className="flex items-center gap-4">
            <NavbarItem>
              <div className="flex items-center gap-2">
                <Avatar
                  name={user?.email?.charAt(0).toUpperCase()}
                  className="bg-primary-500 text-white"
                />
                <span className="text-white font-semibold hidden md:block">
                  {user?.email}
                </span>
              </div>
            </NavbarItem>
            <NavbarItem>
              <Button variant="flat" color="danger" className="text-white">
                Wyloguj
              </Button>
            </NavbarItem>
          </div>
        ) : (
          <>
            <NavbarItem>
              <Link href="/login">
                <Button
                  variant="flat"
                  className="text-white hover:bg-primary-500"
                >
                  Zaloguj się
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register">
                <Button
                  color="primary"
                  variant="solid"
                  className="bg-white text-primary-800 hover:bg-primary-100"
                >
                  Zarejestruj się
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};
