import { MainLayout } from '@/components/layout/MainLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { AIPromptInput } from '@/components/home/AIPromptInput';
import { StatisticsSection } from '@/components/home/StatisticsSection';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import dynamic from 'next/dynamic';

const DogResultsGrid = dynamic(
  () =>
    import('@/components/home/DogResultsGrid').then(
      (mod) => mod.DogResultsGrid
    ),
  {
    loading: () => (
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
    ),
  }
);

const LoginPrompt = dynamic(
  () => import('@/components/home/LoginPrompt').then((mod) => mod.LoginPrompt),
  {
    loading: () => (
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
    ),
  }
);

export default function HomePage() {
  return (
    <MainLayout>
      <ErrorBoundary>
        <HeroSection />
        <AIPromptInput />
        <DogResultsGrid />
        <StatisticsSection />
      </ErrorBoundary>
    </MainLayout>
  );
}
