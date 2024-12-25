import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useTimerStore } from '../../store/timerStore';

export function PomodoroTimer() {
  const {
    timeRemaining,
    isRunning,
    isBreak,
    workDuration,
    breakDuration,
    startTimer,
    pauseTimer,
    resetTimer,
    setWorkDuration,
    setBreakDuration,
  } = useTimerStore();

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 border-white/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center text-white">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-6xl font-bold mb-8 text-white">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <Button
              variant={isRunning ? 'outline' : 'default'}
              onClick={isRunning ? pauseTimer : startTimer}
              className="bg-white/10 border-white/20 hover:bg-white/20"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button 
              variant="outline" 
              onClick={resetTimer}
              className="bg-white/10 border-white/20 hover:bg-white/20"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Work Duration (min)
              </label>
              <input
                type="number"
                value={workDuration}
                onChange={(e) => setWorkDuration(Number(e.target.value))}
                className="w-full p-2 rounded bg-white/10 border-white/20 text-white
                  focus:border-primary focus:ring focus:ring-primary/20"
                min="1"
                max="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Break Duration (min)
              </label>
              <input
                type="number"
                value={breakDuration}
                onChange={(e) => setBreakDuration(Number(e.target.value))}
                className="w-full p-2 rounded bg-white/10 border-white/20 text-white
                  focus:border-primary focus:ring focus:ring-primary/20"
                min="1"
                max="30"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}