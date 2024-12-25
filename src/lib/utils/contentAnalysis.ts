import { cleanText } from './textUtils';

export function estimateOptimalKeyPoints(text: string): number {
  const cleanedText = cleanText(text);
  const wordCount = cleanedText.split(/\s+/).length;
  
  // Calculate optimal number of key points based on content length
  if (wordCount < 500) return 3;
  if (wordCount < 1000) return 5;
  if (wordCount < 2000) return 7;
  if (wordCount < 5000) return 10;
  return Math.min(15, Math.ceil(wordCount / 500)); // Cap at 15 key points
}