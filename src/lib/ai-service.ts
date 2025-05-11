import {
  AIMatchResponse,
  CachedData,
  DogDetailsDTO,
  OpenRouterResponse,
} from '@/types';
import SHA256 from 'crypto-js/sha256';
import { AIMatchRequestDTO } from '../types/types';
import { logError, logInfo } from './logger.utils';

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
    availableDogs: DogDetailsDTO[]
  ): Promise<AIMatchResponse> {
    const cacheKey = this.generateCacheKey(request);
    const cachedResult = this.getFromCache(cacheKey);

    if (cachedResult) return cachedResult;

    if (!availableDogs || availableDogs.length === 0) {
      logError('No available dogs, using fallback', { availableDogs });
      return { matches: [] };
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
    dogsData: DogDetailsDTO[]
  ): Promise<AIMatchResponse> {
    logInfo(`🚀 ~ callAIModel ~ using model: ${this.MODEL}`);

    const stringifiedDogs = JSON.stringify(dogsData);

    logInfo('Dogs sent to AI');

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
            content: `Preferencje użytkownika: ${request.prompt}\n\nDostępne psy: ${stringifiedDogs}`,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.5,
        max_tokens: 2500,
      }),
    }).catch((error) => {
      logError('Error in AI service, fetch failed:', { error });
    });

    if (!response?.ok) {
      logError('Error in AI service, using fallback:', { response });
      return this.generateFallbackMatches(dogsData);
    }

    const data = (await response.json()) as OpenRouterResponse;

    if (!data.choices?.[0]?.message?.content) {
      logError('Empty AI response:', { data });
      return this.generateFallbackMatches(dogsData);
    }

    const result = await this.processAIResponse(data);
    this.setCache(this.generateCacheKey(request), result);
    return result;
  }

  private generateCacheKey(request: AIMatchRequestDTO): string {
    const inputString = `${request.prompt}-${request.limit}`;
    return SHA256(inputString).toString();
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
    if (!response.choices?.[0]?.message?.content) {
      logError('Empty AI response:', { response });
      return { matches: [] };
    }

    const content = response.choices[0].message.content;

    if (!content || typeof content !== 'string') {
      logError('Invalid AI response format:', { content });
      return { matches: [] };
    }

    return await this.extractAndParseJson(content);
  }

  private async extractAndParseJson(content: string): Promise<AIMatchResponse> {
    // Najpierw spróbuj sparsować całą treść jako JSON
    try {
      const parsedContent = JSON.parse(content) as AIMatchResponse;
      if (parsedContent.matches && Array.isArray(parsedContent.matches)) {
        logInfo('Parsowanie całej treści jako JSON powiodło się');
        return this.validateAndFormatMatches(parsedContent.matches);
      }
    } catch (e) {
      logError(
        'Całość treści nie jest poprawnym JSON, próbuję wyodrębnić JSON...',
        { e }
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
      logError('Nie znaleziono poprawnego JSON w odpowiedzi');
      return { matches: [] };
    }

    const jsonContent = content.substring(jsonStartIndex, jsonEndIndex + 1);

    // Próba naprawy potencjalnie obciętego JSON
    try {
      const parsedContent = JSON.parse(jsonContent) as AIMatchResponse;
      if (parsedContent.matches && Array.isArray(parsedContent.matches)) {
        return this.validateAndFormatMatches(parsedContent.matches);
      }
    } catch (parseError) {
      logError(
        'Wyodrębniony JSON jest niepoprawny, próbuję naprawić obcięty JSON...',
        { parseError }
      );

      // Szukamy dosłownie struktury JSON "matches"
      const matchesStartIndex = content.indexOf('"matches"');
      const bracketOpenIndex = content.indexOf('[', matchesStartIndex);

      if (matchesStartIndex !== -1 && bracketOpenIndex !== -1) {
        // Próba wyodrębnienia poszczególnych obiektów dopasowań
        const matchesContent = content.substring(bracketOpenIndex);
        const extractedMatches = this.extractPartialMatches(matchesContent);

        if (extractedMatches.length > 0) {
          logInfo(
            `Udało się wyodrębnić ${extractedMatches.length} częściowych dopasowań`
          );
          return { matches: extractedMatches };
        }
      }
    }

    // Jeśli doszliśmy tutaj, JSON jest uszkodzony i nie da się go naprawić
    logError('Nie udało się naprawić JSON. Zawartość:', { jsonContent });
    return { matches: [] };
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

  private generateFallbackMatches(
    availableDogs: DogDetailsDTO[]
  ): AIMatchResponse {
    return {
      matches: availableDogs.slice(0, 5).map((dog) => ({
        dog_id: dog.id,
        match_percentage: Math.floor(Math.random() * 30) + 70,
        reasoning: 'Dopasowanie na podstawie dostępnych danych',
      })),
    };
  }
}
