import { useEffect, useRef, useState } from "react";
import { AUTOPLAY_THRESHOLD } from "../constants";

interface UseAutoplayOptions {
  isReducedMotion: boolean;
  onTick: () => void;
}

export function useAutoplay({ isReducedMotion, onTick }: UseAutoplayOptions) {
  const [pausedState, setPausedState] = useState(isReducedMotion);
  const isPaused = useRef(isReducedMotion);
  const isManuallyPaused = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoplay = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoplay = () => {
    if (isReducedMotion) return;

    stopAutoplay();

    intervalRef.current = setInterval(() => onTick(), AUTOPLAY_THRESHOLD);
  };

  const updatePause = (paused: boolean) => {
    if (isReducedMotion) return;

    isPaused.current = paused;
    setPausedState(paused);

    if (paused) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: this effect runs once on mount
  useEffect(() => {
    if (isReducedMotion) return;

    const handleVisibilityChange = () => {
      if (isPaused.current) {
        return;
      }

      return document.hidden ? stopAutoplay() : startAutoplay();
    };

    if (!isPaused.current) {
      startAutoplay();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAutoplay();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isReducedMotion]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: this effect tracks global pause/resume events
  useEffect(() => {
    if (isReducedMotion) return;

    const pause = () => {
      if (!isPaused.current) {
        updatePause(true);
      }
    };

    const resume = () => {
      if (isPaused.current && !isManuallyPaused.current) {
        updatePause(false);
      }
    };

    document.addEventListener("pause-slider", pause);
    document.addEventListener("resume-slider", resume);

    return () => {
      document.removeEventListener("pause-slider", pause);
      document.removeEventListener("resume-slider", resume);
    };
  }, [isReducedMotion]);

  const togglePause = () => {
    if (isReducedMotion) return;

    const paused = !isPaused.current;
    isManuallyPaused.current = paused;
    updatePause(paused);
  };

  const pauseForInteraction = () => {
    if (isReducedMotion) return;

    if (!isPaused.current) {
      isManuallyPaused.current = true;
      updatePause(true);
    }
  };

  return {
    pausedState,
    togglePause,
    pauseForInteraction,
  };
}
