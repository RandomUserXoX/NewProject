import { type ReactNode } from 'react';
import { TeacherAvatar } from './TeacherAvatar';

interface MessageProps {
  isTeacher?: boolean;
  children: ReactNode;
}

export function Message({ isTeacher = false, children }: MessageProps) {
  return (
    <div className={`flex gap-3 ${isTeacher ? '' : 'flex-row-reverse'}`}>
      {isTeacher && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center">
          <TeacherAvatar />
        </div>
      )}
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        isTeacher 
          ? 'bg-white/10 text-white' 
          : 'bg-primary text-white'
      }`}>
        {children}
      </div>
    </div>
  );
}