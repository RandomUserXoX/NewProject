import { generateResponse } from './client';
import { ANALYSIS_PROMPT } from './prompts';
import type { AnalysisResponse } from '../../types/analysis';
import { generateFallbackAnalysis } from './fallback';

export async function analyzeContent(text: string): Promise<AnalysisResponse> {
  try {
    // Let the AI determine the optimal number of key points based on content analysis
    const response = await generateResponse(`${ANALYSIS_PROMPT}\n\nContent to analyze:\n\n${text}`);
    const result = JSON.parse(response.text);
    
    if (!isValidAnalysisResponse(result)) {
      throw new Error('Invalid response format');
    }
    
    return result;
  } catch (error) {
    console.error('Content analysis failed:', error);
    return generateFallbackAnalysis(text);
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