'use client';

import { useState, useEffect } from 'react';
import { StatsViewModel } from '@/types/viewModels.types';

export const useStats = () => {
  const [stats, setStats] = useState<StatsViewModel>({
    sheltersCount: 0,
    dogsCount: 0,
    adoptionsCount: 0,
    availableDogsCount: 0,
    adoptedDogsCount: 0,
    sheltersByCity: {},
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || 'Nie udało się pobrać statystyk');
          return;
        }

        const data = await response.json();

        if (data.error) {
          setError(data.error);
          return;
        }

        setStats({
          sheltersCount: data.sheltersCount,
          dogsCount: data.dogsCount,
          adoptionsCount: data.adoptedDogsCount,
          availableDogsCount: data.availableDogsCount,
          adoptedDogsCount: data.adoptedDogsCount,
          sheltersByCity: data.sheltersByCity,
        });
      } catch (e) {
        console.error('Error fetching stats:', e);
        setError('Wystąpił błąd podczas pobierania statystyk');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
};
