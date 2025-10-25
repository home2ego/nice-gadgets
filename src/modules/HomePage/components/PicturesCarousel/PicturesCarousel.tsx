// PRELOAD ONE OF THE IMAGES IF ONE OF THEM IS LCP
import clsx from "clsx";
import type { TFunction } from "i18next";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import appleDevicesImage from "../../../../assets/images/apple-devices-lg.webp";
import appleDevicesImageMini from "../../../../assets/images/apple-devices-sm.webp";
import appleWatchImage from "../../../../assets/images/apple-watch-lg.webp";
import appleWatchImageMini from "../../../../assets/images/apple-watch-sm.webp";
import iPhoneImage from "../../../../assets/images/iPhone-lg.webp";
import iPhoneImageMini from "../../../../assets/images/iPhone-sm.webp";
import SkipLink from "../../../shared/components/SkipLink";
import type { Slide } from "../../types/slide";
import { AUTOPLAY_THRESHOLD } from "./constants";
import styles from "./PicturesCarousel.module.scss";
import SlideImage from "./SlideImage";
import { useHorizontalSwipe } from "./useHorizontalSwipe";

const slides: Slide[] = [
  {
    id: 1,
    src: iPhoneImage,
    srcMini: iPhoneImageMini,
    alt: "iPhoneAlt",
  },
  {
    id: 2,
    src: appleDevicesImage,
    srcMini: appleDevicesImageMini,
    alt: "appleDevicesAlt",
  },
  {
    id: 3,
    src: appleWatchImage,
    srcMini: appleWatchImageMini,
    alt: "appleWatchAlt",
  },
];

const TOTAL_SLIDES = slides.length;

interface CarouselProps {
  t: TFunction;
  skipForwardRef: React.RefObject<HTMLElement | null>;
  skipBackRef: React.RefObject<HTMLElement | null>;
}

