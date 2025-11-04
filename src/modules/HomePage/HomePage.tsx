import clsx from "clsx";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import products from "@/api/products.json";
import SkipLink from "@/modules/shared/components/SkipLink";
import type { Product } from "../shared/types/product";
import CategorySkeleton from "./components/CategorySkeleton";
import PicturesCarousel from "./components/PicturesCarousel";
import ProductsCarousel from "./components/ProductsCarousel";
import styles from "./HomePage.module.scss";

const ShopByCategory = lazy(() => import("./components/ShopByCategory"));

const { maxYear, maxModel } = products.reduce(
  (acc, product) => {
    const modelNumber = Number(product.name.match(/\d+/)?.[0] ?? 0);

    if (product.year > acc.maxYear) {
      return { maxYear: product.year, maxModel: modelNumber };
    }

    if (product.year === acc.maxYear && modelNumber > acc.maxModel) {
      return { maxYear: acc.maxYear, maxModel: modelNumber };
    }

    return acc;
  },
  { maxYear: -Infinity, maxModel: -Infinity },
);

const newProducts: Product[] = products
  .filter((product) => {
    const modelNumber = Number(product.name.match(/\d+/)?.[0] ?? 0);

    return product.year === maxYear && modelNumber === maxModel;
  })
  .reduce((acc: Product[], current) => {
    const alreadyExists = acc.some((product) => {
      return product.color === current.color;
    });

    if (!alreadyExists) {
      acc.push(current);
    }

    return acc;
  }, [])
  .sort((a, b) => b.fullPrice - a.fullPrice);

const hotPricesProducts: Product[] = [...products]
  .sort((a, b) => {
    const discountA = (a.fullPrice - a.price) / a.fullPrice;
    const discountB = (b.fullPrice - b.price) / b.fullPrice;

    return discountB - discountA;
  })
  .slice(0, 10);

interface OutletContext {
  mainRef: React.RefObject<HTMLElement>;
  footerRef: React.RefObject<HTMLElement>;
  normalizedLang: string;
}

const HomePage = () => {
  const { mainRef, footerRef, normalizedLang } =
    useOutletContext<OutletContext>();

  const [loaded, setLoaded] = useState(false);
  const newModelsRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);
  const hotPricesRef = useRef<HTMLHeadingElement>(null);
  const categoriesObserverRef = useRef<HTMLUListElement>(null);

  const { t } = useTranslation("homePage");

  // If IntersectionObserver is not removed, wrap Pictures Carousel and Product Carousel in .memo()
  useEffect(() => {
    if (!categoriesObserverRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(categoriesObserverRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <title>Nice Gadgets</title>
      <h1 className="sr-only">{t("mainHeading")}</h1>
      <h2
        className={clsx(
          styles.typing,
          styles[`typing--${normalizedLang}`],
          styles["welcome-message"],
          "title--xl",
        )}
      >
        {t("welcomeMessage")}
      </h2>

      <section
        aria-label={t("picturesCarousel")}
        className={clsx(
          styles["carousel-wrapper"],
          styles["carousel-wrapper--pictures"],
        )}
      >
        <SkipLink
          content="skipForwardCarousel"
          classAttr="skip-forward-pictures"
          elementRef={newModelsRef}
        />

        <PicturesCarousel t={t} />

        <SkipLink
          content="skipBackCarousel"
          classAttr="skip-back-pictures"
          mainRef={mainRef}
        />
      </section>

      <section
        aria-labelledby="new-models-heading"
        aria-describedby="new-models-desc"
        className={styles["carousel-wrapper"]}
        ref={newModelsRef}
      >
        <ProductsCarousel
          t={t}
          normalizedLang={normalizedLang}
          products={newProducts}
          skipForwardRef={categoriesRef}
          skipBackRef={newModelsRef}
          hasOnlyFullPrice={true}
          isLazy={false}
          headingId="new-models-heading"
          headingContent="newModelsHeading"
          descId="new-models-desc"
        />
      </section>

      <section aria-labelledby="categories-heading" ref={categoriesRef}>
        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <h2
          id="categories-heading"
          className={clsx(styles["categories-heading"], "title--lg")}
        >
          {t("categoryHeading")}
        </h2>

        <ul ref={categoriesObserverRef} className={styles.categories}>
          {loaded ? (
            <Suspense fallback={<CategorySkeleton />}>
              <ShopByCategory t={t} />
            </Suspense>
          ) : (
            <CategorySkeleton />
          )}
        </ul>
      </section>

      <section
        aria-labelledby="hot-prices-heading"
        aria-describedby="hot-prices-desc"
        className={styles["carousel-wrapper"]}
        ref={hotPricesRef}
      >
        <ProductsCarousel
          t={t}
          normalizedLang={normalizedLang}
          products={hotPricesProducts}
          skipForwardRef={footerRef}
          skipBackRef={hotPricesRef}
          hasOnlyFullPrice={false}
          isLazy={true}
          headingId="hot-prices-heading"
          headingContent="hotPricesHeading"
          descId="hot-prices-desc"
        />
      </section>
    </>
  );
};

export default HomePage;
