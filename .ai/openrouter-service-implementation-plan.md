# Plan implementacji usługi OpenRouter

## 1. Opis usługi

Usługa OpenRouter jest odpowiedzialna za komunikację z API OpenRouter.ai, umożliwiając dostęp do szerokiej gamy modeli LLM (OpenAI, Anthropic, Google i inne). Główne cele usługi to:

- Zarządzanie komunikacją z API OpenRouter
- Konfiguracja i wybór odpowiednich modeli
- Formatowanie zapytań i przetwarzanie odpowiedzi
- Kontrola kosztów i zarządzanie limitami
- Obsługa błędów i zapewnienie niezawodności

## 2. Opis konstruktora

```typescript
class OpenRouterService {
  constructor(options: {
    apiKey: string;
    defaultModel?: string;
    defaultParams?: ModelParams;
    costLimit?: number;
    baseUrl?: string;
  }) {
    // Inicjalizacja usługi z podanymi opcjami
    // Walidacja wymaganych parametrów
    // Konfiguracja domyślnych ustawień
  }

  // ... metody publiczne i prywatne
}
```

Parametry konstruktora:

- `apiKey` (wymagany): Klucz API do OpenRouter.ai
- `defaultModel` (opcjonalny): Domyślny model do użycia (np. 'openai/gpt-4')
- `defaultParams` (opcjonalny): Domyślne parametry dla modeli
- `costLimit` (opcjonalny): Miesięczny limit kosztów
- `baseUrl` (opcjonalny): Alternatywny URL bazowy API

## 3. Publiczne metody i pola

### 3.1. Metoda `chat`

```typescript
async chat(options: {
  messages: Message[];
  model?: string;
  params?: ModelParams;
  responseFormat?: ResponseFormat;
}): Promise<ChatResponse> {
  // Sprawdzenie limitu kosztów
  // Formatowanie zapytania
  // Wywołanie API
  // Przetwarzanie odpowiedzi
  // Obsługa błędów
}
```

Parametry:

- `messages`: Tablica wiadomości w formacie OpenAI (role + content)
- `model`: Model do użycia (nadpisuje domyślny)
- `params`: Parametry modelu (nadpisują domyślne)
- `responseFormat`: Format odpowiedzi (np. schemat JSON)

### 3.2. Metoda `getAvailableModels`

```typescript
async getAvailableModels(): Promise<Model[]> {
  // Pobranie listy dostępnych modeli z API
  // Obsługa błędów
}
```

### 3.3. Metoda `createSystemMessage`

```typescript
createSystemMessage(content: string): Message {
  return { role: 'system', content };
}
```

### 3.4. Metoda `createUserMessage`

```typescript
createUserMessage(content: string): Message {
  return { role: 'user', content };
}
```

### 3.5. Metoda `createJsonSchema`

```typescript
createJsonSchema(schema: object, schemaName: string, strict: boolean = true): ResponseFormat {
  return {
    type: 'json_schema',
    json_schema: {
      name: schemaName,
      strict: strict,
      schema: schema
    }
  };
}
```

### 3.6. Pole `usage`

```typescript
get usage(): {
  currentMonthCost: number;
  remainingBudget: number;
} {
  // Zwraca aktualne zużycie i pozostały budżet
}
```

## 4. Prywatne metody i pola

### 4.1. Metoda `_makeApiRequest`

```typescript
private async _makeApiRequest(
  endpoint: string,
  method: 'GET' | 'POST',
  data?: any
): Promise<any> {
  // Konfiguracja zapytania HTTP
  // Dodanie nagłówków autoryzacji
  // Obsługa błędów i ponownych prób
}
```

### 4.2. Metoda `_validateMessages`

```typescript
private _validateMessages(messages: Message[]): boolean {
  // Sprawdzenie poprawności formatu wiadomości
  // Walidacja wymaganych pól
}
```

### 4.3. Metoda `_formatParams`

```typescript
private _formatParams(params: ModelParams): object {
  // Przekształcenie parametrów do formatu API
  // Filtrowanie niedozwolonych parametrów
}
```

### 4.4. Metoda `_checkCostLimit`

```typescript
private _checkCostLimit(): boolean {
  // Sprawdzenie czy limit kosztów nie został przekroczony
}
```

### 4.5. Metoda `_updateUsage`

```typescript
private _updateUsage(cost: number): void {
  // Aktualizacja informacji o zużyciu
}
```

### 4.6. Metoda `_handleError`

```typescript
private _handleError(error: any): never {
  // Przetwarzanie i tłumaczenie błędów API
  // Generowanie czytelnych komunikatów w języku polskim
}
```

## 5. Obsługa błędów

Usługa implementuje kompleksową obsługę błędów dla następujących scenariuszy:

1. **Błędy autoryzacji**

   - Nieprawidłowy klucz API
   - Wygaśnięcie klucza API

2. **Błędy limitów**

   - Przekroczenie limitów kosztów
   - Przekroczenie limitów użycia

3. **Błędy sieci**

   - Problemy z połączeniem
   - Przekroczenie czasu odpowiedzi

4. **Błędy modelu**

   - Niedostępność wybranego modelu
   - Przeciążenie modelu

