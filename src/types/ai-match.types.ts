
export interface CachedData {
  timestamp: number;
  data: AIMatchResponse;
}

export interface AIMatchResponse {
  matches: Array<{
    dog_id: string;
    match_percentage: number;
    reasoning: string;
  }>;
}

export interface DogForAI {
  id: string;
  name: string;
  breed:
    | string
    | Array<{
        name: string;
        size: string;
        energy_level?: number;
        sociability?: number;
        trainability?: number;
      }>;
  size: string;
  approximate_age: string | null;
  gender: string;
  color: string | null;
  weight: number | null;
  energy_level?: number;
  sociability?: number;
  trainability?: number;
  tags: Array<{ tag?: { name: string } }>;
  description: string | null;
}

export interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}
