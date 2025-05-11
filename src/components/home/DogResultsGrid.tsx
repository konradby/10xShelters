'use client';

import { useAIMatch } from '@/app/context/AIMatchContext';
import { DogCard } from '@/components/shared/DogCard';

export const DogResultsGrid = () => {
  const { results, isLoading, error } = useAIMatch();

  console.log(results);

  return (
    <>
      {isLoading ? (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-[#2C4A27]">
              Wyszukiwanie psów...
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-[#E8EFDE] rounded-xl animate-pulse border border-[#D1DBC8]"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </section>
      ) : results.length ? (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-[#2C4A27]">
                Znalezione psy ({results.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((match) => (
                <DogCard key={match.dog_id} match={match} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-12 bg-primary-50 rounded-xl shadow-sm border border-primary-200">
              <p className="text-[#4A6741]">
                Nie znaleziono psów pasujących do Twoich kryteriów. Spróbuj
                zmienić opis.
              </p>
            </div>
          </div>
        </section>
      )}

      {error && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <p className="text-red-500">{error}</p>
          </div>
        </section>
      )}
    </>
  );
};
