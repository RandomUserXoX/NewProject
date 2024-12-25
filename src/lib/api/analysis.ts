import { generateMistralResponse } from './mistral/client';
import type { AnalysisResponse } from '../types/analysis';

const ANALYSIS_PROMPT = `Analyze this text and provide:
1. Key points (maximum 5) with their significance
2. How these points connect to each other
3. A brief overview of the bigger picture

Format the response as JSON:
{
  "keyPoints": [
    {
      "point": "Main idea here",
      "significance": "Why this is important",
      "connections": ["Related point 1", "Related point 2"]
    }
  ],
  "biggerPicture": "Overall summary and context"
}`;

export async function analyzeContent(text: string): Promise<AnalysisResponse> {
  try {
    const response = await generateMistralResponse(`${ANALYSIS_PROMPT}\n\nContent:\n${text}`);
    const result = JSON.parse(response);
    
    if (!isValidAnalysisResponse(result)) {
      throw new Error('Invalid response format from API');
    }
    
    return result;
  } catch (error) {
    console.error('Content analysis failed:', error);
    throw new Error('Failed to analyze content');
  }
}

function isValidAnalysisResponse(data: unknown): data is AnalysisResponse {
  return (
    !!data &&
    typeof data === 'object' &&
    'keyPoints' in data &&
    Array.isArray((data as AnalysisResponse).keyPoints) &&
    'biggerPicture' in data &&
    typeof (data as AnalysisResponse).biggerPicture === 'string'
  );
}