5. **Błędy formatowania**

   - Nieprawidłowy format zapytania
   - Nieprawidłowe parametry modelu

6. **Błędy odpowiedzi**

   - Odpowiedź niezgodna ze schematem
   - Niepełna odpowiedź

7. **Błędy związane z treścią**
   - Treść zabroniona lub niezgodna z polityką
   - Treść przekraczająca limity tokenów

Każdy z tych błędów będzie miał dedykowaną klasę błędu z czytelnym komunikatem w języku polskim, opisem problemu i sugerowanym rozwiązaniem.

## 6. Kwestie bezpieczeństwa

1. **Zarządzanie kluczem API**

   - Przechowywanie klucza jako zmiennej środowiskowej
   - Brak zapisywania klucza w kodzie lub repozytoriach
   - Możliwość rotacji kluczy

2. **Kontrola kosztów**

   - Monitorowanie zużycia i kosztów
   - Ustawianie limitów miesięcznych
   - Alertowanie o zbliżaniu się do limitu

3. **Ochrona danych**

   - Filtrowanie wrażliwych danych przed wysłaniem do API
   - Przestrzeganie RODO w zakresie danych osobowych
   - Minimalizacja danych przesyłanych do modeli

4. **Walidacja wejścia i wyjścia**
   - Sprawdzanie poprawności danych wejściowych
   - Walidacja odpowiedzi przed przetworzeniem
   - Ochrona przed wstrzykiwaniem złośliwego kodu

## 7. Plan wdrożenia krok po kroku

### Krok 1: Konfiguracja środowiska

1. Zarejestruj konto w OpenRouter.ai i uzyskaj klucz API
2. Dodaj klucz API do zmiennych środowiskowych projektu:
   ```bash
   # .env.local
   OPENROUTER_API_KEY=your_api_key_here
   OPENROUTER_COST_LIMIT=50 # limit miesięczny w USD
   ```
3. Zainstaluj wymagane zależności:
   ```bash
   yarn add axios zod
   ```

### Krok 2: Implementacja podstawowej struktury serwisu

Utwórz plik `src/lib/services/openrouter.ts`:

```typescript
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { z } from 'zod';

// Typy danych
export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type ModelParams = {
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  // inne parametry...
};

export type ResponseFormat = {
  type: 'json_schema';
  json_schema: {
    name: string;
    strict: boolean;
    schema: object;
  };
};

export type ChatResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: Message;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

// Klasa serwisu
export class OpenRouterService {
  private apiKey: string;
  private client: AxiosInstance;
  private defaultModel: string;
  private defaultParams: ModelParams;
  private costLimit: number;
  private currentUsage: number;

  constructor(options: {
    apiKey: string;
    defaultModel?: string;
    defaultParams?: ModelParams;
    costLimit?: number;
    baseUrl?: string;
  }) {
    // Implementacja konstruktora
  }

  // Implementacja metod publicznych i prywatnych
}
```

### Krok 3: Implementacja głównej metody chat

```typescript
async chat(options: {
  messages: Message[];
  model?: string;
  params?: ModelParams;
  responseFormat?: ResponseFormat;
}): Promise<ChatResponse> {
  const { messages, model, params, responseFormat } = options;

  // Walidacja wejścia
  if (!this._validateMessages(messages)) {
    throw new Error('Nieprawidłowy format wiadomości');
  }

  // Sprawdzenie limitu kosztów
  if (!this._checkCostLimit()) {
    throw new Error('Przekroczono miesięczny limit kosztów');
  }

  // Przygotowanie zapytania
  const requestData = {
    messages,
    model: model || this.defaultModel,
    response_format: responseFormat,
    ...this._formatParams({...this.defaultParams, ...params})
  };

  try {
    const response = await this._makeApiRequest('/chat/completions', 'POST', requestData);

    // Aktualizacja użycia
    if (response.usage) {
      this._updateUsage(this._calculateCost(response.usage, requestData.model));
    }

    return response;
  } catch (error) {
    return this._handleError(error);
  }
}
```

### Krok 4: Implementacja formatów odpowiedzi

```typescript
// Przykładowy schemat odpowiedzi dla dopasowania psów
const dogMatchSchema = {
  type: 'object',
  properties: {
    rekomendowane_psy: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          imie: { type: 'string' },
          rasa: { type: 'string' },
          wiek: { type: 'number' },
          zgodnosc: {
            type: 'string',
            enum: ['niska', 'średnia', 'wysoka', 'bardzo wysoka'],
          },
          uzasadnienie: { type: 'string' },
        },
        required: ['imie', 'rasa', 'zgodnosc'],
      },
    },
    kryteria_dopasowania: {
      type: 'object',
      properties: {
        styl_zycia: { type: 'string' },
        doswiadczenie: { type: 'string' },
        preferencje: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  required: ['rekomendowane_psy'],
};

// Użycie schematu
const responseFormat = openRouterService.createJsonSchema(
  dogMatchSchema,
  'dopasowanie_psow',
  true
);
```

### Krok 5: Integracja z Next.js App Router

