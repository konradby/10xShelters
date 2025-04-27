'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Button,
  Image,
} from '@heroui/react';
import { ODogGender } from '@/types/types';
import Link from 'next/link';
import { useState } from 'react';

interface DogDetailsProps {
  dog: {
    id: string;
    name: string;
    approximate_age: string | null;
    color: string | null;
    description: string | null;
    gender: string;
    mixed_breed: boolean;
    weight: number | null;
    status: string;
    breed: {
      id: string;
      name: string;
      size: string;
      coat_type: string;
      shedding_level: number;
      energy_level?: number;
      sociability?: number;
      trainability?: number;
      description?: string;
    };
    shelter: {
      id: string;
      name: string;
      city: string;
      address: string;
      phone: string;
      email: string;
    } | null;
    primary_image: string;
    images: Array<{
      id: string;
      url: string;
      is_primary: boolean;
    }>;
    tags: Array<{
      id: string;
      name: string;
    }>;
  };
}

export function DogDetails({ dog }: DogDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(dog.primary_image);

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sekcja zdjęć */}
          <div className="w-full md:w-1/2">
            <div className="mb-4">
              <img
                src={selectedImage}
                alt={dog.name}
                className="w-full h-96 object-cover rounded-xl shadow-md"
                onError={(e) => {
                  // @ts-ignore
                  e.target.src = '/images/dog-placeholder.jpg';
                }}
              />
            </div>

            {dog.images.length > 1 && (
              <div className="flex flex-wrap gap-3 justify-center">
                {dog.images.map((image) => (
                  <div
                    key={image.id}
                    className={`w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 ${
                      selectedImage === image.url
                        ? 'border-[#4A6741] shadow-md'
                        : 'border-transparent'
                    }`}
                    onClick={() => handleImageClick(image.url)}
                  >
                    <img
                      src={image.url}
                      alt={dog.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // @ts-ignore
                        e.target.src = '/images/dog-placeholder.jpg';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sekcja informacji */}
          <div className="w-full md:w-1/2">
            <Card className="border border-[#D1DBC8] shadow-md rounded-xl overflow-hidden">
              <CardHeader className="flex flex-col gap-2 bg-[#E8EFDE] p-6">
                <div className="flex justify-between items-center gap-2">
                  <h1 className="text-3xl font-bold text-[#2C4A27]">
                    {dog.name}
                  </h1>
                  <Chip
                    className={`${
                      dog.status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    } rounded-lg`}
                  >
                    {dog.status === 'available' ? 'dostępny' : 'zaadoptowany'}
                  </Chip>
                </div>
                <p className="text-lg text-[#4A6741]">
                  {dog.breed.name} {dog.mixed_breed ? '(mieszaniec)' : ''}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {dog.tags.map((tag) => (
                    <Chip
                      key={tag.id}
                      className="bg-[#D1DBC8] text-[#4A6741] rounded-lg"
                      size="sm"
                    >
                      {tag.name}
                    </Chip>
                  ))}
                </div>
              </CardHeader>

              <CardBody className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 bg-[#F7F9F4] p-4 rounded-xl">
                    {dog.approximate_age && (
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Wiek
                        </p>
                        <p className="text-[#4A6741]">{dog.approximate_age}</p>
                      </div>
                    )}

                    {dog.gender && (
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Płeć
                        </p>
                        <p className="text-[#4A6741]">
                          {dog.gender === ODogGender.MALE ? 'Samiec' : 'Samica'}
                        </p>
                      </div>
                    )}

                    {dog.weight && (
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Waga
                        </p>
                        <p className="text-[#4A6741]">{dog.weight} kg</p>
                      </div>
                    )}

                    {dog.color && (
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Kolor
                        </p>
                        <p className="text-[#4A6741]">{dog.color}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Rozmiar
                      </p>
                      <p className="text-[#4A6741]">
                        {dog.breed.size === 'small'
                          ? 'Mały'
                          : dog.breed.size === 'medium'
                            ? 'Średni'
                            : 'Duży'}
                      </p>
                    </div>
                  </div>

                  {dog.description && (
                    <div className="bg-white p-4 rounded-xl border border-[#D1DBC8]">
                      <h3 className="text-xl font-semibold text-[#2C4A27] mb-2">
                        O {dog.name}
                      </h3>
                      <p className="text-[#4A6741]">{dog.description}</p>
                    </div>
                  )}

                  {dog.breed.description && (
                    <div className="bg-white p-4 rounded-xl border border-[#D1DBC8]">
                      <h3 className="text-xl font-semibold text-[#2C4A27] mb-2">
                        O rasie {dog.breed.name}
                      </h3>
                      <p className="text-[#4A6741]">{dog.breed.description}</p>
                    </div>
                  )}

                  {dog.shelter && (
                    <div className="bg-[#F7F9F4] p-4 rounded-xl">
                      <h3 className="text-xl font-semibold text-[#2C4A27] mb-2">
                        Schronisko
                      </h3>
                      <p className="font-medium text-[#4A6741]">
                        {dog.shelter.name}
                      </p>
                      <p className="text-[#4A6741]">{dog.shelter.address}</p>
                      <p className="text-[#4A6741]">{dog.shelter.city}</p>
                      <div className="mt-3 space-y-1">
                        <p className="text-[#4A6741]">
                          <span className="font-medium">Tel:</span>{' '}
                          {dog.shelter.phone}
                        </p>
                        <p className="text-[#4A6741]">
                          <span className="font-medium">Email:</span>{' '}
                          {dog.shelter.email}
                        </p>
                      </div>
                    </div>
                  )}

                  {dog.status === 'available' && (
                    <div className="pt-4">
                      <Link href={`/adoption-form?dogId=${dog.id}`}>
                        <Button
                          className="w-full bg-[#4A6741] text-white hover:bg-[#2C4A27] shadow-md rounded-xl"
                          size="lg"
                        >
                          Rozpocznij proces adopcji
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-4 mb-6 flex justify-center">
        <Link href="/">
          <Button
            className="bg-white text-[#4A6741] border-[#4A6741] hover:bg-[#E8EFDE] shadow-sm rounded-xl"
            variant="bordered"
          >
            ← Wróć do listy psów
          </Button>
        </Link>
      </div>
    </div>
  );
}
