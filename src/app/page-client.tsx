'use client';

import { useAuth } from '@/hooks/useAuth';
import { DogResultsGrid } from '@/components/home/DogResultsGrid';
import { LoginPrompt } from '@/components/home/LoginPrompt';

export function HomePageClient() {
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />;
  }

  return isLoggedIn ? <DogResultsGrid /> : <LoginPrompt />;
}
