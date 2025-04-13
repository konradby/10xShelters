'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { useAuth } from '@/hooks/useAuth';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
} from '@heroui/react';

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-6 h-5 flex flex-col justify-between">
    <span
      className={`absolute w-6 h-[2px] bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'top-2 -rotate-45' : 'top-0'}`}
    />
    <span
      className={`absolute w-6 h-[2px] bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'top-2'}`}
    />
    <span
      className={`absolute w-6 h-[2px] bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'top-2 rotate-45' : 'top-4'}`}
    />
  </div>
);

const CloseIcon = () => (
  <div className="relative w-6 h-6 flex items-center justify-center">
    <span className="absolute w-6 h-[2px] bg-white transform -rotate-45" />
    <span className="absolute w-6 h-[2px] bg-white transform rotate-45" />
  </div>
);

export const Header = () => {
  const { isLoggedIn, user, isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = isLoggedIn ? (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
        <Avatar
          name={user?.email?.charAt(0).toUpperCase()}
          className="bg-white/90 text-[#2C4A27] h-16 w-16 rounded-2xl text-xl"
        />
        <span className="text-white font-semibold text-center break-all drop-shadow-sm">
          {user?.email}
        </span>
      </div>
      <Button
        variant="flat"
        color="danger"
        className="w-full text-white bg-white/10 hover:bg-white/20 py-3 backdrop-blur-sm rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-lg font-medium"
        size="lg"
      >
        Wyloguj
      </Button>
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      <Link
        href="/login"
        className="w-full"
        onClick={() => setIsMenuOpen(false)}
      >
        <Button
          variant="flat"
          className="w-full bg-white/10 text-white hover:bg-white/20 py-3 backdrop-blur-sm rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-lg font-medium"
          size="lg"
        >
          Zaloguj się
        </Button>
      </Link>
      <Link
        href="/register"
        className="w-full"
        onClick={() => setIsMenuOpen(false)}
      >
        <Button
          variant="solid"
          className="w-full bg-white/90 text-[#2C4A27] hover:bg-white py-3 backdrop-blur-sm rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-lg font-medium"
          size="lg"
        >
          Zarejestruj się
        </Button>
      </Link>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return (
    <Navbar
      maxWidth="full"
      className="absolute top-0 left-0 right-0 z-50 bg-transparent text-white px-4 md:px-12 h-20"
      isBlurred={false}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className="container mx-auto flex w-full items-center justify-between">
        <NavbarBrand>
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-xl md:text-2xl font-bold text-white hover:text-[#E8EFE1] transition-colors drop-shadow-md">
              10xShelter
            </span>
          </Link>
        </NavbarBrand>

        <div className="flex items-center">
          {/* Desktop Menu */}
          <NavbarContent className="hidden md:flex" justify="end">
            {isLoading ? (
              <div className="animate-pulse h-10 w-24 bg-[#4A6741]/50 rounded-2xl" />
            ) : isLoggedIn ? (
              <div className="flex items-center gap-4">
                <NavbarItem>
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={user?.email?.charAt(0).toUpperCase()}
                      className="bg-[#2C4A27]/80 text-white h-10 w-10 rounded-2xl"
                    />
                    <span className="text-white font-semibold drop-shadow-md">
                      {user?.email}
                    </span>
                  </div>
                </NavbarItem>
                <NavbarItem>
                  <Button
                    variant="flat"
                    color="danger"
                    className="text-white hover:bg-[#2C4A27]/40 px-6 py-2 backdrop-blur-sm rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
                      className="text-white hover:bg-[#2C4A27]/40 px-6 py-2 backdrop-blur-sm rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Zaloguj się
                    </Button>
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link href="/register">
                    <Button
                      variant="solid"
                      className="bg-white/80 text-[#2C4A27] hover:bg-white px-6 py-2 backdrop-blur-sm rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Zarejestruj się
                    </Button>
                  </Link>
                </NavbarItem>
              </>
            )}
          </NavbarContent>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden items-center justify-center w-10 h-10 text-white hover:bg-white/10 active:bg-white/20 rounded-lg transition-colors"
            aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-[#2C4A27]/50 backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="absolute top-5 right-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center w-12 h-12 text-white hover:bg-white/10 active:bg-white/20 rounded-xl transition-colors"
              aria-label="Zamknij menu"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="h-full w-full flex items-center justify-center px-6">
            <div className="w-full max-w-md">{menuItems}</div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};
