import { extractTextFromPDF } from './extractor';
import { analyzeContent } from '../ai/analyzer';
import { type ProcessedDocument } from '../types/documents';

export async function processPDF(file: File): Promise<ProcessedDocument> {
  try {
    // Extract text from PDF
    const text = await extractTextFromPDF(file);
    
    // Analyze content using AI
    const analysis = await analyzeContent(text);
    
    return {
      id: crypto.randomUUID(),
      title: file.name.replace('.pdf', ''),
      content: text,
      analysis,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('PDF processing failed:', error);
    throw new Error('Failed to process PDF document');
  }
}