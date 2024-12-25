import { Card, CardContent } from '../ui/card';

interface ProcessingStatusProps {
  status: 'uploading' | 'processing' | 'analyzing' | 'complete' | 'error';
  error?: string;
}

export function ProcessingStatus({ status, error }: ProcessingStatusProps) {
  const statusMessages = {
    uploading: 'Uploading PDF...',
    processing: 'Extracting text from PDF...',
    analyzing: 'Analyzing content...',
    complete: 'Analysis complete!',
    error: error || 'An error occurred',
  };

  return (
    <Card className={`${status === 'error' ? 'bg-red-100' : 'bg-gray-50'}`}>
      <CardContent className="p-4">
        <div className="flex items-center">
          {status !== 'complete' && status !== 'error' && (
            <div className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          )}
          <p className={status === 'error' ? 'text-red-600' : 'text-gray-600'}>
            {statusMessages[status]}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}