import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import SkipLink from "../../../../components/shared/components/SkipLink";
import type { Product } from "../../types/product";
import { formatPrice } from "./formatPrice";
import styles from "./ProductsCarousel.module.scss";

const currencyName: Record<string, string> = {
  en: "pounds",
  fi: "euros",
  pl: "zł",
  uk: "гривень",
};

interface SliderProps {
  products: Product[];
  children: React.ReactNode;
  skipForwardRef: React.RefObject<HTMLElement | null>;
  skipBackRef: React.RefObject<HTMLElement | null>;
  hasOnlyFullPrice: boolean;
}

const ProductsCarousel: React.FC<SliderProps> = ({
  products,
  children,
  skipForwardRef,
  skipBackRef,
  hasOnlyFullPrice,
}) => {
  const [disabledPrev, setDisabledPrev] = useState(true);
  const [disabledNext, setDisabledNext] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastVisibleCard = useRef<HTMLAnchorElement | null>(null);
  const firstVisibleCard = useRef<HTMLAnchorElement | null>(null);

  const { t, i18n } = useTranslation("homePage");
  const lang = i18n.language;

  useEffect(() => {
    const cards = Array.from(
      containerRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []
    );

    if (!cards.length) {
      return;
    }

    const visibleCards = new Set();

    const cbObserver = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visibleCards.add(entry.target);
        } else {
          visibleCards.delete(entry.target);
        }
      }

      const visibleCardsToArr = cards.filter((card) => visibleCards.has(card));

      firstVisibleCard.current = visibleCardsToArr[0];
      lastVisibleCard.current = visibleCardsToArr[visibleCardsToArr.length - 1];

      setDisabledPrev(firstVisibleCard.current === cards[0]);
      setDisabledNext(lastVisibleCard.current === cards[cards.length - 1]);
    };

    const observer = new IntersectionObserver(cbObserver, {
      root: containerRef.current,
      threshold: 0.5,
    });

    for (const card of cards) {
      observer.observe(card);
    }

    return () => observer.disconnect();
  }, [products]);

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

  const productCards = useMemo(() => {
    return products.map((product, index) => (
      <a
        href="#"
        key={product.id}
        className={styles.product}
        role="group"
        aria-roledescription="card"
        aria-label={t("productOfTotal", {
          current: index + 1,
          total: products.length,
        })}
        onFocus={handleCardFocus}
      >
        <img
          src={product.image}
          alt=""
          width="208"
          height="196"
          loading="lazy"
        />

        <h3 className="text--body">{product.name}</h3>

        <div className={clsx(styles.product__prices, "title--sm")}>
          {hasOnlyFullPrice ? (
            <p>{formatPrice(product.fullPrice, lang)}</p>
          ) : (
            <>
              <p
                aria-label={t("priceAriaLabel", {
                  price: product.price,
                  currency: currencyName[lang],
                })}
              >
                {formatPrice(product.price, lang)}
              </p>

              <p
                className={styles["product__full-price"]}
                aria-label={t("fullPriceAriaLabel", {
                  fullPrice: product.fullPrice,
                  currency: currencyName[lang],
                })}
              >
                {formatPrice(product.fullPrice, lang)}
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
            className="text--btn"
            aria-label={t("cartAriaLabel", { product: product.name })}
          >
            {t("cartButton")}
          </button>

          <button
            aria-label={t("favoriteAriaLabel", { product: product.name })}
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
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
          </button>
        </div>
      </a>
    ));
  }, [products, t]);

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label={t("cardsCarousel")}
      aria-describedby="carousel-instructions"
    >
      <div className={styles["section-top"]}>
        {children}

        <p id="carousel-instructions" className="sr-only">
          {t("carouselInstructions")}
        </p>

        <div>
          <button
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

export default ProductsCarousel;
