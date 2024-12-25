import type { AnalysisResponse } from '../types/analysis';
import { extractSentences, cleanText } from '../utils/textUtils';

export function generateFallbackAnalysis(text: string): AnalysisResponse {
  const cleanedText = cleanText(text);
  const sentences = extractSentences(cleanedText);
  
  const keyPoints = sentences
    .filter(sentence => sentence.length > 30)
    .slice(0, 5)
    .map((sentence, index) => ({
      point: sentence.slice(0, 100) + (sentence.length > 100 ? '...' : ''),
      significance: 'This concept appears to be a fundamental building block of the topic',
      connections: [],
    }));

  return {
    keyPoints,
    biggerPicture: "I've identified these key concepts as potential anchor points for your study framework. Each point represents a fundamental concept that you can expand upon as you study deeper. Consider how these points might interconnect to form a complete understanding of the topic.",
  };
}