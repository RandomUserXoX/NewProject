export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validatePDF(file: File): ValidationResult {
  // Check if file exists
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  // Check file type
  if (file.type !== 'application/pdf') {
    return { isValid: false, error: 'File must be a PDF' };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 10MB' };
  }

  return { isValid: true };
}