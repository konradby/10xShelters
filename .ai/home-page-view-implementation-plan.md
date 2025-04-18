# Plan implementacji widoku Strona Główna

## 1. Przegląd

Strona główna 10xShelter to centralne miejsce aplikacji, które wprowadza użytkownika do platformy, prezentuje misję projektu i umożliwia korzystanie z funkcji wyszukiwania psów za pomocą AI. Widok ten jest dostosowany zarówno dla zalogowanych, jak i niezalogowanych użytkowników, z różnicą w dostępie do wyników wyszukiwania.

## 2. Routing widoku

- **Ścieżka**: `/`
- **Dostępność**: Publiczna (dostępna zarówno dla zalogowanych, jak i niezalogowanych użytkowników)
- **Framework**: Next.js App Router

## 3. Struktura komponentów

```
MainLayout
├── Header
│   ├── Logo
│   └── AuthButtons
├── HeroSection
├── AIPromptInput
├── StatisticsSection
├── DogResultsGrid / LoginPrompt (warunkowy)
│   └── DogCard (wiele instancji)
└── Footer
```

## 4. Szczegóły komponentów

### MainLayout

- **Opis komponentu**: Główny układ strony zawierający wszystkie sekcje i komponenty.
- **Główne elementy**: Container (div) z odpowiednimi klasami Tailwind dla responsywności, z zagnieżdżonymi komponentami Header, HeroSection, AIPromptInput, StatisticsSection, DogResultsGrid/LoginPrompt i Footer.
- **Obsługiwane interakcje**: Brak bezpośrednich interakcji.
- **Obsługiwana walidacja**: Brak.
- **Typy**: React.ReactNode dla children.
- **Propsy**: children: React.ReactNode

### Header

- **Opis komponentu**: Nagłówek strony zawierający logo aplikacji i przyciski logowania/rejestracji.
- **Główne elementy**: Container z logo (Link z Image) i przyciskami logowania/rejestracji (Button z HeroUI) lub menu użytkownika dla zalogowanych.
- **Obsługiwane interakcje**: Kliknięcie logo (przekierowanie na stronę główną), kliknięcie przycisków logowania/rejestracji, interakcje z menu użytkownika.
- **Obsługiwana walidacja**: Sprawdzanie statusu logowania użytkownika.
- **Typy**: AuthStatusViewModel
- **Propsy**: Brak (komponent pobiera dane o statusie logowania z hooka useAuth)

### HeroSection

- **Opis komponentu**: Sekcja wprowadzająca z opisem misji projektu 10xShelter.
- **Główne elementy**: Container z nagłówkiem (h1), podtytułem (h2) i opisem misji (p).
- **Obsługiwane interakcje**: Brak bezpośrednich interakcji.
- **Obsługiwana walidacja**: Brak.
- **Typy**: Brak specyficznych.
- **Propsy**: Brak.

### AIPromptInput

- **Opis komponentu**: Duże, centralne pole wprowadzania tekstu dla zapytania AI.
- **Główne elementy**: Formularz z polem tekstowym (Textarea z HeroUI), przyciskiem wyszukiwania (Button z HeroUI) i ewentualnie przykładami zapytań.
- **Obsługiwane interakcje**: Wprowadzanie tekstu, wysłanie formularza (przyciskiem lub Enter).
- **Obsługiwana walidacja**:
  - Sprawdzanie minimalnej i maksymalnej długości tekstu (10-1000 znaków)
  - Sprawdzanie statusu logowania użytkownika przed wysłaniem zapytania
- **Typy**: AIMatchRequestDTO
- **Propsy**:
  - onSearch: (prompt: string) => void
  - isLoading: boolean
  - error: string | null

### StatisticsSection

- **Opis komponentu**: Sekcja prezentująca statystyki projektu.
- **Główne elementy**: Container z trzema blokami statystyk (liczba schronisk, psów, adopcji).
- **Obsługiwane interakcje**: Brak bezpośrednich interakcji.
- **Obsługiwana walidacja**: Brak.
- **Typy**: StatsViewModel
- **Propsy**:
  - stats: StatsViewModel
  - isLoading: boolean

### DogResultsGrid

- **Opis komponentu**: Siatka wyników wyszukiwania prezentująca dopasowane psy.
- **Główne elementy**: Grid (div z klasami Tailwind) zawierający karty psów (DogCard).
- **Obsługiwane interakcje**: Sortowanie wyników (dropdown z opcjami sortowania).
- **Obsługiwana walidacja**: Brak.
- **Typy**: DogCardViewModel[]
- **Propsy**:
  - dogs: DogCardViewModel[]
  - isLoading: boolean
  - error: string | null

### LoginPrompt

