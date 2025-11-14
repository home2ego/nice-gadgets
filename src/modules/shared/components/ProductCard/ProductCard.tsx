import clsx from "clsx";
import type { TFunction } from "i18next";
import { addToCart, removeFromCart } from "@/core/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import type { Product } from "../../types/product";
import { formatPrice } from "./formatPrice";
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
}) => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart);

  const isInCart = cartProducts.some((item) => item.id === product.id);

  const handleCartClick = () => {
    if (!isInCart) {
      dispatch(addToCart(product));
    }

    if (isInCart) {
      dispatch(removeFromCart(product));
    }
  };

  return (
    <article className={styles.product}>
      {/* biome-ignore lint/a11y/useAnchorContent: overlay link with aria-label provides accessible name */}
      <a
        href="/"
        aria-label={t("productLabel", {
          product: product.name,
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
        alt=""
        width="206"
        height="194"
        loading={loading}
        decoding="async"
      />

      <h3 className="text--body">{product.name}</h3>

      <div className={clsx(styles.product__prices, "title--sm")}>
        {hasOnlyFullPrice ? (
          <p>{formatPrice(product.fullPrice, normalizedLang)}</p>
        ) : (
          <>
            <p>
              {formatPrice(product.price, normalizedLang)}
              <span className="sr-only">{t("priceLabel")}</span>
            </p>

            <p className={styles["product__full-price"]}>
              {formatPrice(product.fullPrice, normalizedLang)}
              <span className="sr-only">{t("fullPriceLabel")}</span>
            </p>
          </>
        )}
      </div>

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

      <div className={styles.product__controls}>
        <button
          type="button"
          className={clsx(styles.product__cart, "text--btn", {
            [styles.added]: isInCart,
          })}
          aria-label={t("cartLabel", { product: product.name })}
          onClick={handleCartClick}
        >
          {isInCart ? t("addedButton") : t("cartButton")}
        </button>

        <button
          type="button"
          className={styles.product__favorite}
          aria-label={t("favoriteLabel", { product: product.name })}
          onFocus={onTabFocus}
          onKeyDown={onTabKey}
        >
          <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="var(--text-color-primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
