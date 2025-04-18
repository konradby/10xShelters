import { AIMatchRequestDTO } from '../types/types';

export class AIService {
  private readonly API_URL = 'https://openrouter.ai/api/v1/chat/completions';
  private cache: Map<string, any>;
  private readonly CACHE_TTL = 3600000; // 1 godzina

  constructor() {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not set');
    }
    this.cache = new Map();
  }

  async matchDogs(request: AIMatchRequestDTO): Promise<any> {
    const cacheKey = this.generateCacheKey(request);
    const cachedResult = this.getFromCache(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://10xshelter.pl',
          'X-Title': '10xShelter',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-v3-base:free',
          messages: [
            {
              role: 'system',
              content:
                'Jesteś ekspertem w dopasowywaniu psów do preferencji użytkowników. Analizujesz opis preferencji i zwracasz listę psów najlepiej pasujących do kryteriów. Odpowiedź musi być w formacie JSON zgodnym z następującym schematem: { "matches": [ { "dog_id": "id_psa", "match_percentage": liczba_od_0_do_100, "reasoning": "uzasadnienie_dlaczego_pies_pasuje" } ] }. Nie dodawaj żadnego tekstu przed ani po strukturze JSON.',
            },
            {
              role: 'user',
              content: request.prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(
          `AI service returned ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      const result = this.processAIResponse(data);
      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error in AI service:', error);
      throw new Error('AI service is currently unavailable');
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

      // Próba wyodrębnienia JSON z odpowiedzi
      let jsonContent = content;

      // Szukaj znaków przypominających początek JSON (może być zagubiony w tekście)
      const jsonStartMatch = content.match(/\{\s*"matches"/);
      if (jsonStartMatch) {
        jsonContent = content.substring(jsonStartMatch.index);
      }

      // Próba sparsowania JSON
      try {
        const parsedContent = JSON.parse(jsonContent);

        if (Array.isArray(parsedContent.matches)) {
          return parsedContent.matches.map((match: any) => ({
            dog_id: match.dog_id,
            match_percentage: match.match_percentage,
            reasoning: match.reasoning,
          }));
        }
      } catch (jsonError) {
        console.error('Failed to parse AI response as JSON:', jsonError);
      }

      // Jeśli nie udało się sparsować jako JSON, generujemy przykładowe dane
      console.warn('Generating fallback response due to invalid AI format');
      return [
        {
          dog_id: '1',
          match_percentage: 85,
          reasoning:
            'Nie udało się przetworzyć odpowiedzi AI. To jest automatycznie wygenerowane dopasowanie.',
        },
      ];
    } catch (error) {
      console.error('Error processing AI response:', error);
      throw new Error('Failed to process AI response');
    }
  }
}
