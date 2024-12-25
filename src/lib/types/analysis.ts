export interface KeyPoint {
  id: string;
  title: string;
  significance: string;
  connections: string[];
}

export interface AnalysisResponse {
  keyPoints: Array<{
    point: string;
    significance: string;
    connections: string[];
  }>;
  biggerPicture: string;
}

export interface ContentAnalysis {
  keyPoints: KeyPoint[];
  significance: string;
  connections: Array<[string, string]>;
  timestamp: number;
}