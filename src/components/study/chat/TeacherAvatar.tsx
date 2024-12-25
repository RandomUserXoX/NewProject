import { type ReactNode } from 'react';

interface TeacherAvatarProps {
  className?: string;
}

export function TeacherAvatar({ className = "w-12 h-12" }: TeacherAvatarProps) {
  return (
    <div className={`${className} rounded-full overflow-hidden flex-shrink-0`}>
      <img 
        src="https://i.imgur.com/p7WUt9N.png?1" 
        alt="Teacher Avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
}