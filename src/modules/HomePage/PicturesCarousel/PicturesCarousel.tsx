import clsx from "clsx";
import type { TFunction } from "i18next";
import { useEffect, useRef, useState } from "react";
import Icon from "@/layout/shared/components/Icon";
import { useHorizontalSwipe, useReducedMotion } from "@/modules/shared/hooks";
import type { Slide } from "../slide";
import styles from "./PicturesCarousel.module.scss";
import SlideImage from "./SlideImage";
import { useAutoplay } from "./useAutoplay";

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

const REAL_SLIDE_COUNT = slides.length;

interface CarouselProps {
  t: TFunction;
}

const PicturesCarousel: React.FC<CarouselProps> = ({ t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const withTransition = useRef(false);
  const isSnapping = useRef(false);

  const normalizedIndex = (currentIndex + REAL_SLIDE_COUNT) % REAL_SLIDE_COUNT;

  const isReducedMotion = useReducedMotion();

  const { pausedState, togglePause, pauseForInteraction } = useAutoplay({
    isReducedMotion,
    onTick: () => {
      if (isSnapping.current) return;

      withTransition.current = true;

      setCurrentIndex((prev) => prev + 1);
    },
  });

  //  biome-ignore lint/correctness/useExhaustiveDependencies: this effect unlocks snapping
  useEffect(() => {
    if (isSnapping.current) {
      isSnapping.current = false;
    }
  }, [currentIndex]);

  const handlePrevClick = () => {
    if (withTransition.current || isSnapping.current) {
      return;
    }

    if (isReducedMotion) {
      setCurrentIndex(
        (prev) => (prev - 1 + REAL_SLIDE_COUNT) % REAL_SLIDE_COUNT,
      );
    } else {
      withTransition.current = true;

      setCurrentIndex((prev) => (prev === 0 ? -1 : prev - 1));

      pauseForInteraction();
    }
  };

  const handleNextClick = () => {
    if (withTransition.current || isSnapping.current) {
      return;
    }

    if (isReducedMotion) {
      setCurrentIndex(
        (prev) => (prev + 1 + REAL_SLIDE_COUNT) % REAL_SLIDE_COUNT,
      );
    } else {
      withTransition.current = true;

      setCurrentIndex((prev) =>
        prev === REAL_SLIDE_COUNT - 1 ? REAL_SLIDE_COUNT : prev + 1,
      );

      pauseForInteraction();
    }
  };

  const handleTransitionEnd = () => {
    withTransition.current = false;

    if (currentIndex === -1) {
      isSnapping.current = true;
      setCurrentIndex(REAL_SLIDE_COUNT - 1);
      return;
    }

    if (currentIndex === REAL_SLIDE_COUNT) {
      isSnapping.current = true;
      setCurrentIndex(0);
      return;
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!isReducedMotion && !e.target.matches("[data-pause-button]")) {
      pauseForInteraction();
    }
  };

  useHorizontalSwipe(sliderRef, handlePrevClick, handleNextClick);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: this element handles focus intentionally
    <div className={styles.carousel} onFocus={handleFocus}>
      {/* biome-ignore lint/a11y/useSemanticElements: role=status is correct for slide updates */}
      <span role="status" className="sr-only">
        {t("slideOfTotal", {
          current: normalizedIndex + 1,
          total: REAL_SLIDE_COUNT,
        })}
      </span>

      {!isReducedMotion && (
        <button
          type="button"
          className={styles.carousel__paused}
          onClick={togglePause}
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
      )}

      {/* biome-ignore lint/a11y/useSemanticElements: not a form group */}
      <div role="group" aria-label={t("slideNavLabel")} className={styles.dots}>
        {slides.map((slide: Slide, idx) => (
          <button
            type="button"
            key={slide.id}
            className={styles.dots__dot}
            onClick={() => {
              if (idx !== normalizedIndex) {
                if (!isReducedMotion) {
                  withTransition.current = true;
                }

                setCurrentIndex(idx);
              }
            }}
            aria-label={t("showSlideOfTotal", {
              current: idx + 1,
              total: REAL_SLIDE_COUNT,
            })}
            aria-current={normalizedIndex === idx ? "true" : undefined}
          >
            <span
              className={styles.line}
              style={{
                transition: withTransition.current
                  ? "background-color 0.18s ease-out"
                  : undefined,
              }}
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.carousel__prev}
        onClick={handlePrevClick}
        aria-label={t("prevLabel")}
      >
        <Icon>
          <path d="m15 18-6-6 6-6" />
        </Icon>
      </button>

      <button
        type="button"
        className={styles.carousel__next}
        onClick={handleNextClick}
        aria-label={t("nextLabel")}
      >
        <Icon>
          <path d="m9 18 6-6-6-6" />
        </Icon>
      </button>

      <div
        className={clsx(styles.carousel__wrapper, {
          [styles["carousel__wrapper--transition"]]: withTransition.current,
        })}
        style={{
          transform: `translateX(-${(currentIndex + 1) * 100}%)`,
        }}
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

        {slides.map((slide: Slide, idx) => (
          <div
            key={slide.id}
            className={styles.carousel__slide}
            aria-hidden={normalizedIndex !== idx ? "true" : undefined}
          >
            <h3 className="sr-only">
              {t("pictureOfTotal", {
                current: idx + 1,
                total: REAL_SLIDE_COUNT,
              })}
            </h3>

            <SlideImage
              t={t}
              slide={slide}
              hasAlt={true}
              isPriority={idx === 0}
            />
          </div>
        ))}

        <div className={styles.carousel__slide}>
          <SlideImage slide={slides[0]} hasAlt={false} isPriority={true} />
        </div>
      </div>
    </div>
  );
};

export default PicturesCarousel;
