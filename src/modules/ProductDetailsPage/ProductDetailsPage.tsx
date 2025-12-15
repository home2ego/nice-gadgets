import clsx from "clsx";
import { useMemo, useRef } from "react";
import { Fragment } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import accessories from "@/api/accessories.json";
import phones from "@/api/phones.json";
import tablets from "@/api/tablets.json";
import ProductsCarousel from "../HomePage/ProductsCarousel";
import Back from "../shared/components/Back";
import Breadcrumb from "../shared/components/Breadcrumb";
import ProductControls from "../shared/components/ProductControls";
import ProductPrices from "../shared/components/ProductPrices";
import ProductTech from "../shared/components/ProductTech";
import type { OutletContext } from "../shared/types/outletContext";
import type { Product } from "../shared/types/product";
import NotFoundProduct from "./NotFoundProduct";
import styles from "./ProductDetailsPage.module.scss";
import ProductGallery from "./ProductGallery";
import type { ProductDetails } from "./productDetails";

const mergedProducts = [
  ...phones,
  ...tablets,
  ...accessories,
] as ProductDetails[];

const ProductDetailsPage = () => {
  const { normalizedLang, footerRef } = useOutletContext<OutletContext>();
  const { productId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("productDetailsPage");
  const recommendedRef = useRef<HTMLHeadingElement>(null);
  const product = mergedProducts.find((product) => product.id === productId);

  const recommendedProducts: Product[] = useMemo(() => {
    const uniqueProducts = Array.from(
      new Map(
        mergedProducts
          .filter(
            (p) =>
              p.category === product?.category &&
              p.namespaceId !== product.namespaceId,
          )
          .map((p) => [p.namespaceId, p]),
      ).values(),
    );

    const shuffled = uniqueProducts.toSorted(() => Math.random() - 0.5);

    return shuffled.slice(0, 8).map((p) => ({
      id: null,
      category: p.category,
      itemId: p.id,
      name: p.name,
      shortName: p.shortName,
      fullPrice: p.priceRegular,
      price: p.priceDiscount,
      screen: p.screen,
      variant: p.variant,
      color: p.color,
      ram: p.ram,
      year: null,
      image: p.images[0],
    }));
  }, [product?.category, product?.namespaceId]);

  if (!product) {
    return <NotFoundProduct t={t} />;
  }

  const allProducts = mergedProducts.filter((p) => {
    return p.namespaceId === product.namespaceId;
  });

  const productStorage: Product = {
    id: null,
    category: product.category,
    itemId: product.id,
    name: product.name,
    shortName: product.shortName,
    fullPrice: product.priceRegular,
    price: product.priceDiscount,
    screen: product.screen,
    variant: product.variant,
    color: product.color,
    ram: product.ram,
    year: null,
    image: product.images[0],
  };

  const handleColorsOptionClick = (colorAvailable: string) => {
    if (colorAvailable !== product.color) {
      const newSlug = allProducts.find((p) => {
        return p.color === colorAvailable && p.variant === product.variant;
      })?.id;

      navigate(`/product/${newSlug}`, { replace: true });
    }
  };

  const handleVariantOptionClick = (variantAvailable: string) => {
    if (variantAvailable !== product.variant) {
      const newSlug = allProducts.find((p) => {
        return p.variant === variantAvailable && p.color === product.color;
      })?.id;

      navigate(`/product/${newSlug}`, { replace: true });
    }
  };

  return (
    <>
      <title>{`${product.name} | Nice Gadgets`}</title>

      <Breadcrumb t={t} heading={product.category} productName={product.name} />

      <Back t={t} />

      <article aria-labelledby="product" className={styles.product}>
        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <h1 id="product" className={clsx(styles.product__heading, "title--lg")}>
          {product?.name}
        </h1>

        <section aria-label={t("overview")} className={styles.overview}>
          <ProductGallery product={product} t={t} />

          <div className={styles.overview__details}>
            <div className={styles.overview__colors}>
              {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
              <p
                id="colors-title"
                className={clsx(styles["overview__colors-title"], "text--sm")}
              >
                {t("availableColors")}
              </p>

              <div
                role="radiogroup"
                aria-labelledby="colors-title"
                className={styles["overview__colors-options"]}
              >
                {product.colorsAvailable.map(([colorName, colorHex]) => (
                  // biome-ignore lint/a11y/useSemanticElements: custom radio control with color options
                  <button
                    role="radio"
                    aria-checked={colorName === product.color}
                    aria-label={colorName}
                    key={colorName}
                    type="button"
                    className={clsx(styles["overview__colors-option"], {
                      [styles.active]: colorName === product.color,
                    })}
                    style={{
                      backgroundColor: colorHex,
                    }}
                    onClick={() => handleColorsOptionClick(colorName)}
                  />
                ))}
              </div>
            </div>

            <span className={styles.product__line} />

            <div className={styles.overview__variant}>
              {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
              <p
                id="variant-title"
                className={clsx(styles["overview__variant-title"], "text--sm")}
              >
                {product.category === "accessories"
                  ? t("selectSize")
                  : t("selectCapacity")}
              </p>

              <div
                role="radiogroup"
                aria-labelledby="variant-title"
                className={styles["overview__variant-options"]}
              >
                {product.variantAvailable.map((variant) => (
                  // biome-ignore lint/a11y/useSemanticElements: custom radio control with variant options
                  <button
                    role="radio"
                    aria-checked={variant === product.variant}
                    key={variant}
                    type="button"
                    className={clsx(
                      "text--body",
                      styles["overview__variant-option"],
                      {
                        [styles.active]: variant === product.variant,
                      },
                    )}
                    onClick={() => handleVariantOptionClick(variant)}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            <span className={styles.product__line} />

            <div className={styles.overview__buybox}>
              <ProductPrices
                hasOnlyFullPrice={false}
                t={t}
                price={product.priceDiscount}
                fullPrice={product.priceRegular}
                normalizedLang={normalizedLang}
              />

              <ProductControls t={t} product={productStorage} />
            </div>

            <ProductTech
              t={t}
              productDetails={[
                { key: "screen", value: product.screen },
                { key: "resolution", value: product.resolution },
                { key: "processor", value: product.processor },
                { key: "RAM", value: product.ram },
              ]}
            />

            <p className={clsx(styles.overview__id, "text--sm")}>
              ID: {product.productId}
            </p>
          </div>
        </section>

        <div className={styles.product__wrapper}>
          <section aria-labelledby="about" className={styles.about}>
            {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
            <h2 id="about" className={clsx(styles.about__heading, "title--md")}>
              {t("about")}
            </h2>

            <span className={styles.product__line} />

            {product.description[normalizedLang].map((productDesc, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Safe to use index as key here
              <Fragment key={idx}>
                <h3 className={clsx(styles.about__subheading, "title--sm")}>
                  {productDesc.title}
                </h3>

                <p className={clsx(styles.about__text, "text--body")}>
                  {productDesc.text}
                </p>
              </Fragment>
            ))}
          </section>

          <section aria-labelledby="techspecs" className={styles.techspecs}>
            {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
            <h2
              id="techspecs"
              className={clsx(styles.techspecs__heading, "title--md")}
            >
              {t("techspecs")}
            </h2>

            <span className={styles.product__line} />

            <ProductTech
              t={t}
              productDetails={[
                { key: "screen", value: product.screen },
                { key: "resolution", value: product.resolution },
                { key: "processor", value: product.processor },
                { key: "RAM", value: product.ram },
                {
                  key:
                    product.category === "accessories"
                      ? "caseSize"
                      : "builtMemory",
                  value: product.variant,
                },
                { key: "camera", value: product.camera },
                { key: "zoom", value: product.zoom },
                { key: "cell", value: product.cell },
              ]}
            />
          </section>
        </div>
      </article>

      <section
        aria-labelledby="recommended-heading"
        aria-describedby="recommended-desc"
        className={styles["recommended-wrapper"]}
        ref={recommendedRef}
      >
        <ProductsCarousel
          t={t}
          normalizedLang={normalizedLang}
          products={recommendedProducts}
          skipForwardRef={footerRef}
          skipBackRef={recommendedRef}
          hasOnlyFullPrice={false}
          isLazy={true}
          headingId="recommended-heading"
          headingContent="recommendedHeading"
          descId="recommended-desc"
        />
      </section>
    </>
  );
};

export default ProductDetailsPage;
