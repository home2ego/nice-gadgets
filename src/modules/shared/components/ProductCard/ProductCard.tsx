import clsx from "clsx";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import ProductControls from "../ProductControls";
import ProductPrices from "../ProductPrices";
import styles from "./ProductCard.module.scss";

interface ProductProps {
  t: TFunction;
  product: Product;
  totalProducts?: number;
  productIdx: number;
  loading: "eager" | "lazy";
  hasOnlyFullPrice: boolean;
  normalizedLang: string;
  onShiftTabFocus?: React.FocusEventHandler<HTMLAnchorElement>;
  onShiftTabKey?: React.KeyboardEventHandler<HTMLAnchorElement>;
  onTabFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onTabKey?: React.KeyboardEventHandler<HTMLButtonElement>;
}

const ProductCard: React.FC<ProductProps> = ({
  t,
  product,
  totalProducts,
  productIdx,
  loading,
  hasOnlyFullPrice,
  normalizedLang,
  onShiftTabFocus,
  onShiftTabKey,
  onTabFocus,
  onTabKey,
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
      onFocus={onShiftTabFocus}
      onKeyDown={onShiftTabKey}
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

    <dl className={clsx(styles.product__details, "text--sm")}>
      <div className={styles.product__detail}>
        <dt className={styles.product__subname}>{t("screen")}</dt>
        <dd>{product.screen}</dd>
      </div>

      <div className={styles.product__detail}>
        <dt className={styles.product__subname}>{t("capacity")}</dt>
        <dd>{product.capacity}</dd>
      </div>

      <div className={styles.product__detail}>
        <dt className={styles.product__subname}>RAM</dt>
        <dd>{product.ram}</dd>
      </div>
    </dl>

    <ProductControls
      t={t}
      product={product}
      onTabFocus={onTabFocus}
      onTabKey={onTabKey}
    />
  </article>
);

export default ProductCard;
