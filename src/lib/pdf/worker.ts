import { GlobalWorkerOptions } from 'pdfjs-dist';

let isWorkerInitialized = false;

export async function initPdfWorker(): Promise<void> {
  if (isWorkerInitialized) return;
  
  try {
    GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.mjs',
      import.meta.url,
    ).href;
    isWorkerInitialized = true;
  } catch (error) {
    console.error('Failed to initialize PDF worker:', error);
    throw new Error('PDF worker initialization failed');
  }
}