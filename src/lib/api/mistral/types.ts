export interface MistralResponse {
  text: string;
  error?: string;
}

export interface MistralError extends Error {
  status?: number;
  code?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}