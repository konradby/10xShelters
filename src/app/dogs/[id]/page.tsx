import { MainLayout } from '@/components/layout/MainLayout';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { DogDetailsDTO } from '@/types';
import { logError } from '@/lib';
import { DogDetails } from './components/DogDetails';

type Props = {
  params: {
    id: string;
  };
};

async function getDogData(id: string): Promise<DogDetailsDTO | null> {
  const response = await fetch(`/api/public/dogs/${id}`).catch((error) => {
    logError('Error fetching dog details:', { error });
  });

  if (!response) {
    return null;
  }

  const data = await response.json();

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getDogData(params.id);

  if (!data) {
    return {
      title: 'Nie znaleziono psa | 10xShelter',
    };
  }

  return {
    title: `${data.name} | 10xShelter`,
    description:
      data.description ||
      `Poznaj ${data.name} - psa ze schroniska ${data.shelter?.name}`,
  };
}

export default async function DogPage({ params }: Props) {
  const dogData = await getDogData(params.id);

  if (!dogData) {
    notFound();
  }

  return (
    <MainLayout>
      {/* Hero Section z informacjami o psie */}
      <section className="relative min-h-[50vh] w-full overflow-hidden rounded-b-xl">
        {/* Zdjęcie w tle */}
        <div className="absolute inset-0 z-0">
          <Image
            src={dogData.images[0].image_path}
            alt={`Zdjęcie psa ${dogData.name}`}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Nakładka gradientowa */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2C4A27]/70 via-[#2C4A27]/40 to-[#A7C4A0]/60" />
        </div>

        {/* Zawartość */}
        <div className="relative z-10 h-full flex items-center justify-center pt-32 pb-20">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              {dogData.name}
            </h1>
            <h2 className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">
              {dogData.breed.name} {dogData.mixed_breed ? '(mieszaniec)' : ''}
            </h2>
          </div>
        </div>
      </section>

      <div className="bg-[#F7F9F4] py-12 rounded-t-xl">
        <div className="container mx-auto px-4">
          <DogDetails dog={dogData} />
        </div>
      </div>
    </MainLayout>
  );
}
