import { create } from 'zustand';
import { analyzeContent } from '../lib/api/analysis';
import type { KeyPoint } from '../lib/types/analysis';
import { useChatStore } from './chatStore';
import { validateEnv } from '../lib/config/env';

interface PrimeMapStore {
  keyPoints: KeyPoint[];
  biggerPicture: string;
  isLoading: boolean;
  error: string | null;
  generatePrimeMap: (content: string) => Promise<void>;
  cleanup: () => void;
  clearError: () => void;
}

export const usePrimeMapStore = create<PrimeMapStore>((set) => ({
  keyPoints: [],
  biggerPicture: '',
  isLoading: false,
  error: null,

  generatePrimeMap: async (content: string) => {
    if (!validateEnv()) {
      set({ error: 'API configuration is missing', isLoading: false });
      return;
    }

    set({ isLoading: true, error: null });
    
    try {
      const analysis = await analyzeContent(content);

      const keyPoints: KeyPoint[] = analysis.keyPoints.map((point, index) => ({
        id: String(index + 1),
        title: point.point,
        significance: point.significance,
        connections: point.connections,
      }));

      useChatStore.getState().setDocumentContext(analysis);

      set({ 
        keyPoints,
        biggerPicture: analysis.biggerPicture,
        isLoading: false,
        error: null
      });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to analyze content';
      
      set({ 
        keyPoints: [],
        biggerPicture: '',
        isLoading: false,
        error: errorMessage
      });
    }
  },

  cleanup: () => {
    set({ 
      keyPoints: [],
      biggerPicture: '',
      error: null
    });
    useChatStore.getState().clearChat();
  },

  clearError: () => set({ error: null }),
}));