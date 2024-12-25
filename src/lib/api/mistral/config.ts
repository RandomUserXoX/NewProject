import { ENV } from '../../config/env';

export const MISTRAL_CONFIG = {
  apiKey: ENV.mistral.apiKey,
  baseUrl: ENV.mistral.baseUrl,
  model: ENV.mistral.model,
  maxLength: 32000,
  temperature: 0.7,
  topP: 0.95,
  maxTokens: 2048,
} as const;

export const API_CONSTRAINTS = {
  MIN_INPUT_LENGTH: 10,
  MAX_INPUT_LENGTH: 32000,
} as const;