- **Opis komponentu**: Komunikat zachęcający do zalogowania się (wyświetlany zamiast wyników dla niezalogowanych).
- **Główne elementy**: Container z komunikatem i przyciskiem logowania (Button z HeroUI).
- **Obsługiwane interakcje**: Kliknięcie przycisku logowania.
- **Obsługiwana walidacja**: Brak.
- **Typy**: Brak specyficznych.
- **Propsy**: Brak.

### DogCard

- **Opis komponentu**: Karta prezentująca podstawowe informacje o psie.
- **Główne elementy**: Card z HeroUI zawierający zdjęcie psa (Image), imię, rasę i procent dopasowania.
- **Obsługiwane interakcje**: Kliknięcie karty (przekierowanie do szczegółów psa).
- **Obsługiwana walidacja**: Brak.
- **Typy**: DogCardViewModel
- **Propsy**:
  - dog: DogCardViewModel

### Footer

- **Opis komponentu**: Stopka strony z informacjami o projekcie.
- **Główne elementy**: Container z informacjami o projekcie, linkami i copyrightem.
- **Obsługiwane interakcje**: Kliknięcie linków.
- **Obsługiwana walidacja**: Brak.
- **Typy**: Brak specyficznych.
- **Propsy**: Brak.

## 5. Typy

### Istniejące typy z definicji typów projektu

```typescript
// Z modułu src/types/types.ts
type UUID = string;
type DogSize = 'small' | 'medium' | 'large';
type UserRole = 'employee' | 'user';

// DTOs dla API
type AIMatchRequestDTO = {
  prompt: string;
  limit: number;
};

type AIMatchResponseDTO = {
  matches: Array<{
    dog_id: UUID;
    match_percentage: number;
    dog: {
      id: UUID;
      name: string;
      breed: {
        name: string;
        size: DogSize;
      };
      primary_image: string;
    };
  }>;
};
```

### Nowe typy specyficzne dla widoku

```typescript
// src/types/viewModels.ts

// Model dla karty psa w wynikach wyszukiwania
export type DogCardViewModel = {
  id: UUID;
  name: string;
  breedName: string;
  size: DogSize;
  imageUrl: string;
  matchPercentage: number;
};

// Model dla sekcji statystyk
export type StatsViewModel = {
  sheltersCount: number;
  dogsCount: number;
  adoptionsCount: number;
};

// Model statusu uwierzytelniania
export type AuthStatusViewModel = {
  isLoggedIn: boolean;
  user: {
    id: UUID;
    email: string;
    role: UserRole;
  } | null;
};
```

## 6. Zarządzanie stanem

### Hook useAIMatch

```typescript
// src/hooks/useAIMatch.ts
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
        body: JSON.stringify({ prompt: searchPrompt, limit }),
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
```

### Hook useStats

```typescript
// src/hooks/useStats.ts
import { useState, useEffect } from 'react';
import { StatsViewModel } from '@/types/viewModels';

export const useStats = () => {
  const [stats, setStats] = useState<StatsViewModel>({
    sheltersCount: 0,
    dogsCount: 0,
    adoptionsCount: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/public/stats');

        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }

        const data = await response.json();
        setStats({
          sheltersCount: data.sheltersCount,
          dogsCount: data.dogsCount,
          adoptionsCount: data.adoptionsCount,
        });
      } catch (e) {
        setError('Nie udało się pobrać statystyk');
        console.error('Error fetching stats:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
};
```

### Hook useAuth

```typescript
// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthStatusViewModel } from '@/types/viewModels';

export const useAuth = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatusViewModel>({
    isLoggedIn: false,
    user: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (session) {
          setAuthStatus({
            isLoggedIn: true,
            user: {
              id: session.user.id,
              email: session.user.email || '',
              role:
                (session.user.user_metadata.role as 'user' | 'employee') ||
                'user',
            },
          });
        }
      } catch (e) {
        console.error('Error checking auth status:', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setAuthStatus({
          isLoggedIn: !!session,
          user: session
            ? {
                id: session.user.id,
                email: session.user.email || '',
                role:
                  (session.user.user_metadata.role as 'user' | 'employee') ||
                  'user',
              }
            : null,
        });
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return { ...authStatus, isLoading };
};
```

## 7. Integracja API

### Endpoint dopasowania AI

- **Metoda**: POST
- **Ścieżka**: `/api/ai/match`
- **Request Body**:
  ```typescript
  {
    prompt: string; // Opis poszukiwanego psa (10-1000 znaków)
    limit: number; // Limit wyników (1-50, domyślnie 12)
  }
  ```
- **Response Body (200)**:
  ```typescript
  {
    matches: [
      {
        dog_id: UUID,
        match_percentage: number,
        dog: {
          id: UUID,
          name: string,
          breed: {
            name: string,
            size: DogSize,
          },
          primary_image: string,
        },
      },
    ];
  }
  ```
