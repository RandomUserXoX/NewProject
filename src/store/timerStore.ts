import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerStore {
  workDuration: number;
  breakDuration: number;
  timeRemaining: number;
  isRunning: boolean;
  isBreak: boolean;
  lastTickTime: number | null;
  setWorkDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      workDuration: 25,
      breakDuration: 5,
      timeRemaining: 25 * 60,
      isRunning: false,
      isBreak: false,
      lastTickTime: null,

      setWorkDuration: (duration) => {
        set({ workDuration: duration });
        if (!get().isRunning && !get().isBreak) {
          set({ timeRemaining: duration * 60 });
        }
      },

      setBreakDuration: (duration) => {
        set({ breakDuration: duration });
        if (!get().isRunning && get().isBreak) {
          set({ timeRemaining: duration * 60 });
        }
      },

      startTimer: () => set({ 
        isRunning: true,
        lastTickTime: Date.now()
      }),
      
      pauseTimer: () => set({ 
        isRunning: false,
        lastTickTime: null
      }),
      
      resetTimer: () => {
        const { workDuration, breakDuration, isBreak } = get();
        set({
          timeRemaining: (isBreak ? breakDuration : workDuration) * 60,
          isRunning: false,
          lastTickTime: null,
        });
      },

      tick: () => {
        const state = get();
        const now = Date.now();
        
        if (!state.lastTickTime) {
          set({ lastTickTime: now });
          return;
        }

        // Calculate elapsed seconds since last tick
        const elapsedSeconds = Math.floor((now - state.lastTickTime) / 1000);
        if (elapsedSeconds === 0) return;

        const newTimeRemaining = Math.max(0, state.timeRemaining - elapsedSeconds);

        if (newTimeRemaining === 0) {
          set({
            isBreak: !state.isBreak,
            timeRemaining: (!state.isBreak ? state.breakDuration : state.workDuration) * 60,
            lastTickTime: now,
          });
        } else {
          set({
            timeRemaining: newTimeRemaining,
            lastTickTime: now,
          });
        }
      },
    }),
    {
      name: 'timer-storage',
      partialize: (state) => ({
        workDuration: state.workDuration,
        breakDuration: state.breakDuration,
        timeRemaining: state.timeRemaining,
        isBreak: state.isBreak,
      }),
    }
  )
);