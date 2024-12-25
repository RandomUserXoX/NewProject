import { ENV } from '../../config/env';

interface MistralResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function generateMistralResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${ENV.mistral.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ENV.mistral.apiKey}`,
      },
      body: JSON.stringify({
        model: ENV.mistral.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data: MistralResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Mistral API error:', error);
    throw new Error('Failed to generate response');
  }
}