- **Statusy błędów**:
  - 400: Nieprawidłowe dane wejściowe
  - 401: Brak autoryzacji
  - 500: Błąd serwera
  - 503: Serwis AI niedostępny

## 8. Interakcje użytkownika

### Wprowadzanie zapytania do AI

1. Użytkownik wprowadza tekst w pole prompta
2. Walidacja długości tekstu (10-1000 znaków)
3. Po kliknięciu przycisku "Wyszukaj" lub naciśnięciu Enter:
   - Jeśli użytkownik jest zalogowany:
     - Wysłanie zapytania do API
     - Wyświetlenie stanu ładowania
     - Po otrzymaniu odpowiedzi, wyświetlenie wyników lub błędu
   - Jeśli użytkownik nie jest zalogowany:
     - Wyświetlenie komunikatu o konieczności zalogowania

### Interakcja z wynikami wyszukiwania

1. Użytkownik może sortować wyniki według procentu dopasowania
2. Kliknięcie karty psa przekierowuje do strony szczegółów tego psa (/dogs/{id})

### Nawigacja i logowanie

1. Kliknięcie logo przekierowuje na stronę główną
2. Kliknięcie przycisku "Zaloguj się" przekierowuje do strony logowania (/login)
3. Kliknięcie przycisku "Zarejestruj się" przekierowuje do strony rejestracji (/register)
4. Dla zalogowanych użytkowników dostępne jest menu z opcjami użytkownika

## 9. Warunki i walidacja

### Walidacja długości prompta

- **Warunek**: Długość prompta musi być między 10 a 1000 znaków
- **Komponent**: AIPromptInput
- **Stan interfejsu**: Wyświetlenie komunikatu błędu, dezaktywacja przycisku wyszukiwania

### Walidacja statusu logowania

- **Warunek**: Tylko zalogowani użytkownicy mogą otrzymać wyniki wyszukiwania
- **Komponent**: AIPromptInput, DogResultsGrid/LoginPrompt
- **Stan interfejsu**: Wyświetlenie LoginPrompt zamiast wyników dla niezalogowanych

### Walidacja limitu wyników

- **Warunek**: Limit wyników musi być między 1 a 50
- **Rozwiązanie**: Ustawienie stałej wartości (12) na poziomie frontendu

## 10. Obsługa błędów

### Błędy walidacji danych wejściowych

- **Przyczyna**: Zbyt krótki lub zbyt długi prompt
- **Obsługa**: Wyświetlenie komunikatu o błędzie pod polem wprowadzania

### Błędy autoryzacji

- **Przyczyna**: Brak zalogowanego użytkownika
- **Obsługa**: Wyświetlenie LoginPrompt zamiast wyników wyszukiwania

### Błędy komunikacji z API

- **Przyczyna**: Problemy z serwerem, usługą AI lub siecią
- **Obsługa**: Wyświetlenie komunikatu o błędzie nad sekcją wyników, z opcją ponowienia próby

### Brak wyników wyszukiwania

- **Przyczyna**: Brak psów pasujących do kryteriów
- **Obsługa**: Wyświetlenie przyjaznego komunikatu "Nie znaleziono psów pasujących do Twoich kryteriów. Spróbuj zmienić opis."

## 11. Kroki implementacji

1. **Utworzenie plików typów**

   - Zdefiniowanie nowych typów ViewModels w `src/types/viewModels.ts`

2. **Utworzenie hooków**

   - Implementacja `useAIMatch` w `src/hooks/useAIMatch.ts`
   - Implementacja `useStats` w `src/hooks/useStats.ts`
   - Implementacja `useAuth` w `src/hooks/useAuth.ts`

3. **Implementacja komponentów**

   - Utworzenie struktury katalogów dla komponentów:
     - `src/components/layout` - MainLayout, Header, Footer
     - `src/components/home` - HeroSection, AIPromptInput, StatisticsSection, DogResultsGrid, LoginPrompt
     - `src/components/shared` - DogCard (komponent współdzielony)
   - Implementacja komponentów w kolejności od najmniejszych do największych

4. **Integracja z Next.js App Router**

   - Utworzenie pliku strony głównej `src/app/page.tsx` jako Server Component
   - Utworzenie klienta `src/app/page-client.tsx` jako Client Component
   - Zapewnienie hydratacji danych między serwerem a klientem

5. **Testowanie**

   - Testy jednostkowe dla hooków
   - Testy komponentów przy użyciu Vitest
   - Testy e2e przy użyciu Playwright

6. **Walidacja i obsługa błędów**

   - Implementacja walidacji danych wejściowych
   - Implementacja obsługi błędów komunikacji z API
   - Testowanie różnych scenariuszy błędów

7. **Optymalizacja**
   - Optymalizacja wydajności renderowania
   - Optymalizacja ładowania obrazów
   - Memoizacja komponentów gdzie to potrzebne
