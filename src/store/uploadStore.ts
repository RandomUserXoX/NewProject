import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UploadedContent {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'pdf' | 'docx';
  summary?: string;
  keywords?: string[];
  timestamp: number;
}

interface UploadStore {
  documents: UploadedContent[];
  activeDocument: UploadedContent | null;
  addDocument: (doc: Omit<UploadedContent, 'id' | 'timestamp'>) => void;
  setActiveDocument: (id: string) => void;
  processDocument: (id: string) => void;
  clearActiveDocument: () => void;
}

export const useUploadStore = create<UploadStore>()(
  persist(
    (set, get) => ({
      documents: [],
      activeDocument: null,
      addDocument: (doc) => {
        const newDoc = {
          ...doc,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        };
        set((state) => ({
          documents: [newDoc, ...state.documents],
          activeDocument: newDoc,
        }));
      },
      setActiveDocument: (id) => {
        const docs = get().documents;
        const doc = docs.find((d) => d.id === id);
        set({ activeDocument: doc || null });
      },
      clearActiveDocument: () => {
        set({ activeDocument: null });
      },
      processDocument: (id) => {
        set((state) => ({
          documents: state.documents.map((doc) => {
            if (doc.id === id) {
              return {
                ...doc,
                summary: `Summary of ${doc.title}: ${doc.content.slice(0, 200)}...`,
                keywords: doc.content
                  .split(' ')
                  .slice(0, 10)
                  .filter((word) => word.length > 5),
              };
            }
            return doc;
          }),
        }));
      },
    }),
    {
      name: 'upload-storage',
      partialize: (state) => ({
        documents: state.documents,
        // Don't persist activeDocument
      }),
    }
  )
);