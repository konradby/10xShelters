import { Card, CardBody, CardFooter, Image } from '@heroui/react';
import { DogCardViewModel } from '@/types/viewModels.types';
import Link from 'next/link';
import { memo } from 'react';

interface DogCardProps {
  dog: DogCardViewModel;
}

export const DogCard = memo(({ dog }: DogCardProps) => {
  return (
    <Link href={`/dogs/${dog.id}`}>
      <Card className="w-full h-full hover:scale-105 transition-transform duration-200">
        <CardBody className="p-0">
          <Image
            src={dog.imageUrl}
            alt={dog.name}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        </CardBody>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <h3 className="text-lg font-semibold">{dog.name}</h3>
          <p className="text-sm text-gray-600">
            {dog.breedName} • {dog.size}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary-500 h-2.5 rounded-full"
              style={{ width: `${dog.matchPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Dopasowanie: {dog.matchPercentage}%
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
});

DogCard.displayName = 'DogCard';
