'use client';

import { Select, SelectItem } from '@heroui/react';
import { DogCard } from '@/components/shared/DogCard';
import { DogCardViewModel } from '@/types/viewModels';
import { useAIMatch } from '@/hooks/useAIMatch';

export const DogResultsGrid = () => {
  const { results, isLoading, error } = useAIMatch();

  const handleSortChange = (value: string) => {
    const sortedResults = [...results].sort((a, b) => {
      if (value === 'match-desc') {
        return b.matchPercentage - a.matchPercentage;
      } else if (value === 'match-asc') {
        return a.matchPercentage - b.matchPercentage;
      }
      return 0;
    });
    // TODO: Implement sorting in useAIMatch hook
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-primary-600 hover:underline"
        >
          Spróbuj ponownie
        </button>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          Nie znaleziono psów pasujących do Twoich kryteriów. Spróbuj zmienić
          opis.
        </p>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            Znalezione psy ({results.length})
          </h2>
          <Select
            label="Sortuj według"
            defaultSelectedKeys={['match-desc']}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-48"
          >
            <SelectItem key="match-desc" value="match-desc">
              Najlepsze dopasowanie
            </SelectItem>
            <SelectItem key="match-asc" value="match-asc">
              Najgorsze dopasowanie
            </SelectItem>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>
      </div>
    </section>
  );
};
