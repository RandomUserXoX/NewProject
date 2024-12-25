import type { ContentAnalysis } from './analysis';

export interface ProcessedDocument {
  id: string;
  title: string;
  content: string;
  analysis: ContentAnalysis;
  timestamp: number;
}