Utwórz endpoint API w `src/app/api/ai/chat/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { OpenRouterService } from '@/lib/services/openrouter';

export async function POST(request: NextRequest) {
  try {
    const { messages, model, params, responseFormat } = await request.json();

    const openRouterService = new OpenRouterService({
      apiKey: process.env.OPENROUTER_API_KEY!,
      defaultModel: 'openai/gpt-4',
      costLimit: Number(process.env.OPENROUTER_COST_LIMIT || 50),
    });

    const response = await openRouterService.chat({
      messages,
      model,
      params,
      responseFormat,
    });

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Wystąpił błąd podczas komunikacji z API' },
      { status: error.status || 500 }
    );
  }
}
```

### Krok 6: Dodanie obsługi błędów

```typescript
class OpenRouterError extends Error {
  public status: number;
  public code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = 'OpenRouterError';
  }
}

private _handleError(error: any): never {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 401:
        throw new OpenRouterError(
          'Nieprawidłowy klucz API. Sprawdź swoje dane uwierzytelniające.',
          401,
          'invalid_api_key'
        );
      case 429:
        throw new OpenRouterError(
          'Przekroczono limit zapytań. Spróbuj ponownie później.',
          429,
          'rate_limit_exceeded'
        );
      case 400:
        throw new OpenRouterError(
          `Błąd zapytania: ${data.error?.message || 'Nieprawidłowe dane wejściowe'}`,
          400,
          'invalid_request'
        );
      case 404:
        throw new OpenRouterError(
          'Wybrany model jest niedostępny. Wybierz inny model.',
          404,
          'model_not_found'
        );
      case 500:
        throw new OpenRouterError(
          'Błąd serwera OpenRouter. Spróbuj ponownie później.',
          500,
          'server_error'
        );
      default:
        throw new OpenRouterError(
          `Nieznany błąd: ${data.error?.message || 'Coś poszło nie tak'}`,
          status,
          'unknown_error'
        );
    }
  } else if (error.request) {
    throw new OpenRouterError(
      'Problem z połączeniem. Sprawdź swoje połączenie internetowe.',
      0,
      'network_error'
    );
  } else {
    throw new OpenRouterError(
      `Błąd konfiguracji: ${error.message}`,
      0,
      'configuration_error'
    );
  }
}
```

### Krok 7: Implementacja prostego hooka React

Utwórz plik `src/hooks/useChatAI.ts`:

```typescript
import { useState } from 'react';
import { Message, ResponseFormat } from '@/lib/services/openrouter';

export const useChatAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chat = async (options: {
    messages: Message[];
    model?: string;
    responseFormat?: ResponseFormat;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Wystąpił błąd podczas komunikacji z API'
        );
      }

      return await response.json();
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chat,
    isLoading,
    error,
  };
};
```

### Krok 8: Przykład użycia w komponencie

```tsx
// src/components/DogMatchingChat.tsx
import { useState } from 'react';
import { useChatAI } from '@/hooks/useChatAI';
import { createJsonSchema } from '@/lib/services/openrouter';

const dogMatchSchema = {
  type: 'object',
  properties: {
    rekomendowane_psy: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          imie: { type: 'string' },
          rasa: { type: 'string' },
          zgodnosc: { type: 'string' },
        },
        required: ['imie', 'rasa', 'zgodnosc'],
      },
    },
  },
  required: ['rekomendowane_psy'],
};

export function DogMatchingChat() {
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const { chat, isLoading, error } = useChatAI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await chat({
      messages: [
        {
          role: 'system',
          content:
            'Jesteś ekspertem w dopasowywaniu psów dla potencjalnych właścicieli. Twoja odpowiedź musi zawierać zestaw rekomendowanych psów na podstawie opisu użytkownika.',
        },
        {
          role: 'user',
          content: userInput,
        },
      ],
      responseFormat: createJsonSchema(
        dogMatchSchema,
        'dopasowanie_psow',
        true
      ),
    });

    if (response) {
      setResult(response.choices[0].message.content);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Opisz swój styl życia, doświadczenie z psami i preferencje..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Szukam dopasowania...' : 'Znajdź pasujące psy'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="results">
          <h2>Rekomendowane psy:</h2>
          <ul>
            {result.rekomendowane_psy.map((dog: any, index: number) => (
              <li key={index}>
                <strong>{dog.imie}</strong> ({dog.rasa}) - Zgodność:{' '}
                {dog.zgodnosc}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

### Krok 9: Testowanie i monitorowanie

1. Dodaj testy jednostkowe dla serwisu OpenRouter
2. Zaimplementuj logowanie kosztów i użycia do celów monitorowania
3. Dodaj mechanizm alertowania przy zbliżaniu się do limitów kosztów
4. Regularnie sprawdzaj dostępność nowych modeli i ich możliwości

### Krok 10: Optymalizacja i skalowanie

1. Zaimplementuj pamięć podręczną dla często używanych zapytań
2. Dodaj kolejkowanie zapytań w przypadku wysokiego obciążenia
3. Monitoruj wydajność różnych modeli i automatycznie wybieraj najlepsze dla poszczególnych zadań
4. Regularnie analizuj koszty i optymalizuj wykorzystanie API
