import type { KeyPoint } from '../types/analysis';
import { extractSentences, cleanText } from '../utils/textUtils';
import { calculateSimilarity } from '../utils/similarityUtils';

export function processText(text: string): KeyPoint[] {
  const cleanedText = cleanText(text);
  const sentences = extractSentences(cleanedText);
  
  return sentences
    .filter(sentence => sentence.length > 30)
    .slice(0, 8)
    .map((sentence, index) => ({
      id: String(index + 1),
      title: sentence.slice(0, 100),
      significance: 'Key point extracted from document',
      connections: [],
    }));
}

export function generateConnections(points: KeyPoint[]): KeyPoint[] {
  return points.map(point => ({
    ...point,
    connections: findConnections(point, points),
  }));
}

function findConnections(point: KeyPoint, allPoints: KeyPoint[]): string[] {
  return allPoints
    .filter(other => other.id !== point.id)
    .filter(other => calculateSimilarity(point.title, other.title) > 0.3)
    .map(other => other.id);
}