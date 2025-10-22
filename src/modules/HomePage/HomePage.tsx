import clsx from "clsx";
import {
  lazy,
  Suspense,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import products from "../../api/products.json";
import CategorySkeleton from "./components/CategorySkeleton";
import PicturesCarousel from "./components/PicturesCarousel";
import ProductsCarousel from "./components/ProductsCarousel";
import styles from "./HomePage.module.scss";
import type { Product } from "./types/product";

const ShopByCategory = lazy(
  () => import("./components/ShopByCategory/ShopByCategory"),
);

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
  .sort((a, b) => b.fullPrice - a.fullPrice)
  .slice(0, 6);

const getAbsoluteDiscount = (product: Product) => {
  return product.fullPrice - product.price;
};

const hotPricesProducts: Product[] = [...products]
  .sort((a, b) => getAbsoluteDiscount(b) - getAbsoluteDiscount(a))
  .slice(0, 8);

interface OutletContext {
  mainRef: React.RefObject<HTMLElement>;
  footerRef: React.RefObject<HTMLElement>;
  normalizedLang: string;
}

const HomePage = () => {
  const { mainRef, footerRef, normalizedLang } =
    useOutletContext<OutletContext>();

  const [loaded, setLoaded] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const headingNewModelsRef = useRef<HTMLHeadingElement>(null);
  const headingCategoryRef = useRef<HTMLHeadingElement>(null);
  const headingHotPricesRef = useRef<HTMLHeadingElement>(null);
  const categoriesId = useId();

  const { t } = useTranslation("homePage");

  useEffect(() => {
    if (!categoriesRef.current) {
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

    observer.observe(categoriesRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const newModelsHeading = useMemo(() => {
    return (
      <h2
        className={clsx(styles.heading, "title--lg")}
        ref={headingNewModelsRef}
      >
        {t("newModelsHeading")}
      </h2>
    );
  }, [t]);

  const hotPricesHeading = useMemo(() => {
    return (
      <h2
        className={clsx(styles.heading, "title--lg")}
        ref={headingHotPricesRef}
      >
        {t("hotPricesHeading")}
      </h2>
    );
  }, [t]);

  return (
    <>
      <title>Nice Gadgets</title>
      <h1 className="sr-only">{t("mainHeading")}</h1>
      <h2
        className={clsx(
          styles.typing,
          styles[`typing--${normalizedLang}`],
          styles["heading-welcome"],
          "title--xl",
        )}
      >
        {t("welcomeMessage")}
      </h2>

      <PicturesCarousel
        t={t}
        skipForwardRef={headingNewModelsRef}
        skipBackRef={mainRef}
      />

      <ProductsCarousel
        t={t}
        normalizedLang={normalizedLang}
        products={newProducts}
        skipForwardRef={headingCategoryRef}
        skipBackRef={headingNewModelsRef}
        hasOnlyFullPrice={true}
        isLazy={false}
      >
        {newModelsHeading}
      </ProductsCarousel>

      <section aria-labelledby={categoriesId}>
        <h2
          id={categoriesId}
          className={clsx(styles.heading, styles["heading--mb"], "title--lg")}
          ref={headingCategoryRef}
        >
          {t("categoryHeading")}
        </h2>

        <div ref={categoriesRef} className={styles.categories}>
          {loaded ? (
            <Suspense fallback={<CategorySkeleton />}>
              <ShopByCategory t={t} />
            </Suspense>
          ) : (
            <CategorySkeleton />
          )}
        </div>
      </section>

      <ProductsCarousel
        t={t}
        normalizedLang={normalizedLang}
        products={hotPricesProducts}
        skipForwardRef={footerRef}
        skipBackRef={headingHotPricesRef}
        hasOnlyFullPrice={false}
        isLazy={true}
      >
        {hotPricesHeading}
      </ProductsCarousel>
    </>
  );
};

export default HomePage;
