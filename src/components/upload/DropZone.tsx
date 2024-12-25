import { Upload, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { useRef } from 'react';
import { useUploadHandlers } from '../../hooks/useUploadHandlers';
import { validateFile } from './FileValidator';

interface DropZoneProps {
  onFileProcess: (file: File) => Promise<void>;
  onError: (error: string) => void;
}

export function DropZone({ onFileProcess, onError }: DropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFile = async (file: File) => {
    const validation = validateFile(file);
    if (!validation.isValid) {
      onError(validation.error || 'Invalid file');
      return;
    }
    await onFileProcess(file);
  };

  const { isDragging, handleDragOver, handleDragLeave, handleDrop } = useUploadHandlers(handleFile);

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging
          ? 'border-primary bg-primary/10'
          : 'border-gray-300 hover:border-primary/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <h3 className="mb-2 text-lg font-medium text-white">
        Upload your PDF
      </h3>
      <p className="mb-4 text-sm text-gray-300">
        Drag and drop your PDF here, or click to select
      </p>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="hidden"
        accept=".pdf"
      />
      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="mx-auto bg-white/10 hover:bg-white/20 text-white"
      >
        <FileText className="w-4 h-4 mr-2" />
        Select PDF
      </Button>
    </div>
  );
}