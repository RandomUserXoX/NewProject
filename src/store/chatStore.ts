import { create } from 'zustand';
import { generateMistralResponse } from '../lib/api/mistral/client';
import type { AnalysisResponse } from '../lib/types/analysis';
import { validateEnv } from '../lib/config/env';

interface Message {
  id: string;
  content: string;
  isTeacher: boolean;
  timestamp: number;
}

interface ChatStore {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  documentContext: AnalysisResponse | null;
  sendMessage: (content: string) => Promise<void>;
  setDocumentContext: (context: AnalysisResponse) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,
  documentContext: null,

  sendMessage: async (content: string) => {
    if (!validateEnv()) {
      set({ error: 'API configuration is missing' });
      return;
    }

    const { documentContext } = get();
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      isTeacher: false,
      timestamp: Date.now(),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const contextPrompt = documentContext 
        ? `Based on the document we're discussing, where:
           - Key Points: ${documentContext.keyPoints.map(p => p.point).join('; ')}
           - Overall Context: ${documentContext.biggerPicture}
           
           Please answer the following question: ${content}`
        : content;

      const response = await generateMistralResponse(contextPrompt);
      
      const teacherMessage: Message = {
        id: crypto.randomUUID(),
        content: response,
        isTeacher: true,
        timestamp: Date.now(),
      };

      set((state) => ({
        messages: [...state.messages, teacherMessage],
        isLoading: false,
      }));
    } catch (error) {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: crypto.randomUUID(),
            content: "I apologize, but I'm having trouble processing your request. Could you please try again?",
            isTeacher: true,
            timestamp: Date.now(),
          },
        ],
        isLoading: false,
        error: 'Failed to get response',
      }));
    }
  },

  setDocumentContext: (context: AnalysisResponse) => {
    set({ documentContext: context });
  },

  clearChat: () => {
    set({
      messages: [],
      isLoading: false,
      error: null,
      documentContext: null,
    });
  },
}));