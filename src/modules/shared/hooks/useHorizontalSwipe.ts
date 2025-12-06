import { useCallback, useEffect, useRef } from "react";

const SWIPE_THRESHOLD = 20;

export function useHorizontalSwipe(
  sliderRef: React.RefObject<HTMLDivElement | null>,
  onPrev: () => void,
  onNext: () => void,
) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const prevRef = useRef(onPrev);
  const nextRef = useRef(onNext);

  useEffect(() => {
    prevRef.current = onPrev;
    nextRef.current = onNext;
  }, [onPrev, onNext]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: sliderRef is a stable ref
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: sliderRef is a stable ref
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
