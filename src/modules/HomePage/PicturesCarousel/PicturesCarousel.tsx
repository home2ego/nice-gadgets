import clsx from "clsx";
import type { TFunction } from "i18next";
import { useEffect, useRef, useState } from "react";
import Icon from "@/layout/shared/components/Icon";
import { useHorizontalSwipe, useReducedMotion } from "@/modules/shared/hooks";
import type { SlideImage } from "../slideImage";
import styles from "./PicturesCarousel.module.scss";
import { useAutoplay } from "./useAutoplay";

const images: SlideImage[] = [
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

const IMAGES_COUNT = images.length;

interface CarouselProps {
  t: TFunction;
}

const PicturesCarousel: React.FC<CarouselProps> = ({ t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const withTransition = useRef(false);

  const clonedImages = [images[images.length - 1], ...images, images[0]];
  const normalizedIndex = (currentIndex + IMAGES_COUNT) % IMAGES_COUNT;

  const isReducedMotion = useReducedMotion();

  const { pausedState, togglePause, pauseForInteraction } = useAutoplay({
    isReducedMotion,
    onTick: () => {
      withTransition.current = true;

      setCurrentIndex((prev) => prev + 1);
    },
  });

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 440px)").matches;

    const imagesToPreload = images.slice(1);

    imagesToPreload.forEach((img) => {
      const source = isMobile ? img.srcMini : img.src;
      const image = new Image();
      image.src = source;
      image.decode();
    });
  }, []);

  const handlePrevClick = () => {
    if (withTransition.current) {
      return;
    }

    if (isReducedMotion) {
      setCurrentIndex((prev) => (prev - 1 + IMAGES_COUNT) % IMAGES_COUNT);
    } else {
      withTransition.current = true;

      setCurrentIndex((prev) => (prev === 0 ? -1 : prev - 1));

      pauseForInteraction();
    }
  };

  const handleNextClick = () => {
    if (withTransition.current) {
      return;
    }

    if (isReducedMotion) {
      setCurrentIndex((prev) => (prev + 1 + IMAGES_COUNT) % IMAGES_COUNT);
    } else {
      withTransition.current = true;

      setCurrentIndex((prev) =>
        prev === IMAGES_COUNT - 1 ? IMAGES_COUNT : prev + 1,
      );

      pauseForInteraction();
    }
  };

  const handleTransitionEnd = () => {
    withTransition.current = false;

    if (currentIndex === -1) {
      setCurrentIndex(IMAGES_COUNT - 1);
      return;
    }

    if (currentIndex === IMAGES_COUNT) {
      setCurrentIndex(0);
      return;
    }
  };

  const handleDotClick = (idx: number) => {
    if (idx !== normalizedIndex) {
      if (!isReducedMotion) {
        withTransition.current = true;
      }

      setCurrentIndex(idx);
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
        {t("imageOfTotal", {
          current: normalizedIndex + 1,
          total: IMAGES_COUNT,
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

      <div
        role="radiogroup"
        aria-label={t("imageNavLabel")}
        className={styles.dots}
      >
        {images.map((image: SlideImage, idx) => (
          // biome-ignore lint/a11y/useSemanticElements: custom radio control with dots
          <button
            role="radio"
            aria-checked={normalizedIndex === idx}
            key={image.id}
            type="button"
            className={styles.dots__dot}
            onClick={() => handleDotClick(idx)}
            aria-label={t("showImageOfTotal", {
              current: idx + 1,
              total: IMAGES_COUNT,
            })}
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
        aria-label={t("prevImageLabel")}
      >
        <Icon>
          <path d="m15 18-6-6 6-6" />
        </Icon>
      </button>

      <button
        type="button"
        className={styles.carousel__next}
        onClick={handleNextClick}
        aria-label={t("nextImageLabel")}
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
        {clonedImages.map((image: SlideImage, idx) => {
          const hasAlt = idx !== 0 && idx !== clonedImages.length - 1;
          const hasHighPriority = idx === 1 || idx === clonedImages.length - 1;

          return (
            <picture
              // biome-ignore lint/suspicious/noArrayIndexKey: Safe to use index as key here
              key={idx}
              aria-hidden={normalizedIndex + 1 !== idx ? "true" : undefined}
            >
              <source
                media="(max-width: 440px)"
                type="image/webp"
                srcSet={image.srcMini}
              />

              <img
                className={styles.carousel__image}
                src={image.src}
                width="600"
                height="400"
                alt={
                  hasAlt
                    ? t(image.alt, {
                        current: idx,
                        total: IMAGES_COUNT,
                      })
                    : ""
                }
                fetchPriority={hasHighPriority ? "high" : "low"}
                decoding={hasHighPriority ? "sync" : "async"}
              />
            </picture>
          );
        })}
      </div>
    </div>
  );
};

export default PicturesCarousel;
