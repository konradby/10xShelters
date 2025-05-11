import { AiMatchDogDetails } from '@/types';
import { Card, CardBody, CardFooter } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useState } from 'react';

interface DogCardProps {
  match: AiMatchDogDetails;
}

export const DogCard = memo(({ match }: DogCardProps) => {
  const defaultImage = '/images/dog-placeholder.jpg';
  const [imgSrc, setImgSrc] = useState(
    !!match.dog_details.primary_image
      ? match.dog_details.primary_image
      : defaultImage
  );

  return (
    <Link href={`/dogs/${match.dog_id}`}>
      <Card className="w-full h-full hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg border border-[#D1DBC8] rounded-xl overflow-hidden">
        <CardBody className="p-0">
          <div className="relative w-full h-52">
            <Image
              src={imgSrc}
              alt={match.dog_details.name}
              fill
              className="object-cover"
              onError={() => {
                console.log(
                  `Błąd ładowania obrazu dla ${match.dog_details.name}, używanie placeholdera`
                );
                setImgSrc(defaultImage);
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>
        </CardBody>
        <CardFooter className="flex flex-col items-start gap-3 p-5 bg-white">
          <h3 className="text-xl font-semibold text-[#2C4A27]">
            {match.dog_details.name}
          </h3>
          <p className="text-lg text-[#4A6741] font-medium">
            Dopasowanie: {match.match_percentage}%
          </p>

          <p className="text-sm text-[#4A6741]">
            {match.dog_details.breed.name} • {match.dog_details.breed.size}
          </p>
          <div className="w-full bg-[#E8EFDE] rounded-full h-3">
            <div
              className="bg-[#4A6741] h-3 rounded-full"
              style={{ width: `${match.match_percentage}%` }}
              role="progressbar"
              aria-valuenow={match.match_percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>


          <p className="text-xs text-[#4A6741] font-thin">{match.reasoning}</p>
        </CardFooter>
      </Card>
    </Link>
  );
});

DogCard.displayName = 'DogCard';
