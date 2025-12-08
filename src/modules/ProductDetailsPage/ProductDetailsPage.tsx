import clsx from "clsx";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import accessories from "@/api/accessories.json";
import phones from "@/api/phones.json";
import tablets from "@/api/tablets.json";
import Back from "../shared/components/Back";
import Breadcrumb from "../shared/components/Breadcrumb";
import NotFoundProduct from "./NotFoundProduct";
import styles from "./ProductDetailsPage.module.scss";
import ProductGallery from "./ProductGallery";

const mergedProducts = [...phones, ...tablets, ...accessories];

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { t } = useTranslation("productDetailsPage");
  const [product, setProduct] = useState(() =>
    mergedProducts.find((product) => product.id === productId),
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional, run only once
  const allProducts = useMemo(() => {
    if (!product) return [];

    return mergedProducts.filter((p) => {
      return p.namespaceId === product.namespaceId;
    });
  }, []);

  if (!product) {
    return <NotFoundProduct t={t} />;
  }

  const handleColorsOptionClick = (colorAvailable: string) => {
    if (colorAvailable !== product.color) {
      const newProduct = allProducts.find((p) => {
        return p.color === colorAvailable && p.capacity === product.capacity;
      });

      setProduct(newProduct);
    }
  };

  const handleCapacityOptionClick = (capacity: string) => {
    if (capacity !== product.capacity) {
      const newProduct = allProducts.find((p) => {
        return p.capacity === capacity && p.color === product.color;
      });

      setProduct(newProduct);
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
              <p className={clsx(styles["product__colors-title"], "text--sm")}>
                Available colors
              </p>

              <div className={styles["product__colors-options"]}>
                {product.colorsAvailable.map((colorAvailable) => (
                  <button
                    key={colorAvailable[0]}
                    type="button"
                    className={clsx(styles["product__colors-option"], {
                      [styles.active]: colorAvailable[0] === product.color,
                    })}
                    style={{
                      backgroundColor: colorAvailable[1],
                    }}
                    onClick={() => handleColorsOptionClick(colorAvailable[0])}
                  />
                ))}
              </div>
            </div>

            <span className={styles.product__line} />

            <div className={styles.product__capacity}>
              <p
                className={clsx(styles["product__capacity-title"], "text--sm")}
              >
                Select capacity
              </p>

              <div className={styles["product__capacity-options"]}>
                {product.capacityAvailable.map((capacity) => (
                  <button
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
          </div>
        </section>
      </article>
    </>
  );
};

export default ProductDetailsPage;
