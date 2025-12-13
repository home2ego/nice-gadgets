import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import ProductControls from "../ProductControls";
import ProductPrices from "../ProductPrices";
import ProductTech from "../ProductTech";
import styles from "./ProductCard.module.scss";

interface ProductProps {
  t: TFunction;
  product: Product;
  totalProducts?: number;
  productIdx: number;
  loading: "eager" | "lazy";
  hasOnlyFullPrice: boolean;
  normalizedLang: string;
  onTabKeyDown?: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
}

const ProductCard: React.FC<ProductProps> = ({
  t,
  product,
  totalProducts,
  productIdx,
  loading,
  hasOnlyFullPrice,
  normalizedLang,
  onTabKeyDown,
}) => (
  <article className={styles.product}>
    <Link
      to={`/product/${product.itemId}`}
      state={{
        scrollToTop: true,
      }}
      aria-label={t("productLabel", {
        current: productIdx + 1,
        total: totalProducts,
      })}
      className={styles.product__link}
      onKeyDown={onTabKeyDown}
    />

    <img
      className={styles.product__image}
      src={product.image}
      alt={product.name}
      width="206"
      height="194"
      loading={loading}
      decoding="async"
    />

    <h3 className="text--body">{product.name}</h3>

    <ProductPrices
      hasOnlyFullPrice={hasOnlyFullPrice}
      t={t}
      price={product.price}
      fullPrice={product.fullPrice}
      normalizedLang={normalizedLang}
    />

    <span className={styles.product__line} />

    <ProductTech
      t={t}
      productDetails={[
        { key: "screen", value: product.screen },
        {
          key: product.category === "accessories" ? "size" : "capacity",
          value: product.variant,
        },
        { key: "RAM", value: product.ram },
      ]}
    />

    <ProductControls t={t} product={product} />
  </article>
);

export default ProductCard;
