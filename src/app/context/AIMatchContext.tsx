'use client';

import { logError, logInfo } from '@/lib';
import { dogsMatchesMock } from '@/mocks/dogs';
import { AIMatchRequestDTO, AIMatchResponseDTO } from '@/types/types';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AIMatchContextType {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
  results: AIMatchResponseDTO;
  error: string | null;
  searchDogs: (
    searchPrompt: string,
    limit?: number
  ) => Promise<AIMatchResponseDTO>;
}

const AIMatchContext = createContext<AIMatchContextType | null>(null);

export function AIMatchProvider({ children }: { children: ReactNode }) {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<AIMatchResponseDTO>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (dogsMatchesMock.matches && dogsMatchesMock.matches.length > 0) {
      const result: AIMatchResponseDTO = dogsMatchesMock.matches.map(
        (match) => {
          return {
            dog_id: match.dog.id,
            match_percentage: match.match_percentage,
            reasoning: match.reasoning,
            dog_details: {
              id: match.dog.id,
              name: match.dog.name,
              breed: {
                name: match.dog.breed.name || 'Mieszaniec',
                size: match.dog.breed.size,
              },
              primary_image: match.dog.primary_image,
            },
          };
        }
      );
      setResults(result);
    }
  }, []);

  const searchDogs = async (
    searchPrompt: string,
    limit: number = 4
  ): Promise<AIMatchResponseDTO> => {
    if (searchPrompt.length < 10) {
      setError('Opis musi zawierać co najmniej 10 znaków');
      return [];
    }

    if (searchPrompt.length > 1000) {
      setError('Opis nie może przekraczać 1000 znaków');
      return [];
    }

    setIsLoading(true);
    setError(null);
    setResults([]);

    logInfo('Rozpoczynam wyszukiwanie psów z promptem:', { searchPrompt });

    const response = await fetch('/api/public/match-dogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: searchPrompt,
        limit,
      } as AIMatchRequestDTO),
    }).catch((error) => {
      logError('Error searching dogs:', { error });
      setError('Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie później.');
    });

    if (!response) {
      setError('Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie później.');
      setIsLoading(false);
      return [];
    }

    if (response.status === 401) {
      setError('Aby korzystać z wyszukiwania, zaloguj się do systemu');
      setIsLoading(false);
      return [];
    }

    const data: AIMatchResponseDTO = await response.json();
    logInfo('Otrzymane dane z API:', { data });

    if (!data || data.length === 0) {
      setError('Nie znaleziono psów pasujących do Twoich kryteriów');
      return [];
    }

    logInfo('Przetworzone karty psów:', { data });
    setResults(data);
    setIsLoading(false);
    return data;
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

export function useAIMatch(): AIMatchContextType {
  const context = useContext(AIMatchContext);

  if (!context) {
    throw new Error('useAIMatch must be used within an AIMatchProvider');
  }

  return context;
}
