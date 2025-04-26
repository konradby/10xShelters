import React from 'react';
import { CloseIcon } from './icons';
import { UserMenuItems } from './UserMenuItems';
import { GuestMenuItems } from './GuestMenuItems';
import { AppUser } from './types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  user: AppUser | null;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  isLoggedIn,
  user,
}: MobileMenuProps) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Mobile Menu Content */}
      <div
        className={`fixed inset-0 bg-[#2C4A27]/50 backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="absolute top-5 right-4">
          <button
            onClick={onClose}
            className="flex items-center justify-center w-12 h-12 text-white hover:bg-white/10 active:bg-white/20 rounded-xl transition-colors"
            aria-label="Zamknij menu"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="h-full w-full flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            {isLoggedIn ? (
              <UserMenuItems user={user} isMobile />
            ) : (
              <GuestMenuItems isMobile onMenuClose={onClose} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
