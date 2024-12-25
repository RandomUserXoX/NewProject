export interface PDFMetadata {
  name: string;
  size: number;
  type: string;
  uploaded: string;
  textLength: number;
}

export function createPDFMetadata(file: File, textLength: number): PDFMetadata {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    uploaded: new Date().toISOString(),
    textLength,
  };
}

export function storePDFMetadata(url: string, metadata: PDFMetadata): void {
  try {
    localStorage.setItem(`pdf_${url}`, JSON.stringify(metadata));
  } catch (error) {
    console.warn('Failed to store PDF metadata:', error);
  }
}