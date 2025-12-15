import clsx from "clsx";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import products from "@/api/products.json";
import SkipLink from "@/modules/shared/components/SkipLink";
import type { OutletContext } from "../shared/types/outletContext";
import type { Product } from "../shared/types/product";
import styles from "./HomePage.module.scss";
import PicturesCarousel from "./PicturesCarousel";
import ProductsCarousel from "./ProductsCarousel";
import ShopByCategory from "./ShopByCategory";

const { maxYear, maxModel } = (products as Product[]).reduce(
  (acc, product) => {
    const modelNumber = Number(product.name.match(/\d+/)?.[0] ?? 0);

    if (product.year ?? 0 > acc.maxYear) {
      return { maxYear: product.year ?? 0, maxModel: modelNumber };
    }

    if (product.year === acc.maxYear && modelNumber > acc.maxModel) {
      return { maxYear: acc.maxYear, maxModel: modelNumber };
    }

    return acc;
  },
  { maxYear: 0, maxModel: 0 },
);

const newProducts = (products as Product[])
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
  .toSorted((a, b) => b.fullPrice - a.fullPrice);

const hotPricesProducts = (products as Product[])
  .toSorted((a, b) => {
    const discountA = (a.fullPrice - a.price) / a.fullPrice;
    const discountB = (b.fullPrice - b.price) / b.fullPrice;

    return discountB - discountA;
  })
  .slice(0, 8);

const HomePage = () => {
  const { mainRef, footerRef, normalizedLang } =
    useOutletContext<OutletContext>();

  const newModelsRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);
  const hotPricesRef = useRef<HTMLHeadingElement>(null);

  const { t } = useTranslation("homePage");

  return (
    <>
      <title>Nice Gadgets</title>
      <h1 className="sr-only">{t("mainHeading")}</h1>
      <h2
        className={clsx(
          styles.typing,
          styles[`typing--${normalizedLang}`],
          styles.welcome,
          "title--xl",
        )}
      >
        {t("welcomeMessage")}
      </h2>

      <section
        aria-label={t("productCarousel")}
        className={clsx(styles.wrapper, styles["wrapper--pictures"])}
      >
        <SkipLink
          content="skipForwardCarousel"
          classAttr="skip-forward-slider"
          elementRef={newModelsRef}
        />

        <PicturesCarousel t={t} />

        <SkipLink
          content="skipBackCarousel"
          classAttr="skip-back-slider"
          topElementRef={mainRef}
        />
      </section>

      <section
        aria-labelledby="new-models-heading"
        aria-describedby="new-models-desc"
        className={styles.wrapper}
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

      <section
        className={styles.categories}
        aria-labelledby="categories"
        ref={categoriesRef}
      >
        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <h2
          id="categories"
          className={clsx(styles.categories__heading, "title--lg")}
        >
          {t("categoryHeading")}
        </h2>

        <ul className={styles.categories__list}>
          <ShopByCategory t={t} />
        </ul>
      </section>

      <section
        aria-labelledby="hot-prices-heading"
        aria-describedby="hot-prices-desc"
        className={styles.wrapper}
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
