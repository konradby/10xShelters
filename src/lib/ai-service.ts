import {
  AIMatchResponse,
  CachedData,
  DogForAI,
  OpenRouterResponse,
} from '@/types';
import { AIMatchRequestDTO } from '../types/types';

export class AIService {
  private readonly API_URL = 'https://openrouter.ai/api/v1/chat/completions';
  private cache = new Map<string, CachedData>();
  private readonly CACHE_TTL = 3600000;
  private readonly MODEL = 'openai/o3-mini';

  constructor() {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not set');
    }
  }

  async matchDogs(
    request: AIMatchRequestDTO,
    availableDogs: DogForAI[]
  ): Promise<AIMatchResponse> {
    const cacheKey = this.generateCacheKey(request);
    const cachedResult = this.getFromCache(cacheKey);

    if (cachedResult) return cachedResult;

    if (!availableDogs || availableDogs.length === 0) {
      throw new Error('Brak dostępnych psów do dopasowania');
    }

    try {
      return await this.callAIModel(request, availableDogs);
    } catch (error) {
      console.error('Error in AI service, using fallback:', error);
      return this.generateFallbackMatches(availableDogs);
    }
  }

  private async callAIModel(
    request: AIMatchRequestDTO,
    dogsData: DogForAI[]
  ): Promise<AIMatchResponse> {
    console.log(`🚀 ~ callAIModel ~ using model: ${this.MODEL}`);

    const dogDetailsForAI = dogsData.map((dog) => {
      const breedInfo =
        Array.isArray(dog.breed) && dog.breed.length > 0
          ? dog.breed[0]
          : { name: '', size: '' };

      const tags = Array.isArray(dog.tags)
        ? dog.tags.map((tagEntry) => tagEntry.tag?.name).filter(Boolean)
        : [];

      return {
        id: dog.id,
        name: dog.name,
        breed: breedInfo.name,
        size: breedInfo.size,
        approximate_age: dog.approximate_age,
        gender: dog.gender,
        color: dog.color,
        weight: dog.weight,
        energy_level: breedInfo.energy_level,
        sociability: breedInfo.sociability,
        trainability: breedInfo.trainability,
        tags,
        description: dog.description,
      };
    });

    // Ogranicz liczbę psów wysyłanych do API - maksymalnie 5
    const limitedDogs = dogDetailsForAI.slice(0, 5);
    console.log(
      'Dane psów wysyłane do AI:',
      JSON.stringify(limitedDogs).slice(0, 200) + '...'
    );

    try {
      const systemPrompt = `Jesteś ekspertem w dopasowywaniu psów do preferencji użytkowników. Analizujesz opis preferencji i listę dostępnych psów, a następnie zwracasz listę psów najlepiej pasujących do kryteriów. WAŻNE: Twoja odpowiedź MUSI zawierać WYŁĄCZNIE obiekt JSON zgodny z tym schematem: { "matches": [ { "dog_id": "id_psa", "match_percentage": liczba_od_0_do_100, "reasoning": "krótkie_uzasadnienie" } ] }. Nie dodawaj żadnego tekstu przed lub po obiekcie JSON. Ograniczaj długość uzasadnienia do maksymalnie 100 znaków.`;

      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://10xshelter.pl',
          'X-Title': '10xShelter',
        },
        body: JSON.stringify({
          model: this.MODEL,
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: `Preferencje użytkownika: ${request.prompt}\n\nDostępne psy: ${JSON.stringify(limitedDogs)}`,
            },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.5,
          max_tokens: 2500,
        }),
      });

      if (!response.ok) {
        const errorText = await response
          .text()
          .catch(() => 'Nie udało się pobrać treści błędu');
        console.error(
          `Błąd API: ${response.status} - ${response.statusText}`,
          errorText
        );
        throw new Error(
          `AI service returned ${response.status}: ${response.statusText}`
        );
      }

      const data = (await response.json()) as OpenRouterResponse;
      console.log(
        'Odpowiedź z AI:',
        JSON.stringify(data).slice(0, 200) + '...'
      );

      if (!data.choices?.[0]?.message?.content) {
        console.error('Brak treści w odpowiedzi API:', data);
        throw new Error('Empty AI response');
      }

      const result = await this.processAIResponse(data);
      this.setCache(this.generateCacheKey(request), result);
      return result;
    } catch (error) {
      console.error(
        'Błąd podczas komunikacji z OpenRouter API:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      throw error;
    }
  }

  private generateCacheKey(request: AIMatchRequestDTO): string {
    return `${request.prompt}-${request.limit}`;
  }

  private getFromCache(key: string): AIMatchResponse | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const { timestamp, data } = cached;
    if (Date.now() - timestamp > this.CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }

    return data;
  }

  private setCache(key: string, data: AIMatchResponse): void {
    this.cache.set(key, {
      timestamp: Date.now(),
      data,
    });
  }

  private async processAIResponse(
    response: OpenRouterResponse
  ): Promise<AIMatchResponse> {
    try {
      const content = response.choices[0].message.content;

      if (!content || typeof content !== 'string') {
        console.error('Nieprawidłowy format odpowiedzi AI:', content);
        throw new Error('Invalid AI response format');
      }

      console.log(
        'Otrzymana treść z AI:',
        content.slice(0, 200) + (content.length > 200 ? '...' : '')
      );

      return await this.extractAndParseJson(content);
    } catch (error) {
      console.error('Błąd podczas przetwarzania odpowiedzi AI:', error);
      throw new Error('Failed to process AI response');
    }
  }

  private async extractAndParseJson(content: string): Promise<AIMatchResponse> {
    try {
      // Najpierw spróbuj sparsować całą treść jako JSON
      try {
        const parsedContent = JSON.parse(content) as AIMatchResponse;
        if (parsedContent.matches && Array.isArray(parsedContent.matches)) {
          console.log('Parsowanie całej treści jako JSON powiodło się');
          return this.validateAndFormatMatches(parsedContent.matches);
        }
      } catch (e) {
        console.log(
          'Całość treści nie jest poprawnym JSON, próbuję wyodrębnić JSON...'
        );
      }

      // Jeśli powyższe nie zadziałało, próbuj znaleźć JSON w tekście
      const jsonStartIndex = content.indexOf('{');
      const jsonEndIndex = content.lastIndexOf('}');

      if (
        jsonStartIndex === -1 ||
        jsonEndIndex === -1 ||
        jsonEndIndex <= jsonStartIndex
      ) {
        throw new Error('Nie znaleziono poprawnego JSON w odpowiedzi');
      }

      const jsonContent = content.substring(jsonStartIndex, jsonEndIndex + 1);

      // Próba naprawy potencjalnie obciętego JSON
      try {
        const parsedContent = JSON.parse(jsonContent) as AIMatchResponse;
        if (parsedContent.matches && Array.isArray(parsedContent.matches)) {
          return this.validateAndFormatMatches(parsedContent.matches);
        }
      } catch (parseError) {
        console.log(
          'Wyodrębniony JSON jest niepoprawny, próbuję naprawić obcięty JSON...'
        );

        // Szukamy dosłownie struktury JSON "matches"
        const matchesStartIndex = content.indexOf('"matches"');
        const bracketOpenIndex = content.indexOf('[', matchesStartIndex);

        if (matchesStartIndex !== -1 && bracketOpenIndex !== -1) {
          // Próba wyodrębnienia poszczególnych obiektów dopasowań
          const matchesContent = content.substring(bracketOpenIndex);
          const extractedMatches = this.extractPartialMatches(matchesContent);

          if (extractedMatches.length > 0) {
            console.log(
              `Udało się wyodrębnić ${extractedMatches.length} częściowych dopasowań`
            );
            return Promise.resolve({ matches: extractedMatches });
          }
        }
      }

      // Jeśli doszliśmy tutaj, JSON jest uszkodzony i nie da się go naprawić
      console.error('Nie udało się naprawić JSON. Zawartość:', jsonContent);
      throw new Error('Nie udało się sparsować odpowiedzi AI jako JSON');
    } catch (error) {
      console.error('Błąd podczas parsowania JSON z odpowiedzi AI:', error);
      throw error;
    }
  }

  private extractPartialMatches(content: string): Array<{
    dog_id: string;
    match_percentage: number;
    reasoning: string;
  }> {
    const matches: Array<{
      dog_id: string;
      match_percentage: number;
      reasoning: string;
    }> = [];
    const regex =
      /"dog_id"\s*:\s*"([^"]+)",\s*"match_percentage"\s*:\s*(\d+),\s*"reasoning"\s*:\s*"([^"]+)"/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      matches.push({
        dog_id: match[1],
        match_percentage: parseInt(match[2], 10),
        reasoning: match[3],
      });
    }

    return matches;
  }

  private validateAndFormatMatches(
    matches: Array<{
      dog_id: string;
      match_percentage: number;
      reasoning: string;
    }>
  ): AIMatchResponse {
    return {
      matches: matches.map((match) => ({
        dog_id: match.dog_id,
        match_percentage: Math.min(Math.max(match.match_percentage, 0), 100),
        reasoning: match.reasoning.slice(0, 100),
      })),
    };
  }

  private generateFallbackMatches(availableDogs: DogForAI[]): AIMatchResponse {
    return {
      matches: availableDogs.slice(0, 5).map((dog) => ({
        dog_id: dog.id,
        match_percentage: Math.floor(Math.random() * 30) + 70,
        reasoning: 'Dopasowanie na podstawie dostępnych danych',
      })),
    };
  }
}
