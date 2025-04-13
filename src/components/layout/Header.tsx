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
      className="absolute top-0 left-0 right-0 z-50 bg-transparent text-white px-6 md:px-12 h-20"
      isBlurred={false}
    >
      <div className="container mx-auto flex w-full items-center justify-between">
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white hover:text-[#E8EFE1] transition-colors drop-shadow-md">
              10xShelter
            </span>
          </Link>
        </NavbarBrand>

        <NavbarContent justify="end" className="flex-none">
          {isLoading ? (
            <div className="animate-pulse h-10 w-24 bg-[#4A6741]/50 rounded" />
          ) : isLoggedIn ? (
            <div className="flex items-center gap-4">
              <NavbarItem>
                <div className="flex items-center gap-3">
                  <Avatar
                    name={user?.email?.charAt(0).toUpperCase()}
                    className="bg-[#2C4A27]/80 text-white h-10 w-10"
                  />
                  <span className="text-white font-semibold hidden md:block drop-shadow-md">
                    {user?.email}
                  </span>
                </div>
              </NavbarItem>
              <NavbarItem>
                <Button
                  variant="flat"
                  color="danger"
                  className="text-white hover:bg-[#2C4A27]/40 px-6 py-2 backdrop-blur-sm"
                >
                  Wyloguj
                </Button>
              </NavbarItem>
            </div>
          ) : (
            <>
              <NavbarItem className="mr-2">
                <Link href="/login">
                  <Button
                    variant="flat"
                    className="text-white hover:bg-[#2C4A27]/40 px-6 py-2 backdrop-blur-sm"
                  >
                    Zaloguj się
                  </Button>
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/register">
                  <Button
                    variant="solid"
                    className="bg-white/80 text-[#2C4A27] hover:bg-white px-6 py-2 backdrop-blur-sm"
                  >
                    Zarejestruj się
                  </Button>
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </div>
    </Navbar>
  );
};
