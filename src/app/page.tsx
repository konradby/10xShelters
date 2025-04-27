import { MainLayout } from '@/components/layout/MainLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { AIPromptInput } from '@/components/home/AIPromptInput';
import { StatisticsSection } from '@/components/home/StatisticsSection';
import { ContentContainer } from '@/components/layout/ContentContainer';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { AIMatchProvider } from '@/app/context/AIMatchContext';
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
        <div className="bg-[#F5F7F2] py-12 md:py-16">
          <ContentContainer>
            <AIMatchProvider>
              <div className="space-y-12 md:space-y-16">
                <AIPromptInput />
                <DogResultsGrid />
                <StatisticsSection />
              </div>
            </AIMatchProvider>
          </ContentContainer>
        </div>
      </ErrorBoundary>
    </MainLayout>
  );
}
