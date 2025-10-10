import { useState, useRef, useLayoutEffect, useEffect } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import iPhoneImage from "../../../../assets/images/iPhone-lg.webp";
import appleDevicesImage from "../../../../assets/images/apple-devices-lg.webp";
import appleWatchImage from "../../../../assets/images/apple-watch-lg.webp";
import iPhoneImageMini from "../../../../assets/images/iPhone-sm.webp";
import appleDevicesImageMini from "../../../../assets/images/apple-devices-sm.webp";
import appleWatchImageMini from "../../../../assets/images/apple-watch-sm.webp";
import { AUTOPLAY_THRESHOLD } from "./constants";
import { useHorizontalSwipe } from "./useHorizontalSwipe";
import SkipLink from "../../../../components/shared/components/SkipLink";
import styles from "./PicturesSlider.module.scss";

interface Slide {
  id: number;
  src: string;
  srcMini: string;
  alt: string;
  priority: "high" | "low";
}

const slides: Slide[] = [
  {
    id: 1,
    src: iPhoneImage,
    srcMini: iPhoneImageMini,
    alt: "iPhoneAlt",
    priority: "high",
  },
  {
    id: 2,
    src: appleDevicesImage,
    srcMini: appleDevicesImageMini,
    alt: "appleDevicesAlt",
    priority: "low",
  },
  {
    id: 3,
    src: appleWatchImage,
    srcMini: appleWatchImageMini,
    alt: "appleWatchAlt",
    priority: "low",
  },
];

const TOTAL_SLIDES = slides.length;

interface SliderProps {
  skipForwardRef: React.RefObject<HTMLElement | null>;
  skipBackRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

// PRELOAD ONE OF THESE IMAGES IF ONE OF THEM IS LCP

const PicturesSlider: React.FC<SliderProps> = ({
  skipForwardRef,
  skipBackRef,
  children,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { t } = useTranslation("homePage");

  const normalizedIndex = (currentIndex + TOTAL_SLIDES) % TOTAL_SLIDES;

  const updateSliderTransform = (index: number, transition: boolean) => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    slider.style.transition = transition
      ? "transform 0.36s cubic-bezier(0.445, 0.05, 0.55, 0.95)"
      : "none";
    slider.style.transform = `translateX(-${(index + 1) * 100}%)`;
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
    isPausedRef.current = paused;
    setIsPaused(paused);

    if (paused) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  };

  const handleSelectedSlideShow = (
    index: number | ((prev: number) => number)
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

    if (!isPausedRef.current) {
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
    if (!isPausedRef.current && !e.target.matches("[data-pause-button]")) {
      updatePause(true);
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isPausedRef.current) {
        return document.hidden ? stopAutoplay() : startAutoplay();
      }
    };

    startAutoplay();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAutoplay();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useLayoutEffect(() => {
    updateSliderTransform(currentIndex, false);
  }, []);

  useHorizontalSwipe(sliderRef, handleNextSlideShow, handlePrevSlideShow);

  return (
    <section>
      {children}

      <div
        role="region"
        aria-roledescription="slider"
        aria-label={t("picturesSlider")}
        className={styles.slider}
        onFocus={handleFocus}
      >
        <SkipLink
          content="skipForwardSlider"
          classAttr="skip-forward-slider"
          elementRef={skipForwardRef}
        />

        <div className={styles.slider__content}>
          <button
            className={styles.paused}
            onClick={() => updatePause(!isPausedRef.current)}
            aria-pressed={isPaused}
            aria-label={isPaused ? t("resumeAriaLabel") : t("pauseAriaLabel")}
            data-pause-button
          >
            {isPaused ? (
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

          <div
            className={styles.dots}
            role="group"
            aria-label={t("navigationAriaLabel")}
          >
            {slides.map((_, i) => (
              <button
                key={i}
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
          </div>

          <button
            className={styles.prev}
            onClick={handlePrevSlideShow}
            aria-label={t("prevAriaLabel")}
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
            className={styles.next}
            onClick={handleNextSlideShow}
            aria-label={t("nextAriaLabel")}
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
              <img
                src={slides[slides.length - 1].src}
                srcSet={`${slides[slides.length - 1].srcMini} 640w, ${
                  slides[slides.length - 1].src
                } 1920w`}
                sizes="(max-width: 591px) 100vw, 100%"
                width="684"
                height="400"
                alt=""
                fetchPriority="low"
              />
            </div>

            {slides.map((slide: Slide, i) => (
              <div
                key={slide.id}
                className={styles.slider__slide}
                role="group"
                aria-roledescription="slide"
                aria-labelledby={`slide-${slide.id}`}
                aria-hidden={normalizedIndex !== i}
              >
                <h3 id={`slide-${slide.id}`} className="sr-only">
                  {t("pictureOfTotal", { current: i + 1, total: TOTAL_SLIDES })}
                </h3>
                <img
                  src={slide.src}
                  srcSet={`${slide.srcMini} 640w, ${slide.src} 1920w`}
                  sizes="(max-width: 591px) 100vw, 100%"
                  width="684"
                  height="400"
                  alt={t(slide.alt)}
                  fetchPriority={slide.priority}
                />
              </div>
            ))}

            <div className={styles.slider__slide}>
              <img
                src={slides[0].src}
                srcSet={`${slides[0].srcMini} 640w, ${slides[0].src} 1920w`}
                sizes="(max-width: 591px) 100vw, 100%"
                width="684"
                height="400"
                alt=""
                fetchPriority="low"
              />
            </div>
          </div>
        </div>

        <SkipLink
          content="skipBackSlider"
          classAttr="skip-back-slider"
          mainRef={skipBackRef}
        />
      </div>
    </section>
  );
};

export default PicturesSlider;
