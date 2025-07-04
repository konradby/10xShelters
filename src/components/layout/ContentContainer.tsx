import { ReactNode } from 'react';

interface ContentContainerProps {
  children: ReactNode;
  className?: string;
}

export const ContentContainer = ({
  children,
  className = '',
}: ContentContainerProps) => {
  return (
    <div className={`container mx-auto px-4 md:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
};
