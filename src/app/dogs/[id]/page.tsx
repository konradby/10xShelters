import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import { DogDetails } from './components/DogDetails';
import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import Image from 'next/image';

type Props = {
  params: {
    id: string;
  };
};

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

type ShelterInfo = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
};

async function getDogData(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('dogs')
    .select(
      `
      id,
      name,
      approximate_age,
      color,
      description,
      gender,
      mixed_breed,
      weight,
      status,
      breed:breeds (
        id,
        name,
        size,
        coat_type,
        energy_level,
        shedding_level,
        sociability,
        trainability,
        description
      ),
      shelter:shelters (
        id,
        name,
        city,
        address,
        phone,
        email
      ),
      images:dog_images (
        id,
        image_path,
        is_primary
      ),
      tags:dog_tags (
        tag:tags (
          id,
          name
        )
      )
    `
    )
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  const breedInfo =
    Array.isArray(data.breed) && data.breed.length > 0
      ? data.breed[0]
      : { name: '', size: '' };

  const primaryImage = Array.isArray(data.images)
    ? data.images.find((img: any) => img.is_primary)?.image_path ||
      data.images[0]?.image_path ||
      '/images/dog-placeholder.jpg'
    : '/images/dog-placeholder.jpg';

  const dogTags = Array.isArray(data.tags)
    ? data.tags.map((tagEntry: any) => tagEntry.tag).filter(Boolean)
    : [];

  let shelterInfo = null;
  if (data.shelter) {
    if (Array.isArray(data.shelter) && data.shelter.length > 0) {
      shelterInfo = data.shelter[0] as ShelterInfo;
    } else {
      shelterInfo = data.shelter as unknown as ShelterInfo;
    }
  }

  return {
    id: data.id,
    name: data.name,
    approximate_age: data.approximate_age,
    color: data.color,
    description: data.description,
    gender: data.gender,
    mixed_breed: data.mixed_breed,
    weight: data.weight,
    status: data.status,
    breed: {
      id: 'id' in breedInfo ? breedInfo.id : undefined,
      name: breedInfo.name,
      size: breedInfo.size,
      coat_type: 'coat_type' in breedInfo ? breedInfo.coat_type : undefined,
      energy_level:
        'energy_level' in breedInfo ? breedInfo.energy_level : undefined,
      shedding_level:
        'shedding_level' in breedInfo ? breedInfo.shedding_level : undefined,
      sociability:
        'sociability' in breedInfo ? breedInfo.sociability : undefined,
      trainability:
        'trainability' in breedInfo ? breedInfo.trainability : undefined,
      description:
        'description' in breedInfo ? breedInfo.description : undefined,
    },
    shelter: shelterInfo && {
      id: shelterInfo.id,
      name: shelterInfo.name,
      city: shelterInfo.city,
      address: shelterInfo.address,
      phone: shelterInfo.phone,
      email: shelterInfo.email,
    },
    primary_image: primaryImage,
    images: Array.isArray(data.images)
      ? data.images.map((img: any) => ({
          id: img.id,
          url: img.image_path,
          is_primary: img.is_primary,
        }))
      : [],
    tags: dogTags,
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
      <section className="relative min-h-[50vh] w-full overflow-hidden">
        {/* Zdjęcie w tle */}
        <div className="absolute inset-0 z-0">
          <Image
            src={dogData.primary_image}
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

      <div className="bg-[#F7F9F4] py-12">
        <div className="container mx-auto px-4">
          <DogDetails dog={dogData} />
        </div>
      </div>
    </MainLayout>
  );
}
