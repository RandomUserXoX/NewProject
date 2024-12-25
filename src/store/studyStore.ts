import { create } from 'zustand';
import { UploadedContent } from './uploadStore';

export interface Question {
  id: string;
  documentId: string;
  type: 'multiple-choice' | 'fill-blank' | 'open-ended';
  question: string;
  options?: string[];
  correctAnswer: string;
  userAnswer?: string;
  lastReviewed?: number;
  nextReview?: number;
  difficulty: number;
}

export interface StudySession {
  id: string;
  documentId: string;
  startTime: number;
  endTime?: number;
  questions: Question[];
  performance: number;
}

interface StudyStore {
  currentSession: StudySession | null;
  sessions: StudySession[];
  questions: Question[];
  activeQuestion: Question | null;
  feynmanNotes: Record<string, string>;
  
  // Session Management
  startSession: (documentId: string) => void;
  endSession: () => void;
  
  // Question Management
  generateQuestions: (content: UploadedContent) => void;
  answerQuestion: (questionId: string, answer: string) => void;
  
  // Feynman Technique
  saveFeynmanNote: (documentId: string, note: string) => void;
  
  // Spaced Repetition
  calculateNextReview: (question: Question, performance: number) => number;
}

const calculateSpacedInterval = (difficulty: number, previousInterval: number = 1) => {
  // Implementation of SuperMemo-2 algorithm
  const easeFactor = Math.max(1.3, 2.5 - 0.15 * difficulty);
  return Math.round(previousInterval * easeFactor);
};

export const useStudyStore = create<StudyStore>((set, get) => ({
  currentSession: null,
  sessions: [],
  questions: [],
  activeQuestion: null,
  feynmanNotes: {},

  startSession: (documentId: string) => {
    const session = {
      id: crypto.randomUUID(),
      documentId,
      startTime: Date.now(),
      questions: [],
      performance: 0,
    };
    set({ currentSession: session });
  },

  endSession: () => {
    const currentSession = get().currentSession;
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        endTime: Date.now(),
      };
      set(state => ({
        sessions: [...state.sessions, updatedSession],
        currentSession: null,
      }));
    }
  },

  generateQuestions: (content: UploadedContent) => {
    // Simulate AI question generation
    const questions: Question[] = [
      {
        id: crypto.randomUUID(),
        documentId: content.id,
        type: 'multiple-choice',
        question: `What is the main concept of ${content.title}?`,
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        correctAnswer: 'Option 1',
        difficulty: 0.5,
      },
      {
        id: crypto.randomUUID(),
        documentId: content.id,
        type: 'fill-blank',
        question: 'The key point of this document is ___.',
        correctAnswer: 'learning',
        difficulty: 0.3,
      },
    ];

    set(state => ({
      questions: [...state.questions, ...questions],
      activeQuestion: questions[0],
    }));
  },

  answerQuestion: (questionId: string, answer: string) => {
    set(state => {
      const question = state.questions.find(q => q.id === questionId);
      if (!question) return state;

      const isCorrect = answer.toLowerCase() === question.correctAnswer.toLowerCase();
      const nextReview = get().calculateNextReview(question, isCorrect ? 1 : 0);

      const updatedQuestions = state.questions.map(q =>
        q.id === questionId
          ? {
              ...q,
              userAnswer: answer,
              lastReviewed: Date.now(),
              nextReview,
              difficulty: isCorrect ? Math.max(0, q.difficulty - 0.1) : Math.min(1, q.difficulty + 0.1),
            }
          : q
      );

      return { questions: updatedQuestions };
    });
  },

  saveFeynmanNote: (documentId: string, note: string) => {
    set(state => ({
      feynmanNotes: {
        ...state.feynmanNotes,
        [documentId]: note,
      },
    }));
  },

  calculateNextReview: (question: Question, performance: number) => {
    const now = Date.now();
    const interval = question.nextReview
      ? (question.nextReview - (question.lastReviewed || now)) / (24 * 60 * 60 * 1000)
      : 1;
    
    const nextInterval = calculateSpacedInterval(question.difficulty, interval);
    return now + nextInterval * 24 * 60 * 60 * 1000;
  },
}));