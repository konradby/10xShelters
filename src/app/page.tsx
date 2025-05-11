import { AIMatchProvider } from '@/app/context/AIMatchContext';
import { AIPromptInput } from '@/components/home/AIPromptInput';
import { DogResultsGrid } from '@/components/home/DogResultsGrid';
import { HeroSection } from '@/components/home/HeroSection';
import { StatisticsSection } from '@/components/home/StatisticsSection';
import { ContentContainer } from '@/components/layout/ContentContainer';
import { MainLayout } from '@/components/layout/MainLayout';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

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
