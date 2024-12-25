import { Upload } from 'lucide-react';

export function WelcomeMessage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-white p-8 text-center">
      <Upload className="w-12 h-12 text-primary mb-4" />
      <h2 className="text-xl font-semibold mb-2">Welcome to SmartStudy!</h2>
      <p className="text-gray-300">
        Hello! I'd love to assist you today. Upload a PDF, and I'll extract key points to help you kickstart your prep!
      </p>
    </div>
  );
}