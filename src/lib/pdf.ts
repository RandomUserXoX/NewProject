import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';

// Initialize worker
GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url,
).href;

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    console.log('Starting PDF extraction...');
    
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += `${pageText}\n\n`;
    }

    if (!fullText.trim()) {
      throw new Error('No text could be extracted from the PDF');
    }

    return fullText.trim();
  } catch (error) {
    console.error('PDF processing error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to process PDF');
  }
}