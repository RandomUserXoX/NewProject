import { useState } from 'react';
import { useUploadStore } from '../../store/uploadStore';
import { DropZone } from './DropZone';
import { extractTextFromPDF } from '../../lib/pdf';
import { Card } from '../ui/card';

export function FileUpload() {
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addDocument } = useUploadStore();

  const handleFileProcess = async (file: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const text = await extractTextFromPDF(file);
      
      if (!text.trim()) {
        throw new Error('No text could be extracted from the PDF');
      }
      
      addDocument({
        title: file.name.replace('.pdf', ''),
        content: text,
        type: 'pdf',
      });

    } catch (err) {
      console.error('PDF processing error:', err);
      setError('Failed to process PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {error && (
        <Card className="p-4 bg-destructive/10 border-destructive/20 text-destructive">
          <p>{error}</p>
        </Card>
      )}
      
      <DropZone 
        onFileProcess={handleFileProcess}
        onError={setError}
      />
      
      {isProcessing && (
        <Card className="p-4 text-center bg-secondary/50 backdrop-blur-sm border-white/10 text-white">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
            <p>Processing PDF...</p>
          </div>
        </Card>
      )}
    </div>
  );
}