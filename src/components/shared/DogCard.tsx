import { DogCardViewModel } from '@/types/viewModels.types';
import { Card, CardBody, CardFooter } from '@heroui/react';
import Link from 'next/link';
import Image from 'next/image';
import { memo, useState } from 'react';

interface DogCardProps {
  dog: DogCardViewModel;
}

export const DogCard = memo(({ dog }: DogCardProps) => {
  const defaultImage = '/images/dog-placeholder.jpg';
  const [imgSrc, setImgSrc] = useState(
    dog.imageUrl && dog.imageUrl.trim() !== '' ? dog.imageUrl : defaultImage
  );

  return (
    <Link href={`/dogs/${dog.id}`}>
      <Card className="w-full h-full hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg border border-[#D1DBC8] rounded-xl overflow-hidden">
        <CardBody className="p-0">
          <div className="relative w-full h-52">
            <Image
              src={imgSrc}
              alt={dog.name}
              fill
              className="object-cover"
              onError={() => {
                console.log(
                  `Błąd ładowania obrazu dla ${dog.name}, używanie placeholdera`
                );
                setImgSrc(defaultImage);
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>
        </CardBody>
        <CardFooter className="flex flex-col items-start gap-3 p-5 bg-white">
          <h3 className="text-xl font-semibold text-[#2C4A27]">{dog.name}</h3>
          <p className="text-sm text-[#4A6741]">
            {dog.breedName} • {dog.size}
          </p>
          <div className="w-full bg-[#E8EFDE] rounded-full h-3">
            <div
              className="bg-[#4A6741] h-3 rounded-full"
              style={{ width: `${dog.matchPercentage}%` }}
              role="progressbar"
              aria-valuenow={dog.matchPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <p className="text-sm text-[#4A6741] font-medium">
            Dopasowanie: {dog.matchPercentage}%
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
});

DogCard.displayName = 'DogCard';
