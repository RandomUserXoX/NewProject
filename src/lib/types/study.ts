export interface Concept {
  concept: string;
  explanation: string;
  examples: string[];
  relatedConcepts: string[];
}

export interface ReviewQuestion {
  question: string;
  answer: string;
  explanation: string;
}

export interface KeyNote {
  mainConcepts: Concept[];
  reviewQuestions: ReviewQuestion[];
}

export interface AnalysisResult {
  topics: Array<{
    title: string;
    keyPoints: string[];
    importance: string;
  }>;
  terminology: Array<{
    term: string;
    definition: string;
    context: string;
  }>;
  summary: string;
}