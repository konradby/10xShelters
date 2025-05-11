import {
  ChatResponse,
  Message,
  Model,
  ModelParams,
  ResponseFormat,
} from '@/types/openrouter.types';
import axios, { AxiosInstance } from 'axios';

// Klasa błędów
export class OpenRouterError extends Error {
  public status: number;
  public code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = 'OpenRouterError';
  }
}

// Klasa serwisu
export class OpenRouterService {
  private apiKey: string;
  private client: AxiosInstance;
  private defaultModel: string;
  private defaultParams: ModelParams;
  private costLimit: number | null;
  private currentUsage: number;
  private baseUrl: string;

  constructor(options: {
    apiKey: string;
    defaultModel?: string;
    defaultParams?: ModelParams;
    costLimit?: number;
    baseUrl?: string;
  }) {
    if (!options.apiKey) {
      throw new Error('Klucz API jest wymagany');
    }

    this.apiKey = options.apiKey;
    this.defaultModel = options.defaultModel || 'openai/gpt-4';
    this.defaultParams = options.defaultParams || {
      temperature: 0.7,
      top_p: 1,
      max_tokens: 1000,
    };
    this.costLimit = options.costLimit || null;
    this.currentUsage = 0;
    this.baseUrl = options.baseUrl || 'https://openrouter.ai/api/v1';

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
        'HTTP-Referer':
          typeof window !== 'undefined'
            ? window.location.origin
            : 'https://10xshelter.app',
        'X-Title': '10xShelter',
      },
    });
  }

  // Metody publiczne
  async chat(options: {
    messages: Message[];
    model?: string;
    params?: ModelParams;
    responseFormat?: ResponseFormat;
  }): Promise<ChatResponse> {
    const { messages, model, params, responseFormat } = options;

    // Walidacja wejścia
    if (!this._validateMessages(messages)) {
      throw new OpenRouterError(
        'Nieprawidłowy format wiadomości',
        400,
        'invalid_messages'
      );
    }

    // Sprawdzenie limitu kosztów
    if (!this._checkCostLimit()) {
      throw new OpenRouterError(
        'Przekroczono miesięczny limit kosztów',
        403,
        'cost_limit_exceeded'
      );
    }

    // Przygotowanie zapytania
    const requestData = {
      messages,
      model: model || this.defaultModel,
      response_format: responseFormat,
      ...this._formatParams({ ...this.defaultParams, ...params }),
    };

    try {
      const response = await this._makeApiRequest(
        '/chat/completions',
        'POST',
        requestData
      );

      // Aktualizacja użycia
      if (response.usage) {
        this._updateUsage(
          this._calculateCost(response.usage)
        );
      }

      return response;
    } catch (error) {
      return this._handleError(error);
    }
  }

  async getAvailableModels(): Promise<Model[]> {
    try {
      const response = await this._makeApiRequest('/models', 'GET');
      return response.data || [];
    } catch (error) {
      return this._handleError(error);
    }
  }

  createSystemMessage(content: string): Message {
    return { role: 'system', content };
  }

  createUserMessage(content: string): Message {
    return { role: 'user', content };
  }

  createJsonSchema(
    schema: object,
    schemaName: string,
    strict: boolean = true
  ): ResponseFormat {
    return {
      type: 'json_schema',
      json_schema: {
        name: schemaName,
        strict: strict,
        schema: schema,
      },
    };
  }

  get usage(): {
    currentMonthCost: number;
    remainingBudget: number | null;
  } {
    return {
      currentMonthCost: this.currentUsage,
      remainingBudget: this.costLimit
        ? this.costLimit - this.currentUsage
        : null,
    };
  }

  // Metody prywatne
  private async _makeApiRequest(
    endpoint: string,
    method: 'GET' | 'POST',
    data?: any
  ): Promise<any> {
    try {
      let response;

      if (method === 'GET') {
        response = await this.client.get(endpoint);
      } else {
        response = await this.client.post(endpoint, data);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  private _validateMessages(messages: Message[]): boolean {
    if (!Array.isArray(messages) || messages.length === 0) {
      return false;
    }

    return messages.every(
      (msg) =>
        msg &&
        typeof msg === 'object' &&
        ['system', 'user', 'assistant'].includes(msg.role) &&
        typeof msg.content === 'string'
    );
  }

  private _formatParams(params: ModelParams): object {
    const formattedParams: Record<string, any> = {};

    if (params.temperature !== undefined) {
      formattedParams.temperature = params.temperature;
    }

    if (params.top_p !== undefined) {
      formattedParams.top_p = params.top_p;
    }

    if (params.max_tokens !== undefined) {
      formattedParams.max_tokens = params.max_tokens;
    }

    if (params.frequency_penalty !== undefined) {
      formattedParams.frequency_penalty = params.frequency_penalty;
    }

    if (params.presence_penalty !== undefined) {
      formattedParams.presence_penalty = params.presence_penalty;
    }

    if (params.stop !== undefined) {
      formattedParams.stop = params.stop;
    }

    return formattedParams;
  }

  private _checkCostLimit(): boolean {
    if (this.costLimit === null) {
      return true;
    }

    return this.currentUsage < this.costLimit;
  }

  private _calculateCost(usage: ChatResponse['usage']): number {
    // Uproszczone obliczenie kosztu - w rzeczywistej implementacji
    // należałoby użyć dokładnych stawek dla danego modelu
    const promptCost = usage.prompt_tokens * 0.00001;
    const completionCost = usage.completion_tokens * 0.00002;

    return promptCost + completionCost;
  }

  private _updateUsage(cost: number): void {
    this.currentUsage += cost;
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
}
