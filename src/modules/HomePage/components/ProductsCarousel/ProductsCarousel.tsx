import clsx from "clsx";
import type { TFunction } from "i18next";
import { memo, useEffect, useId, useMemo, useRef, useState } from "react";
import SkipLink from "../../../shared/components/SkipLink";
import type { Product } from "../../types/product";
import { formatPrice } from "./format-price";
import styles from "./ProductsCarousel.module.scss";

interface CarouselProps {
  t: TFunction;
  normalizedLang: string;
  products: Product[];
  children: React.ReactNode;
  skipForwardRef: React.RefObject<HTMLElement | null>;
  skipBackRef: React.RefObject<HTMLElement | null>;
  hasOnlyFullPrice: boolean;
  isLazy: boolean;
}

const ProductsCarousel: React.FC<CarouselProps> = ({
  t,
  normalizedLang,
  products,
  children,
  skipForwardRef,
  skipBackRef,
  hasOnlyFullPrice,
  isLazy,
}) => {
  const [disabledPrev, setDisabledPrev] = useState(true);
  const [disabledNext, setDisabledNext] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastVisibleCard = useRef<HTMLElement | null>(null);
  const firstVisibleCard = useRef<HTMLElement | null>(null);

  const ariaId = useId();

  useEffect(() => {
    const cards = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>("article") ?? [],
    );

    if (!cards.length) {
      return;
    }

    const visibleCards = new Set();

    const cbObserver = (entries: IntersectionObserverEntry[]) => {
      let changed = false;

      for (const entry of entries) {
        if (entry.isIntersecting) {
          visibleCards.add(entry.target);
        } else {
          visibleCards.delete(entry.target);
        }
      }

      const visibleCardsArr = cards.filter((card) => visibleCards.has(card));
      const newFirst = visibleCardsArr[0];
      const newLast = visibleCardsArr[visibleCardsArr.length - 1];

      if (firstVisibleCard.current !== newFirst && newFirst !== undefined) {
        firstVisibleCard.current = newFirst;
        changed = true;
      }

      if (lastVisibleCard.current !== newLast && newLast !== undefined) {
        lastVisibleCard.current = newLast;
        changed = true;
      }

      if (changed) {
        setDisabledPrev(firstVisibleCard.current === cards[0]);
        setDisabledNext(lastVisibleCard.current === cards[cards.length - 1]);
      }
    };

    const observer = new IntersectionObserver(cbObserver, {
      root: containerRef.current,
      threshold: 0.99,
    });

    for (const card of cards) {
      observer.observe(card);
    }

    return () => observer.disconnect();
  }, []);

  const handleNextClick = () => {
    firstVisibleCard.current?.nextElementSibling?.scrollIntoView({
      inline: "start",
      block: "nearest",
    });
  };

  const handlePrevClick = () => {
    lastVisibleCard.current?.previousElementSibling?.scrollIntoView({
      inline: "end",
      block: "nearest",
    });
  };

  const handleCardFocus = (e: React.FocusEvent<HTMLAnchorElement>) => {
    e.currentTarget.scrollIntoView({ inline: "nearest", block: "nearest" });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: this useMemo re-computes only when the language changes
  const productCards = useMemo(() => {
    return products.map((product, index) => (
      <article
        key={product.id}
        aria-label={t("productOfTotal", {
          current: index + 1,
          total: products.length,
        })}
      >
        <a
          href="/"
          aria-label={t("productDetailsLabel", { product: product.name })}
          className={styles.product}
          onFocus={handleCardFocus}
        >
          <img
            src={product.image}
            alt=""
            width="208"
            height="196"
            loading={isLazy ? "lazy" : "eager"}
            decoding="async"
          />

          <h3 className="text--body">{product.name}</h3>

          <div className={clsx(styles.product__prices, "title--sm")}>
            {hasOnlyFullPrice ? (
              <p>{formatPrice(product.fullPrice, normalizedLang)}</p>
            ) : (
              <>
                <p>
                  {formatPrice(product.price, normalizedLang)}
                  <span className="sr-only">{t("priceLabel")}</span>
                </p>

                <p className={styles["product__full-price"]}>
                  {formatPrice(product.fullPrice, normalizedLang)}
                  <span className="sr-only">{t("fullPriceLabel")}</span>
                </p>
              </>
            )}
          </div>

          <span className={styles.product__line} />

          <div className={clsx(styles.product__details, "text--sm")}>
            <p className={styles.product__detail}>
              <span className={styles.product__subname}>{t("screen")}</span>
              {product.screen}
            </p>

            <p className={styles.product__detail}>
              <span className={styles.product__subname}>{t("capacity")}</span>
              {product.capacity}
            </p>

            <p className={styles.product__detail}>
              <span className={styles.product__subname}>RAM</span>
              {product.ram}
            </p>
          </div>

          <div className={styles.product__controls}>
            <button
              type="button"
              className={clsx(styles.product__cart, "text--btn")}
              aria-label={t("cartLabel", { product: product.name })}
            >
              {t("cartButton")}
            </button>

            <button
              type="button"
              className={styles.product__favorite}
              aria-label={t("favoriteLabel", { product: product.name })}
            >
              <svg
                className={styles.icon}
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
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
              </svg>
            </button>
          </div>
        </a>
      </article>
    ));
  }, [t]);

  return (
    <section aria-label={t("productsCarousel")} aria-describedby={ariaId}>
      <div className={styles["section-top"]}>
        {children}

        <p id={ariaId} className="sr-only">
          {t("carouselInstructions")}
        </p>

        <div>
          <button
            type="button"
            className={clsx(styles.prev, { [styles.disabled]: disabledPrev })}
            tabIndex={-1}
            aria-hidden="true"
            onClick={handlePrevClick}
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
            className={clsx(styles.next, { [styles.disabled]: disabledNext })}
            tabIndex={-1}
            aria-hidden="true"
            onClick={handleNextClick}
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
        </div>
      </div>

      <div className={styles["products-wrapper"]}>
        <SkipLink
          content="skipForwardCarousel"
          classAttr="skip-forward-carousel"
          elementRef={skipForwardRef}
        />

        <div className={styles.products} ref={containerRef}>
          {productCards}
        </div>

        <SkipLink
          content="skipBackCarousel"
          classAttr="skip-back-carousel"
          elementRef={skipBackRef}
        />
      </div>
    </section>
  );
};

export default memo(ProductsCarousel);
