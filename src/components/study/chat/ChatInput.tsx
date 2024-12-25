import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../../ui/button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question about the content..."
          className="flex-1 bg-white/10 border-white/20 rounded-md px-4 py-2 text-white placeholder-gray-400
            focus:border-primary focus:ring focus:ring-primary/20"
          disabled={disabled}
        />
        <Button 
          type="submit" 
          disabled={disabled || !message.trim()}
          className="bg-primary hover:bg-primary/90"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}