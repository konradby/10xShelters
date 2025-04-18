import { AIMatchRequestDTO } from '../types/types';

export class AIService {
  private readonly API_URL = 'https://openrouter.ai/api/v1/chat/completions';
  private cache = new Map<string, any>();
  private readonly CACHE_TTL = 3600000;
  private readonly MODEL = 'openai/o3-mini';

  constructor() {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not set');
    }
  }

  async matchDogs(
    request: AIMatchRequestDTO,
    availableDogs: any[]
  ): Promise<any> {
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
    dogsData: any[]
  ): Promise<any> {
    console.log(`🚀 ~ callAIModel ~ using model: ${this.MODEL}`);

    const dogDetailsForAI = dogsData.map((dog) => {
      const breedInfo =
        Array.isArray(dog.breed) && dog.breed.length > 0
          ? dog.breed[0]
          : { name: '', size: '' };

      const tags = Array.isArray(dog.tags)
        ? dog.tags.map((tagEntry: any) => tagEntry.tag?.name).filter(Boolean)
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

      const data = await response.json();
      console.log(
        'Odpowiedź z AI:',
        JSON.stringify(data).slice(0, 200) + '...'
      );

      if (!data.choices?.[0]?.message?.content) {
        console.error('Brak treści w odpowiedzi API:', data);
        throw new Error('Empty AI response');
      }

      const result = this.processAIResponse(data);
      this.setCache(this.generateCacheKey(request), result);
      return result;
    } catch (error: any) {
      console.error(
        'Błąd podczas komunikacji z OpenRouter API:',
        error.message
      );
      throw error;
    }
  }

  private generateCacheKey(request: AIMatchRequestDTO): string {
    return `${request.prompt}-${request.limit}`;
  }

  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const { timestamp, data } = cached;
    if (Date.now() - timestamp > this.CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }

    return data;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      timestamp: Date.now(),
      data,
    });
  }

  private processAIResponse(response: any): any {
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

      return this.extractAndParseJson(content);
    } catch (error) {
      console.error('Błąd podczas przetwarzania odpowiedzi AI:', error);
      throw new Error('Failed to process AI response');
    }
  }

  private async extractAndParseJson(content: string): Promise<any> {
    try {
      // Najpierw spróbuj sparsować całą treść jako JSON
      try {
        const parsedContent = JSON.parse(content);
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

      let jsonContent = content.substring(jsonStartIndex, jsonEndIndex + 1);

      // Próba naprawy potencjalnie obciętego JSON
      try {
        const parsedContent = JSON.parse(jsonContent);
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
            return extractedMatches;
          }
        }
      }

      // Jeśli doszliśmy tutaj, JSON jest uszkodzony i nie da się go naprawić
      console.error('Nie udało się naprawić JSON. Zawartość:', jsonContent);
      throw new Error('Nie udało się sparsować odpowiedzi AI jako JSON');
    } catch (error) {
      console.error(
        'Błąd podczas parsowania JSON z odpowiedzi AI:',
        error,
        'Treść odpowiedzi:',
        content
      );
      throw new Error('Nie udało się sparsować odpowiedzi AI jako JSON');
    }
  }

  private extractPartialMatches(content: string): any[] {
    const matches: any[] = [];
    const regex = /{[^{}]*"dog_id"\s*:\s*"([^"]+)"[^{}]*}/g;

    let match;
    while ((match = regex.exec(content)) !== null) {
      try {
        const matchJson = match[0];
        // Próbujemy sparsować pojedynczy obiekt dopasowania
        const parsedMatch = JSON.parse(matchJson);

        if (parsedMatch.dog_id) {
          matches.push({
            dog_id: parsedMatch.dog_id,
            match_percentage: parsedMatch.match_percentage || 0,
            reasoning: parsedMatch.reasoning || '',
          });
        }
      } catch (e) {
        // Ignorujemy błędy - po prostu kontynuujemy z następnym dopasowaniem
        console.log(
          'Nie udało się sparsować pojedynczego dopasowania, próbuję następne'
        );
      }
    }

    return matches;
  }

  private validateAndFormatMatches(matches: any[]): any[] {
    if (!Array.isArray(matches)) {
      console.error('matches nie jest tablicą:', matches);
      throw new Error('matches nie jest tablicą');
    }

    return matches
      .map((match: any) => {
        if (!match || typeof match !== 'object') {
          console.error('Nieprawidłowy element dopasowania:', match);
          return {
            dog_id: '',
            match_percentage: 0,
            reasoning: 'Nieprawidłowe dopasowanie',
          };
        }

        return {
          dog_id: match.dog_id || '',
          match_percentage:
            typeof match.match_percentage === 'number'
              ? Math.min(100, Math.max(0, match.match_percentage))
              : 0,
          reasoning: match.reasoning || '',
        };
      })
      .filter((match: any) => match.dog_id !== '');
  }

  private generateFallbackMatches(availableDogs: any[]): any {
    const maxDogs = Math.min(5, availableDogs.length);
    const selectedDogs = [...availableDogs]
      .sort(() => 0.5 - Math.random())
      .slice(0, maxDogs);

    return selectedDogs.map((dog, index) => ({
      dog_id: dog.id,
      match_percentage: 90 - index * 10,
      reasoning:
        'To automatyczne dopasowanie zostało wygenerowane, ponieważ system AI nie był w stanie przetworzyć zapytania.',
    }));
  }
}