const PicturesCarousel: React.FC<CarouselProps> = ({
  t,
  skipForwardRef,
  skipBackRef,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pausedState, setPausedState] = useState(false);
  const isPaused = useRef(false);
  const isManuallyPaused = useRef(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const normalizedIndex = (currentIndex + TOTAL_SLIDES) % TOTAL_SLIDES;

  const updateSliderTransform = (index: number, transition: boolean) => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    requestAnimationFrame(() => {
      const transitionValue = transition
        ? "transform 0.36s cubic-bezier(0.445, 0.05, 0.55, 0.95)"
        : "none";

      slider.style.cssText = `
        transition: ${transitionValue};
        transform: translateX(-${(index + 1) * 100}%);
      `;
    });
  };

  const stopAutoplay = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;

        updateSliderTransform(nextIndex, true);

        return nextIndex;
      });
    }, AUTOPLAY_THRESHOLD);
  };

  const updatePause = (paused: boolean) => {
    isPaused.current = paused;
    setPausedState(paused);

    if (paused) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  };

  const handleSelectedSlideShow = (
    index: number | ((prev: number) => number),
  ) => {
    if (isTransitioning.current) {
      return;
    }

    const nextIndex = typeof index === "function" ? index(currentIndex) : index;

    if (nextIndex === currentIndex) {
      return;
    }

    isTransitioning.current = true;
    setCurrentIndex(nextIndex);
    updateSliderTransform(nextIndex, true);

    if (!isPaused.current) {
      isManuallyPaused.current = true;
      updatePause(true);
    }
  };

  const handleNextSlideShow = () => handleSelectedSlideShow((prev) => prev + 1);
  const handlePrevSlideShow = () => handleSelectedSlideShow((prev) => prev - 1);

  const handleTransitionEnd = () => {
    let newIndex: number;

    if (currentIndex < 0) {
      newIndex = TOTAL_SLIDES - 1;
      requestAnimationFrame(() => {
        setCurrentIndex(newIndex);
        updateSliderTransform(newIndex, false);
      });
    }

    if (currentIndex >= TOTAL_SLIDES) {
      newIndex = 0;
      requestAnimationFrame(() => {
        setCurrentIndex(newIndex);
        updateSliderTransform(newIndex, false);
      });
    }

    isTransitioning.current = false;
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!isPaused.current && !e.target.matches("[data-pause-button]")) {
      isManuallyPaused.current = true;
      updatePause(true);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: this effect runs once on mount
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isPaused.current) {
        return;
      }

      return document.hidden ? stopAutoplay() : startAutoplay();
    };

    startAutoplay();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAutoplay();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: this effect tracks global pause/resume events
  useEffect(() => {
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
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: this effect runs once on mount before painting the screen
  useLayoutEffect(() => {
    updateSliderTransform(currentIndex, false);
  }, []);

  useHorizontalSwipe(sliderRef, handleNextSlideShow, handlePrevSlideShow);

  return (
    <section aria-label={t("picturesCarousel")} className={styles.slider}>
      <SkipLink
        content="skipForwardCarousel"
        classAttr="skip-forward-slider"
        elementRef={skipForwardRef}
      />

      {/* biome-ignore lint/a11y/useSemanticElements: not a form group */}
      <div
        role="group"
        className={styles.slider__content}
        onFocus={handleFocus}
      >
        <button
          type="button"
          className={styles.paused}
          onClick={() => {
            const paused = !isPaused.current;
            isManuallyPaused.current = paused;
            updatePause(paused);
          }}
          aria-pressed={pausedState ? "true" : "false"}
          aria-label={pausedState ? t("resumeLabel") : t("pauseLabel")}
          data-pause-button=""
        >
          {pausedState ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="#f1f2f9"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="#f1f2f9"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect width="5" height="18" x="14" y="3" rx="1" />
              <rect width="5" height="18" x="5" y="3" rx="1" />
            </svg>
          )}
        </button>

        <fieldset className={styles.dots}>
          <legend className="sr-only">{t("slideNavLabel")}</legend>

          {slides.map((slide: Slide, i) => (
            <button
              type="button"
              key={slide.id}
              className={clsx(styles.dots__dot, {
                [styles.active]: normalizedIndex === i,
              })}
              onClick={() => handleSelectedSlideShow(i)}
              aria-label={t("slideOfTotal", {
                current: i + 1,
                total: TOTAL_SLIDES,
              })}
              aria-current={normalizedIndex === i ? "true" : undefined}
            >
              <span />
            </button>
          ))}
        </fieldset>

        <button
          type="button"
          className={styles.prev}
          onClick={handlePrevSlideShow}
          aria-label={t("prevLabel")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="var(--text-color-primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          className={styles.next}
          onClick={handleNextSlideShow}
          aria-label={t("nextLabel")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="var(--text-color-primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <div
          className={styles["slider__slide-wrapper"]}
          ref={sliderRef}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className={styles.slider__slide}>
            <SlideImage
              slide={slides[slides.length - 1]}
              hasAlt={false}
              isPriority={false}
            />
          </div>

          {slides.map((slide: Slide, i) => (
            // biome-ignore lint/a11y/useSemanticElements: not a form group
            <div
              key={slide.id}
              className={styles.slider__slide}
              role="group"
              aria-labelledby={`slide-${slide.id}`}
              aria-hidden={normalizedIndex !== i ? "true" : undefined}
            >
              <h3 id={`slide-${slide.id}`} className="sr-only">
                {t("pictureOfTotal", { current: i + 1, total: TOTAL_SLIDES })}
              </h3>
              <SlideImage
                t={t}
                slide={slide}
                hasAlt={true}
                isPriority={i === 0}
              />
            </div>
          ))}

          <div className={styles.slider__slide}>
            <SlideImage slide={slides[0]} hasAlt={false} isPriority={false} />
          </div>
        </div>
      </div>

      <SkipLink
        content="skipBackCarousel"
        classAttr="skip-back-slider"
        mainRef={skipBackRef}
      />
    </section>
  );
};

export default memo(PicturesCarousel);
