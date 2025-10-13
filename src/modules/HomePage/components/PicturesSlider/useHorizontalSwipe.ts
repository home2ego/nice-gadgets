import { useCallback, useEffect, useRef } from "react";
import { SWIPE_THRESHOLD } from "./constants";

export function useHorizontalSwipe(
  sliderRef: React.RefObject<HTMLDivElement | null>,
  onNext: () => void,
  onPrev: () => void,
) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const nextRef = useRef(onNext);
  const prevRef = useRef(onPrev);

  useEffect(() => {
    nextRef.current = onNext;
    prevRef.current = onPrev;
  }, [onNext, onPrev]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  // biome-ignore lint: correctness/useExhaustiveDependencies — sliderRef is a stable ref
  const handleTouchMove = useCallback((e: TouchEvent) => {
    const slider = sliderRef.current;

    if (!slider?.contains(e.target as Node)) {
      return;
    }

    const dx = touchStartX.current - e.touches[0].clientX;
    const dy = touchStartY.current - e.touches[0].clientY;

    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        nextRef.current();
      } else {
        prevRef.current();
      }
    }
  }, []);

  // biome-ignore lint: correctness/useExhaustiveDependencies — sliderRef is a stable ref
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    slider.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    slider.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);
}
