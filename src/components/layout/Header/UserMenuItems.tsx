import { createClient } from '@/utils/supabase/client';
import { Avatar, Button } from '@heroui/react';
import { AppUser } from './types';

interface UserMenuItemsProps {
  user: AppUser | null;
  isMobile?: boolean;
}

export const UserMenuItems = ({
  user,
  isMobile = false,
}: UserMenuItemsProps) => {
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (isMobile) {
    return (
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
          onPress={handleLogout}
        >
          Wyloguj
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <Avatar
          name={user?.email?.charAt(0).toUpperCase()}
          className="bg-[#2C4A27]/80 text-white h-10 w-10 rounded-2xl"
        />
        <span className="text-white font-semibold drop-shadow-md">
          {user?.email}
        </span>
      </div>
      <Button
        variant="flat"
        color="danger"
        className="text-white hover:bg-[#2C4A27]/40 px-6 py-2 backdrop-blur-sm rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        onPress={handleLogout}
      >
        Wyloguj
      </Button>
    </div>
  );
};
