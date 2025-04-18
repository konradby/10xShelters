'use client';

import { DogCard } from '@/components/shared/DogCard';
import { useAIMatch } from '@/app/context/AIMatchContext';
import { Select, SelectItem } from '@heroui/react';
import { useState, useEffect } from 'react';

export const DogResultsGrid = () => {
  const { results, isLoading, error } = useAIMatch();
  const [sortOrder, setSortOrder] = useState('match-desc');

  // Inicjalizujemy sortedResults bezpośrednio z results i sortOrder,
  // zamiast używać pustej tablicy (co powoduje różnicę między serwerem a klientem)
  const getSortedResults = () => {
    if (!results || results.length === 0) return [];

    return [...results].sort((a, b) => {
      if (sortOrder === 'match-desc') {
        return b.matchPercentage - a.matchPercentage;
      } else if (sortOrder === 'match-asc') {
        return a.matchPercentage - b.matchPercentage;
      }
      return 0;
    });
  };

  const [sortedResults, setSortedResults] = useState(getSortedResults());

  // Aktualizuj posortowane wyniki, gdy zmienią się oryginalne wyniki lub sortowanie
  useEffect(() => {
    setSortedResults(getSortedResults());
  }, [results, sortOrder]);

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  // Brak wyników i nie trwa ładowanie - nie pokazujemy nic
  if (!isLoading && (!results || results.length === 0) && !error) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-[#2C4A27]">
            Wyszukiwanie psów...
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-[#E8EFDE] rounded-lg animate-pulse border border-[#D1DBC8]"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12 bg-primary-50 rounded-lg shadow-sm border border-primary-200">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-primary-600 hover:text-primary-800 hover:underline"
            >
              Spróbuj ponownie
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (results.length === 0) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12 bg-primary-50 rounded-lg shadow-sm border border-primary-200">
            <p className="text-[#4A6741]">
              Nie znaleziono psów pasujących do Twoich kryteriów. Spróbuj
              zmienić opis.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#2C4A27]">
            Znalezione psy ({sortedResults.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedResults.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>
      </div>
    </section>
  );
};
