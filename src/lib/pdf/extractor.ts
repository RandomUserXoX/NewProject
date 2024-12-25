import { getDocument, PDFDocumentProxy } from 'pdfjs-dist';
import { initPdfWorker } from './worker';
import { validatePDF } from './validation';
import { extractPageText } from './textExtractor';

export async function extractTextFromPDF(file: File): Promise<string> {
  const validation = validatePDF(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  try {
    await initPdfWorker();

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = getDocument({ data: arrayBuffer });
    const pdf: PDFDocumentProxy = await loadingTask.promise;

    const textPromises = Array.from(
      { length: pdf.numPages },
      (_, i) => pdf.getPage(i + 1).then(extractPageText)
    );

    const texts = await Promise.all(textPromises);
    const fullText = texts.join('\n\n').trim();

    if (!fullText) {
      throw new Error('No text could be extracted from the PDF');
    }

    return fullText;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to process PDF';
    throw new Error(`PDF processing failed: ${message}`);
  }
}