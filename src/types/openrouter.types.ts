export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type ModelParams = {
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stop?: string[];
};

export type ResponseFormat = {
  type: 'json_schema';
  json_schema: {
    name: string;
    strict: boolean;
    schema: object;
  };
};

export type Model = {
  id: string;
  name: string;
  description: string;
  context_length: number;
  pricing: {
    prompt: number;
    completion: number;
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
