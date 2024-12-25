import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileUpload } from '../components/upload/FileUpload';
import { TeacherChat } from '../components/study/chat/TeacherChat';
import { PomodoroTimer } from '../components/study/PomodoroTimer';
import { useUploadStore } from '../store/uploadStore';
import { usePrimeMapStore } from '../store/primeMapStore';

export function StudyPage() {
  const [searchParams] = useSearchParams();
  const feature = searchParams.get('feature');
  const { activeDocument } = useUploadStore();
  const { generatePrimeMap, cleanup } = usePrimeMapStore();

  useEffect(() => {
    if (activeDocument?.content && feature === 'prime') {
      generatePrimeMap(activeDocument.content);
    }
    
    return () => cleanup();
  }, [activeDocument?.content, generatePrimeMap, cleanup, feature]);

  return (
    <div className="min-h-screen static-gradient-bg pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white">
            {feature === 'prime' ? 'Interactive Study Session' : 'Focus Timer'}
          </h1>
          <p className="mt-2 text-gray-300">
            {feature === 'prime' 
              ? 'Upload your study material to start an interactive learning session'
              : 'Use the Pomodoro timer to maintain focus and take structured breaks'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {feature === 'prime' ? (
            <>
              <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6">
                <FileUpload />
              </div>
              <div className="bg-secondary/50 backdrop-blur-sm rounded-lg h-[600px] flex flex-col">
                <TeacherChat />
              </div>
            </>
          ) : (
            <div className="md:col-span-2">
              <PomodoroTimer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}