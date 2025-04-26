import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';

interface GuestMenuItemsProps {
  isMobile?: boolean;
  onMenuClose?: () => void;
}

export const GuestMenuItems = ({
  isMobile = false,
  onMenuClose,
}: GuestMenuItemsProps) => {
  if (isMobile) {
    return (
      <div className="flex flex-col gap-4">
        <Link href="/login" className="w-full" onClick={onMenuClose}>
          <Button
            variant="flat"
            className="w-full bg-white/10 text-white hover:bg-white/20 py-3 backdrop-blur-sm rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-lg font-medium"
            size="lg"
          >
            Zaloguj się
          </Button>
        </Link>
        <Link href="/register" className="w-full" onClick={onMenuClose}>
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
  }

  return (
    <>
      <Link href="/login">
        <Button
          variant="flat"
          className="text-white hover:bg-[#2C4A27]/40 px-6 py-2 backdrop-blur-sm rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Zaloguj się
        </Button>
      </Link>
      <Link href="/register">
        <Button
          variant="solid"
          className="bg-white/80 text-[#2C4A27] hover:bg-white px-6 py-2 backdrop-blur-sm rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Zarejestruj się
        </Button>
      </Link>
    </>
  );
};
