'use client';

import { useState } from 'react';
import { DogCardViewModel } from '@/types/viewModels';
import { AIMatchRequestDTO, AIMatchResponseDTO } from '@/types/types';

export const useAIMatch = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<DogCardViewModel[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchDogs = async (searchPrompt: string, limit: number = 12) => {
    if (searchPrompt.length < 10) {
      setError('Opis musi zawierać co najmniej 10 znaków');
      return;
    }

    if (searchPrompt.length > 1000) {
      setError('Opis nie może przekraczać 1000 znaków');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: searchPrompt,
          limit,
        } as AIMatchRequestDTO),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Aby korzystać z wyszukiwania, zaloguj się do systemu');
          setIsLoading(false);
          return;
        }

        throw new Error(`Status ${response.status}`);
      }

      const data: AIMatchResponseDTO = await response.json();

      // Przekształcenie odpowiedzi API na model widoku
      const dogCards: DogCardViewModel[] = data.matches.map((match) => ({
        id: match.dog.id,
        name: match.dog.name,
        breedName: match.dog.breed.name,
        size: match.dog.breed.size,
        imageUrl: match.dog.primary_image,
        matchPercentage: match.match_percentage,
      }));

      setResults(dogCards);
    } catch (e) {
      setError('Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie później.');
      console.error('Error searching dogs:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return { prompt, setPrompt, isLoading, results, error, searchDogs };
};
