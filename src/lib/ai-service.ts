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

    const dogsData = availableDogs.map((dog) => {
      const breedInfo =
        Array.isArray(dog.breed) && dog.breed.length > 0
          ? dog.breed[0]
          : { name: '', size: '' };

      return {
        id: dog.id,
        name: dog.name,
        breed: breedInfo.name,
        size: breedInfo.size,
      };
    });

    return this.callAIModel(request, dogsData).catch((error) => {
      console.error('Error in AI service:', error);
      return this.generateFallbackMatches(availableDogs);
    });
  }

  private async callAIModel(
    request: AIMatchRequestDTO,
    dogsData: any[]
  ): Promise<any> {
    console.log(`🚀 ~ callAIModel ~ using model: ${this.MODEL}`);

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
            content:
              'Jesteś ekspertem w dopasowywaniu psów do preferencji użytkowników. Analizujesz opis preferencji i listę dostępnych psów, a następnie zwracasz listę psów najlepiej pasujących do kryteriów. WAŻNE: Twoja odpowiedź MUSI zawierać wyłącznie obiekt JSON zgodny z tym schematem: { "matches": [ { "dog_id": "id_psa", "match_percentage": liczba_od_0_do_100, "reasoning": "uzasadnienie_dlaczego_pies_pasuje" } ] }.',
          },
          {
            role: 'user',
            content: `Preferencje użytkownika: ${request.prompt}\n\nDostępne psy: ${JSON.stringify(dogsData)}`,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.5,
        max_tokens: 1500,
      }),
    }).catch((error) => {
      console.error('Fetch error:', error);
      throw new Error('AI service network error');
    });

    if (!response.ok) {
      throw new Error(
        `AI service returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json().catch((error) => {
      console.error('JSON parse error:', error);
      throw new Error('AI service returned invalid JSON');
    });

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Empty AI response');
    }

    const result = this.processAIResponse(data);
    this.setCache(this.generateCacheKey(request), result);
    return result;
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
    const content = response.choices[0].message.content;

    return this.extractAndParseJson(content).catch(() => {
      throw new Error('Failed to parse AI response as JSON');
    });
  }

  private async extractAndParseJson(content: string): Promise<any> {
    const jsonStartIndex = content.indexOf('{');
    const jsonEndIndex = content.lastIndexOf('}');

    if (
      jsonStartIndex === -1 ||
      jsonEndIndex === -1 ||
      jsonEndIndex <= jsonStartIndex
    ) {
      throw new Error('No valid JSON found in the response');
    }

    const jsonContent = content.substring(jsonStartIndex, jsonEndIndex + 1);
    const parsedContent = JSON.parse(jsonContent);

    if (!parsedContent.matches || !Array.isArray(parsedContent.matches)) {
      throw new Error('Invalid JSON structure');
    }

    interface MatchItem {
      dog_id?: string;
      match_percentage?: number;
      reasoning?: string;
    }

    return parsedContent.matches.map((match: MatchItem) => ({
      dog_id: match.dog_id || '',
      match_percentage:
        typeof match.match_percentage === 'number' ? match.match_percentage : 0,
      reasoning: match.reasoning || '',
    }));
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
