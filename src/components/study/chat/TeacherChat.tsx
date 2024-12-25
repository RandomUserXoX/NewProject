import { useEffect, useRef } from 'react';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { usePrimeMapStore } from '../../../store/primeMapStore';
import { useUploadStore } from '../../../store/uploadStore';
import { useChatStore } from '../../../store/chatStore';
import { Loader } from 'lucide-react';

export function TeacherChat() {
  const { keyPoints, biggerPicture, isLoading: analysisLoading, error } = usePrimeMapStore();
  const { activeDocument } = useUploadStore();
  const { messages, isLoading: chatLoading, sendMessage } = useChatStore();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, keyPoints, biggerPicture]);

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-white">
        <p className="text-destructive">Failed to analyze content: {error}</p>
      </div>
    );
  }

  if (analysisLoading) {
    return (
      <div className="h-full flex items-center justify-center text-white">
        <Loader className="w-6 h-6 animate-spin mr-2" />
        <p>Analyzing content...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!activeDocument ? (
          <Message isTeacher>
            Hello! I'd love to assist you today. Upload a PDF, and I'll extract key points to help you kickstart your prep!
          </Message>
        ) : (
          <>
            <Message isTeacher>
              Hello! I've analyzed your document and I'd love to discuss the key points with you.
              Let's start with the bigger picture.
            </Message>

            {biggerPicture && (
              <Message isTeacher>{biggerPicture}</Message>
            )}

            {keyPoints.map((point, index) => (
              <Message isTeacher key={point.id}>
                <div className="space-y-2">
                  <p className="font-medium">Let's talk about key point {index + 1}:</p>
                  <p className="text-white/90">{point.title}</p>
                  
                  {point.significance && (
                    <p className="text-primary/90 mt-2">
                      Why this matters: {point.significance}
                    </p>
                  )}

                  {point.connections.length > 0 && (
                    <div className="mt-3">
                      <p className="font-medium mb-1">This connects with:</p>
                      <ul className="list-disc list-inside space-y-1 text-white/80">
                        {point.connections.map((connection, i) => (
                          <li key={i}>{connection}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Message>
            ))}

            {messages.map((message) => (
              <Message key={message.id} isTeacher={message.isTeacher}>
                {message.content}
              </Message>
            ))}

            {chatLoading && (
              <Message isTeacher>
                <div className="flex items-center">
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                  Thinking...
                </div>
              </Message>
            )}
          </>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {activeDocument && (
        <ChatInput 
          onSendMessage={sendMessage}
          disabled={analysisLoading || chatLoading}
        />
      )}
    </div>
  );
}