import { useRef } from "react";
import clsx from "clsx";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PicturesSlider from "./components/PicturesSlider";
import ProductsCarousel from "./components/ProductsCarousel";
import ShopByCategory from "./components/ShopByCategory/ShopByCategory";
import type { Product } from "./types/product";
import products from "../../api/products.json";
import styles from "./HomePage.module.scss";

const { maxYear, maxModel } = products.reduce(
  (acc, product) => {
    const modelNumber = Number(product.name.match(/\d+/)?.[0] ?? 0);

    if (product.year > acc.maxYear) {
      return { maxYear: product.year, maxModel: modelNumber };
    }

    if (product.year === acc.maxYear && modelNumber > acc.maxModel) {
      return { ...acc, maxModel: modelNumber };
    }

    return acc;
  },
  { maxYear: -Infinity, maxModel: -Infinity }
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
}

const HomePage = () => {
  const { mainRef, footerRef } = useOutletContext<OutletContext>();
  const headingNewModelsRef = useRef<HTMLHeadingElement>(null);
  const headingCategoryRef = useRef<HTMLHeadingElement>(null);
  const headingHotPricesRef = useRef<HTMLHeadingElement>(null);
  const { t } = useTranslation("homePage");

  return (
    <>
      <PicturesSlider
        skipForwardRef={headingNewModelsRef}
        skipBackRef={mainRef}
      >
        <title>Nice Gadgets</title>
        <h1 className="sr-only">{t("mainHeading")}</h1>
        <h2
          className={clsx(
            styles.typing,
            styles["heading-welcome"],
            "title--xl"
          )}
          style={
            {
              "--typing-steps": t("typingSteps"),
              "--typing-width": t("typingWidth"),
            } as React.CSSProperties
          }
        >
          {t("welcomeMessage")}
        </h2>
      </PicturesSlider>

      <ProductsCarousel
        products={newProducts}
        skipForwardRef={headingCategoryRef}
        skipBackRef={headingNewModelsRef}
        hasOnlyFullPrice={true}
      >
        <h2
          className={clsx(styles.heading, "title--lg")}
          ref={headingNewModelsRef}
        >
          {t("newModelsHeading")}
        </h2>
      </ProductsCarousel>

      <ShopByCategory>
        <h2
          className={clsx(styles.heading, styles["heading--mb"], "title--lg")}
          ref={headingCategoryRef}
        >
          {t("categoryHeading")}
        </h2>
      </ShopByCategory>

      <ProductsCarousel
        products={hotPricesProducts}
        skipForwardRef={footerRef}
        skipBackRef={headingHotPricesRef}
        hasOnlyFullPrice={false}
      >
        <h2
          className={clsx(styles.heading, "title--lg")}
          ref={headingHotPricesRef}
        >
          {t("hotPricesHeading")}
        </h2>
      </ProductsCarousel>
    </>
  );
};

export default HomePage;
