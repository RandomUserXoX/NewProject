interface EnvConfig {
  mistral: {
    apiKey: string;
    baseUrl: string;
    model: string;
  };
}

export const ENV: EnvConfig = {
  mistral: {
    apiKey: import.meta.env.VITE_MISTRAL_API_KEY || '',
    baseUrl: 'https://api.mistral.ai/v1',
    model: 'mistral-medium',
  },
};

export function validateEnv(): boolean {
  if (!ENV.mistral.apiKey) {
    console.error('Mistral API key is not configured');
    return false;
  }
  return true;
}