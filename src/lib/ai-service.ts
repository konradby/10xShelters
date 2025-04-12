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
          model: 'anthropic/claude-3-opus',
          messages: [
            {
              role: 'system',
              content:
                'Jesteś ekspertem w dopasowywaniu psów do preferencji użytkowników. Analizujesz opis preferencji i zwracasz listę psów najlepiej pasujących do kryteriów.',
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
      const parsedContent = JSON.parse(content);

      if (!Array.isArray(parsedContent.matches)) {
        throw new Error('Invalid AI response format');
      }

      return parsedContent.matches.map((match: any) => ({
        dog_id: match.dog_id,
        match_percentage: match.match_percentage,
        reasoning: match.reasoning,
      }));
    } catch (error) {
      console.error('Error processing AI response:', error);
      throw new Error('Failed to process AI response');
    }
  }
}
