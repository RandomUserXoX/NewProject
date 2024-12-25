import { useEffect } from 'react';
import { useTimerStore } from '../../store/timerStore';

export function GlobalTimer() {
  const { isRunning, tick } = useTimerStore();

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = window.setInterval(tick, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  return null;
}