import clsx from "clsx";
import type { TFunction } from "i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/layout/shared/components/Icon";
import ProductCard from "@/modules/shared/components/ProductCard";
import SkipLink from "@/modules/shared/components/SkipLink";
import type { Product } from "@/modules/shared/types/product";
import styles from "./ProductsCarousel.module.scss";

interface CarouselProps {
  t: TFunction;
  normalizedLang: string;
  products: Product[];
  skipForwardRef: React.RefObject<HTMLElement | null>;
  skipBackRef: React.RefObject<HTMLElement | null>;
  hasOnlyFullPrice: boolean;
  isLazy: boolean;
  headingId: string;
  headingContent: string;
  descId: string;
}

const ProductsCarousel: React.FC<CarouselProps> = ({
  t,
  normalizedLang,
  products,
  skipForwardRef,
  skipBackRef,
  hasOnlyFullPrice,
  isLazy,
  headingId,
  headingContent,
  descId,
}) => {
  const [disabledPrev, setDisabledPrev] = useState(true);
  const [disabledNext, setDisabledNext] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastVisibleCard = useRef<HTMLElement | null>(null);
  const firstVisibleCard = useRef<HTMLElement | null>(null);

  const focusTarget = useRef<"next" | "prev" | null>(null);
  const focusKey = useRef<"tab" | "shiftTab" | null>(null);

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

  useEffect(() => {
    if (disabledNext && focusTarget.current === "next") {
      firstVisibleCard.current?.querySelector("a")?.focus();
      focusTarget.current = null;
    }

    if (disabledPrev && focusTarget.current === "prev") {
      lastVisibleCard.current?.querySelector("a")?.focus();
      focusTarget.current = null;
    }
  }, [disabledNext, disabledPrev]);

  const handleNextClick = () => {
    const next = lastVisibleCard.current?.nextElementSibling;
    next?.scrollIntoView({ inline: "start", block: "nearest" });
  };

  const handlePrevClick = () => {
    const prev = firstVisibleCard.current?.previousElementSibling;
    prev?.scrollIntoView({ inline: "end", block: "nearest" });
  };

  const handleCardFocus = () => {
    if (focusTarget.current === "next") {
      firstVisibleCard.current?.querySelector("a")?.focus();
      focusTarget.current = null;
    }

    if (focusTarget.current === "prev") {
      lastVisibleCard.current?.querySelector("a")?.focus();
      focusTarget.current = null;
    }
  };

  const handleShiftTabFocus = (e: React.FocusEvent<HTMLAnchorElement>) => {
    if (focusTarget.current) {
      handleCardFocus();
    } else {
      const nextCard = lastVisibleCard.current?.nextElementSibling;
      const nextFocusable = nextCard?.querySelector("a");

      if (e.currentTarget === nextFocusable && focusKey.current === "tab") {
        requestAnimationFrame(() => {
          nextCard?.scrollIntoView({ inline: "start", block: "nearest" });
        });
      }
    }
  };

  const handleShiftTabKey = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.shiftKey && e.key === "Tab") {
      focusKey.current = "shiftTab";
    }
  };

  const handleTabFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    const prevCard = firstVisibleCard.current?.previousElementSibling;
    const prevFocusable = prevCard?.querySelector("button:last-of-type");

    if (e.currentTarget === prevFocusable && focusKey.current === "shiftTab") {
      requestAnimationFrame(() => {
        prevCard?.scrollIntoView({ inline: "end", block: "nearest" });
      });
    }
  };

  const handleTabKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!e.shiftKey && e.key === "Tab") {
      focusKey.current = "tab";
    }
  };

  const getLazy = (idx: number): "lazy" | "eager" => {
    if (isLazy) {
      return "lazy";
    }

    return idx < 4 ? "eager" : "lazy";
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: this useMemo re-computes only when the language changes
  const productCards = useMemo(() => {
    return products.map((product, idx) => (
      <ProductCard
        key={product.id}
        t={t}
        product={product}
        totalProducts={products.length}
        productIdx={idx}
        loading={getLazy(idx)}
        hasOnlyFullPrice={hasOnlyFullPrice}
        normalizedLang={normalizedLang}
        onShiftTabFocus={handleShiftTabFocus}
        onShiftTabKey={handleShiftTabKey}
        onTabFocus={handleTabFocus}
        onTabKey={handleTabKey}
      />
    ));
  }, [t]);

  return (
    <>
      <SkipLink
        content="skipForwardCarousel"
        classAttr="skip-forward-carousel"
        elementRef={skipForwardRef}
      />

      <div className={styles.top}>
        <h2 id={headingId} className={clsx(styles.top__heading, "title--lg")}>
          {t(headingContent)}
        </h2>

        <p id={descId} className="sr-only">
          {t("carouselInstructions")}
        </p>

        <button
          type="button"
          className={styles.top__prev}
          aria-label={t("prevProductsLabel")}
          disabled={disabledPrev}
          onClick={handlePrevClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              focusTarget.current = "prev";
            }
          }}
        >
          <Icon>
            <path d="m15 18-6-6 6-6" />
          </Icon>
        </button>

        <button
          type="button"
          className={styles.top__next}
          aria-label={t("nextProductsLabel")}
          disabled={disabledNext}
          onClick={handleNextClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              focusTarget.current = "next";
            }
          }}
        >
          <Icon>
            <path d="m9 18 6-6-6-6" />
          </Icon>
        </button>
      </div>

      {/*  biome-ignore lint/a11y/useSemanticElements: role="region" was used intentionally */}
      <div
        role="region"
        aria-label={t("productCarousel")}
        className={styles.products}
        tabIndex={-1}
        ref={containerRef}
      >
        {productCards}
      </div>

      <SkipLink
        content="skipBackCarousel"
        classAttr="skip-back-carousel"
        elementRef={skipBackRef}
      />
    </>
  );
};

export default ProductsCarousel;
