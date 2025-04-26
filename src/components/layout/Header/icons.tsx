import React from 'react';

export const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
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

export const CloseIcon = () => (
  <div className="relative w-6 h-6 flex items-center justify-center">
    <span className="absolute w-6 h-[2px] bg-white transform -rotate-45" />
    <span className="absolute w-6 h-[2px] bg-white transform rotate-45" />
  </div>
);
