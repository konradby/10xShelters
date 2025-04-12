# API Endpoint Implementation Plan: AI Matching

## 1. Przegląd punktu końcowego

Endpoint `/ai/match` służy do wyszukiwania psów za pomocą sztucznej inteligencji na podstawie opisu preferencji użytkownika. System analizuje prompt użytkownika i zwraca listę psów najlepiej pasujących do podanych kryteriów, wraz z procentowym dopasowaniem.

## 2. Szczegóły żądania

- Metoda HTTP: POST
- Struktura URL: `/api/ai/match`
- Parametry:
  - Wymagane:
    - prompt (string): Opis preferencji użytkownika (min. 10 znaków)
    - limit (number): Maksymalna liczba wyników (1-50)
- Request Body:

```typescript
{
  prompt: string;
  limit: number;
}
```

## 3. Wykorzystywane typy

```typescript
// Request
type AIMatchRequestDTO = {
  prompt: string;
  limit: number;
};

// Response
type AIMatchResponseDTO = {
  matches: Array<{
    dog_id: string;
    match_percentage: number;
    dog: {
      id: string;
      name: string;
      breed: {
        name: string;
        size: string;
      };
      primary_image: string;
    };
  }>;
};
```

## 4. Szczegóły odpowiedzi

- Status 200: Pomyślne wyszukiwanie
- Status 400: Nieprawidłowe dane wejściowe
- Status 401: Brak autoryzacji
- Status 500: Błąd serwera
- Status 503: Serwis AI niedostępny

## 5. Przepływ danych

1. Walidacja żądania i autoryzacja użytkownika
2. Zapisanie wyszukiwania w tabeli `ai_searches`
3. Przetworzenie promptu przez serwis AI
4. Pobranie danych psów z bazy danych
5. Dopasowanie psów do promptu
6. Zapisanie wyników w tabeli `ai_matches`
7. Zwrócenie wyników użytkownikowi

## 6. Względy bezpieczeństwa

- Rate limiting: 10 zapytań na minutę na użytkownika
- Walidacja długości promptu (10-1000 znaków)
- Sanityzacja promptu przed wysłaniem do AI
- Sprawdzenie uprawnień użytkownika
- Logowanie wszystkich zapytań
- Ograniczenie dostępu do endpointu dla zalogowanych użytkowników

## 7. Obsługa błędów

- 400 Bad Request:
  - Nieprawidłowy format promptu
  - Limit poza zakresem
  - Brak wymaganych pól
- 401 Unauthorized:
  - Brak tokenu autoryzacyjnego
  - Nieprawidłowy token
- 500 Internal Server Error:
  - Błąd komunikacji z bazą danych
  - Błąd przetwarzania AI
- 503 Service Unavailable:
  - Serwis AI niedostępny
  - Przekroczony limit zapytań do AI

## 8. Rozważania dotyczące wydajności

- Cache'owanie popularnych zapytań (TTL: 1 godzina)
- Indeksowanie kolumn używanych w zapytaniach
- Asynchroniczne przetwarzanie długich zapytań
- Ograniczenie liczby zwracanych wyników
- Optymalizacja zapytań do bazy danych

## 9. Etapy wdrożenia

1. Utworzenie serwisu AI (`src/lib/ai-service.ts`)

   - Implementacja komunikacji z OpenRouter.ai
   - Obsługa błędów i retry mechanizmu
   - Cache'owanie odpowiedzi

2. Implementacja endpointu (`src/app/api/ai/match/route.ts`)

   - Walidacja żądania
   - Obsługa autoryzacji
   - Integracja z serwisem AI
   - Formatowanie odpowiedzi

3. Implementacja logiki dopasowania

   - Analiza promptu
   - Pobieranie danych psów
   - Algorytm dopasowania
   - Obliczanie procentu dopasowania

4. Implementacja logowania

   - Zapis wyszukiwań
   - Zapis wyników
   - Obsługa błędów

5. Testy

   - Testy jednostkowe serwisu AI
   - Testy endpointu
   - Testy wydajnościowe
   - Testy bezpieczeństwa

6. Dokumentacja

   - Dokumentacja API
   - Przykłady użycia
   - Obsługa błędów
   - Ograniczenia i limity

7. Monitoring
   - Metryki wydajności
   - Logi błędów
   - Statystyki użycia
   - Alerty o błędach
