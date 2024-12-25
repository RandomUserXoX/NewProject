import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface ContentEditorProps {
  content: string;
  title: string;
  onContentChange: (content: string) => void;
  onTitleChange: (title: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

export function ContentEditor({
  content,
  title,
  onContentChange,
  onTitleChange,
  onSubmit,
  onClear,
}: ContentEditorProps) {
  return (
    <div className="mt-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white placeholder-gray-400
            focus:border-primary focus:ring focus:ring-primary/20"
          placeholder="Enter document title"
        />
      </div>
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-64 p-4 rounded-md bg-white/10 border-white/20 text-white placeholder-gray-400
            focus:border-primary focus:ring focus:ring-primary/20"
          placeholder="Or paste your content here..."
        />
        <button
          onClick={onClear}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white/90"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <Button onClick={onSubmit} className="mt-4 w-full">
        Process Content
      </Button>
    </div>
  );
}