'use client';

import { AIMatchRequestDTO, AIMatchResponseDTO } from '@/types/types';
import { DogCardViewModel } from '@/types/viewModels.types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definiowanie typów dla kontekstu
interface AIMatchContextType {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
  results: DogCardViewModel[];
  error: string | null;
  searchDogs: (searchPrompt: string, limit?: number) => Promise<void>;
}

// Utworzenie kontekstu
const AIMatchContext = createContext<AIMatchContextType | null>(null);

// Provider komponent
export function AIMatchProvider({ children }: { children: ReactNode }) {
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
    setResults([]);

    try {
      console.log('Rozpoczynam wyszukiwanie psów z promptem:', searchPrompt);
      const response = await fetch('/api/public/match-dogs', {
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
      console.log('Otrzymane dane z API:', data);

      if (!data.matches || data.matches.length === 0) {
        setError('Nie znaleziono psów pasujących do Twoich kryteriów');
        return;
      }

      // Przekształcenie odpowiedzi API na model widoku
      const dogCards: DogCardViewModel[] = data.matches.map((match) => ({
        id: match.dog.id,
        name: match.dog.name,
        breedName: match.dog.breed.name,
        size: match.dog.breed.size,
        imageUrl: match.dog.primary_image,
        matchPercentage: match.match_percentage,
      }));

      console.log('Przetworzone karty psów:', dogCards);
      setResults(dogCards);
    } catch (e) {
      setError('Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie później.');
      console.error('Error searching dogs:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = {
    prompt,
    setPrompt,
    isLoading,
    results,
    error,
    searchDogs,
  };

  return (
    <AIMatchContext.Provider value={contextValue}>
      {children}
    </AIMatchContext.Provider>
  );
}

// Hook do używania kontekstu
export function useAIMatch(): AIMatchContextType {
  const context = useContext(AIMatchContext);

  if (!context) {
    throw new Error('useAIMatch must be used within an AIMatchProvider');
  }

  return context;
}
