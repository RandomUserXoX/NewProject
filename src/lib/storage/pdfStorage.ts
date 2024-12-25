import { extractTextFromPDF } from '../pdf/extractor';
import { createPDFMetadata, storePDFMetadata } from './pdfMetadata';

export async function storePDFContent(file: File): Promise<{ url: string; text: string }> {
  try {
    const text = await extractTextFromPDF(file);
    
    if (!text || text.trim().length === 0) {
      throw new Error('No text could be extracted from the PDF');
    }

    const url = URL.createObjectURL(file);
    const metadata = createPDFMetadata(file, text.length);
    storePDFMetadata(url, metadata);
    
    return { url, text };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to store PDF';
    throw new Error(`PDF storage failed: ${message}`);
  }
}

export function cleanupPDFStorage(url: string | null): void {
  if (!url) return;
  
  try {
    URL.revokeObjectURL(url);
    localStorage.removeItem(`pdf_${url}`);
  } catch (error) {
    console.error('Failed to cleanup PDF storage:', error);
  }
}