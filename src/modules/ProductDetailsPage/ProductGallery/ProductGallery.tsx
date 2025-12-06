import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Icon from "@/layout/shared/components/Icon";
import { useHorizontalSwipe } from "@/modules/shared/hooks";
import type { ProductDetails } from "../productDetails";
import styles from "./ProductGallery.module.scss";

interface ProductGalleryProps {
  product: ProductDetails;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const { images } = product;

  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const withTransition = useRef(false);
  const isSnapping = useRef(false);

  const clonedImages = [images[images.length - 1], ...images, images[0]];
  const normalizedIndex = (currentIndex + images.length) % images.length;

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

    withTransition.current = true;
    setCurrentIndex((prev) => (prev === 0 ? -1 : prev - 1));
  };

  const handleNextClick = () => {
    if (withTransition.current || isSnapping.current) {
      return;
    }

    withTransition.current = true;
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? images.length : prev + 1,
    );
  };

  const handleTransitionEnd = () => {
    withTransition.current = false;

    if (currentIndex === -1) {
      isSnapping.current = true;
      setCurrentIndex(images.length - 1);
      return;
    }

    if (currentIndex === images.length) {
      isSnapping.current = true;
      setCurrentIndex(0);
      return;
    }
  };

  useHorizontalSwipe(sliderRef, handlePrevClick, handleNextClick);

  return (
    <>
      <div className={styles.carousel}>
        <button
          type="button"
          className={styles.carousel__prev}
          onClick={handlePrevClick}
        >
          <Icon width="24" height="24">
            <path d="m15 18-6-6 6-6" />
          </Icon>
        </button>

        <button
          type="button"
          className={styles.carousel__next}
          onClick={handleNextClick}
        >
          <Icon width="24" height="24">
            <path d="m9 18 6-6-6-6" />
          </Icon>
        </button>

        <div
          className={clsx(styles.carousel__wrapper, {
            [styles["carousel__wrapper--transition"]]: withTransition.current,
          })}
          style={{
            gridTemplateColumns: `repeat(${clonedImages.length}, 100%)`,
            transform: `translateX(-${(currentIndex + 1) * 100}%)`,
          }}
          ref={sliderRef}
          onTransitionEnd={handleTransitionEnd}
        >
          {clonedImages.map((img, idx) => (
            <img
              // biome-ignore lint/suspicious/noArrayIndexKey: Safe to use index as key here
              key={idx}
              className={styles.carousel__image}
              src={img}
              alt=""
              width="464"
              height="464"
            />
          ))}
        </div>
      </div>

      {/* biome-ignore lint/a11y/useSemanticElements: not a form group */}
      <div
        role="group"
        aria-label="Product thumbnails"
        className={styles.thumbnails}
      >
        {images.map((img, idx) => (
          <button
            key={img}
            type="button"
            className={styles.thumbnail}
            style={{
              transition: withTransition.current
                ? "border-color 0.18s ease-out"
                : undefined,
            }}
            onClick={() => idx !== normalizedIndex && setCurrentIndex(idx)}
            aria-current={normalizedIndex === idx ? "true" : undefined}
          >
            <img
              className={styles.thumbnail__image}
              src={img}
              alt=""
              width="80"
              height="80"
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default ProductGallery;
