import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import accessories from "@/api/accessories.json";
import phones from "@/api/phones.json";
import tablets from "@/api/tablets.json";
import Back from "../shared/components/Back";
import Breadcrumb from "../shared/components/Breadcrumb";
import ProductControls from "../shared/components/ProductControls";
import ProductPrices from "../shared/components/ProductPrices";
import type { OutletContext } from "../shared/types/outletContext";
import type { Product } from "../shared/types/product";
import NotFoundProduct from "./NotFoundProduct";
import styles from "./ProductDetailsPage.module.scss";
import ProductGallery from "./ProductGallery";

const mergedProducts = [...phones, ...tablets, ...accessories];

const ProductDetailsPage = () => {
  const { normalizedLang } = useOutletContext<OutletContext>();
  const { productId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("productDetailsPage");
  const product = mergedProducts.find((product) => product.id === productId);

  const allProducts = mergedProducts.filter((p) => {
    return p.namespaceId === product?.namespaceId;
  });

  if (!product) {
    return <NotFoundProduct t={t} />;
  }

  const productStorage: Product = {
    id: null,
    category: product.category,
    itemId: product.id,
    name: product.name,
    shortName: product.shortName,
    fullPrice: product.priceRegular,
    price: product.priceDiscount,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    year: null,
    image: product.images[0],
  };

  const handleColorsOptionClick = (colorAvailable: string) => {
    if (colorAvailable !== product.color) {
      const newSlug = allProducts.find((p) => {
        return p.color === colorAvailable && p.capacity === product.capacity;
      })?.id;

      navigate(`/product/${newSlug}`, { replace: true });
    }
  };

  const handleCapacityOptionClick = (capacity: string) => {
    if (capacity !== product.capacity) {
      const newSlug = allProducts.find((p) => {
        return p.capacity === capacity && p.color === product.color;
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

        <section className={styles.product__overview}>
          <ProductGallery product={product} t={t} />

          <div className={styles.product__details}>
            <div className={styles.product__colors}>
              {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
              <p
                id="colors-title"
                className={clsx(styles["product__colors-title"], "text--sm")}
              >
                {t("availableColors")}
              </p>

              <div
                role="radiogroup"
                aria-labelledby="colors-title"
                className={styles["product__colors-options"]}
              >
                {product.colorsAvailable.map(([colorName, colorHex]) => (
                  // biome-ignore lint/a11y/useSemanticElements: custom radio control with color options
                  <button
                    role="radio"
                    aria-checked={colorName === product.color}
                    aria-label={colorName}
                    key={colorName}
                    type="button"
                    className={clsx(styles["product__colors-option"], {
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

            <div className={styles.product__capacity}>
              {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
              <p
                id="capacity-title"
                className={clsx(styles["product__capacity-title"], "text--sm")}
              >
                {t("selectCapacity")}
              </p>

              <div
                role="radiogroup"
                aria-labelledby="capacity-title"
                className={styles["product__capacity-options"]}
              >
                {product.capacityAvailable.map((capacity) => (
                  // biome-ignore lint/a11y/useSemanticElements: custom radio control with capacity options
                  <button
                    role="radio"
                    aria-checked={capacity === product.capacity}
                    key={capacity}
                    type="button"
                    className={clsx(
                      "text--body",
                      styles["product__capacity-option"],
                      {
                        [styles.active]: capacity === product.capacity,
                      },
                    )}
                    onClick={() => handleCapacityOptionClick(capacity)}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>

            <span className={styles.product__line} />

            <div className={styles.product__buybox}>
              <ProductPrices
                hasOnlyFullPrice={false}
                t={t}
                price={product.priceDiscount}
                fullPrice={product.priceRegular}
                normalizedLang={normalizedLang}
              />

              <ProductControls t={t} product={productStorage} />
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default ProductDetailsPage;
