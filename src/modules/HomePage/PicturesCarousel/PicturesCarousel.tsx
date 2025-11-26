import clsx from "clsx";
import type { TFunction } from "i18next";
import { useEffect, useRef, useState } from "react";
import Icon from "@/layout/shared/components/Icon";
import type { Slide } from "../slide";
import { AUTOPLAY_THRESHOLD } from "./constants";
import styles from "./PicturesCarousel.module.scss";
import SlideImage from "./SlideImage";
import { useHorizontalSwipe } from "./useHorizontalSwipe";

const slides: Slide[] = [
  {
    id: 1,
    src: "/img/iPhone-lg.webp",
    srcMini: "/img/iPhone-sm.webp",
    alt: "iPhoneAlt",
  },
  {
    id: 2,
    src: "/img/apple-devices-lg.webp",
    srcMini: "/img/apple-devices-sm.webp",
    alt: "appleDevicesAlt",
  },
  {
    id: 3,
    src: "/img/apple-watch-lg.webp",
    srcMini: "/img/apple-watch-sm.webp",
    alt: "appleWatchAlt",
  },
];

const TOTAL_SLIDES = slides.length;

interface CarouselProps {
  t: TFunction;
}

const PicturesCarousel: React.FC<CarouselProps> = ({ t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pausedState, setPausedState] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const isManuallyPaused = useRef(false);
  const isTransitioning = useRef(false);
  const isSnapping = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const normalizedIndex = (currentIndex + TOTAL_SLIDES) % TOTAL_SLIDES;

  const moveSlide = (index: number, withTransition: boolean) => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    if (withTransition) {
      slider.classList.remove(styles["carousel__wrapper--no-transition"]);
    } else {
      slider.classList.add(styles["carousel__wrapper--no-transition"]);
    }

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
      setCurrentIndex((prev) => prev + 1);
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

    if (!isPaused.current) {
      isManuallyPaused.current = true;
      updatePause(true);
    }
  };

  const handleNextSlideShow = () => handleSelectedSlideShow((prev) => prev + 1);
  const handlePrevSlideShow = () => handleSelectedSlideShow((prev) => prev - 1);

  const handleTransitionEnd = () => {
    if (currentIndex < 0) {
      const newIndex = TOTAL_SLIDES - 1;
      isSnapping.current = true;
      setCurrentIndex(newIndex);
      return;
    }

    if (currentIndex >= TOTAL_SLIDES) {
      const newIndex = 0;
      isSnapping.current = true;
      setCurrentIndex(newIndex);
      return;
    }

    isTransitioning.current = false;
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!isPaused.current && !e.target.matches("[data-pause-button]")) {
      isManuallyPaused.current = true;
      updatePause(true);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: this effect runs moveSlide on currentIndex change
  useEffect(() => {
    const withTransition = !isSnapping.current;
    moveSlide(currentIndex, withTransition);

    if (isSnapping.current) {
      isSnapping.current = false;
      isTransitioning.current = false;
    }
  }, [currentIndex]);

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

  useHorizontalSwipe(sliderRef, handleNextSlideShow, handlePrevSlideShow);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: this element handles focus intentionally
    <div className={styles.carousel} onFocus={handleFocus}>
      {/* biome-ignore lint/a11y/useSemanticElements: role=status is correct for slide updates */}
      <span role="status" className="sr-only">
        {t("slideOfTotal", {
          current: normalizedIndex + 1,
          total: TOTAL_SLIDES,
        })}
      </span>

      <button
        type="button"
        className={styles.carousel__paused}
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
          <Icon stroke="#f1f2f9" width="24" height="24">
            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
          </Icon>
        ) : (
          <Icon stroke="#f1f2f9" width="24" height="24">
            <rect width="5" height="18" x="14" y="3" rx="1" />
            <rect width="5" height="18" x="5" y="3" rx="1" />
          </Icon>
        )}
      </button>

      {/* biome-ignore lint/a11y/useSemanticElements: not a form group */}
      <div role="group" aria-label={t("slideNavLabel")} className={styles.dots}>
        {slides.map((slide: Slide, i) => (
          <button
            type="button"
            key={slide.id}
            className={clsx(styles.dots__dot, {
              [styles.active]: normalizedIndex === i,
            })}
            onClick={() => handleSelectedSlideShow(i)}
            aria-label={t("showSlideOfTotal", {
              current: i + 1,
              total: TOTAL_SLIDES,
            })}
            aria-current={normalizedIndex === i ? "true" : undefined}
          >
            <span className={styles.line} />
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.carousel__prev}
        onClick={handlePrevSlideShow}
        aria-label={t("prevLabel")}
      >
        <Icon>
          <path d="m15 18-6-6 6-6" />
        </Icon>
      </button>

      <button
        type="button"
        className={styles.carousel__next}
        onClick={handleNextSlideShow}
        aria-label={t("nextLabel")}
      >
        <Icon>
          <path d="m9 18 6-6-6-6" />
        </Icon>
      </button>

      <div
        className={styles.carousel__wrapper}
        ref={sliderRef}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className={styles.carousel__slide}>
          <SlideImage
            slide={slides[slides.length - 1]}
            hasAlt={false}
            isPriority={false}
          />
        </div>

        {slides.map((slide: Slide, i) => (
          <div
            key={slide.id}
            className={styles.carousel__slide}
            aria-hidden={normalizedIndex !== i ? "true" : undefined}
          >
            <h3 className="sr-only">
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

        <div className={styles.carousel__slide}>
          <SlideImage slide={slides[0]} hasAlt={false} isPriority={false} />
        </div>
      </div>
    </div>
  );
};

export default PicturesCarousel;
