import { NavbarContent, NavbarItem } from '@heroui/react';
import { GuestMenuItems } from './GuestMenuItems';
import { AppUser } from './types';
import { UserMenuItems } from './UserMenuItems';

interface DesktopMenuProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: AppUser | null;
}

export const DesktopMenu = ({
  isLoggedIn,
  isLoading,
  user,
}: DesktopMenuProps) => {
  return (
    <NavbarContent className="hidden md:flex" justify="end">
      {isLoading ? (
        <div className="animate-pulse h-10 w-24 bg-[#4A6741]/50 rounded-2xl" />
      ) : isLoggedIn ? (
        <NavbarItem>
          <UserMenuItems user={user} />
        </NavbarItem>
      ) : (
        <>
          <NavbarItem className="mr-2">
            <GuestMenuItems />
          </NavbarItem>
        </>
      )}
    </NavbarContent>
  );
};
