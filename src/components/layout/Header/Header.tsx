'use client';

import { useAuth } from '@/hooks/useAuth';
import { Navbar, NavbarBrand } from '@heroui/react';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import { DesktopMenu } from './DesktopMenu';
import { MenuIcon } from './icons';
import { MobileMenu } from './MobileMenu';

export const Header = memo(() => {
  const { isLoggedIn, user, isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Navbar
      maxWidth="full"
      data-e2e-id="header"
      className="absolute top-0 left-0 right-0 z-50 bg-transparent text-white px-4 md:px-12 h-20"
      isBlurred={false}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className="container mx-auto flex w-full items-center justify-between">
        <NavbarBrand data-e2e-id="header-logo">
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
          <DesktopMenu
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            user={user}
          />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden items-center justify-center w-10 h-10 text-white hover:bg-white/10 active:bg-white/20 rounded-lg transition-colors"
            aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          isLoggedIn={isLoggedIn}
          user={user}
        />
      </div>
    </Navbar>
  );
});

Header.displayName = 'Header';
