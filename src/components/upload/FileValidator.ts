export function validateFile(file: File): { isValid: boolean; error?: string } {
  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size exceeds 10MB limit',
    };
  }

  // Check file type
  if (file.type !== 'application/pdf') {
    return {
      isValid: false,
      error: 'Only PDF files are supported',
    };
  }

  return { isValid: true };
}