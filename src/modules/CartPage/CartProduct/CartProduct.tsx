import clsx from "clsx";
import type { TFunction } from "i18next";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/core/store/cart/cartSlice";
import { useAppDispatch } from "@/core/store/hooks";
import type { Product } from "@/modules/shared/types/product";
import { formatPrice } from "@/modules/shared/utils/formatPrice";
import { MAX_COUNT, MIN_COUNT } from "../constants";
import styles from "./CartProduct.module.scss";

interface ProductProps {
  t: TFunction;
  product: Product;
  normalizedLang: string;
}

const CartProduct: React.FC<ProductProps> = ({
  t,
  product,
  normalizedLang,
}) => {
  const { count = MIN_COUNT, price, name, image } = product;
  const dispatch = useAppDispatch();

  const formattedPrice = formatPrice(price * count, normalizedLang);

  return (
    <li className={styles.product}>
      <div className={styles.product__top}>
        <button
          type="button"
          className={styles.product__remove}
          aria-label={t("removeCartLabel", { product: name })}
          onClick={() => dispatch(removeFromCart(product))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-color-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <img src={image} alt="" width="80" height="80" />

        <h3 className="text--body">{name}</h3>
      </div>

      <div className={styles.product__bottom}>
        {/* biome-ignore lint/a11y/useSemanticElements: not a form group */}
        <div
          role="group"
          aria-label={t("quantityFor", { product: name })}
          className={styles.product__controls}
        >
          <button
            type="button"
            className={styles.product__decrement}
            onClick={() => dispatch(decrementQuantity(product))}
            disabled={count === MIN_COUNT}
            aria-label={t("decreaseQuantity")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
            </svg>
          </button>

          <p
            className={clsx(styles.product__count, "text--body")}
            aria-hidden="true"
          >
            {count}
          </p>

          <button
            type="button"
            className={styles.product__increment}
            onClick={() => dispatch(incrementQuantity(product))}
            disabled={count === MAX_COUNT}
            aria-label={t("increaseQuantity")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </div>

        <p
          className={clsx(styles.product__price, "title--md")}
          aria-hidden="true"
        >
          {formattedPrice}
        </p>

        <span aria-live="polite" aria-atomic="true" className="sr-only">
          {t("productUpdate", {
            quantity: count,
            price: formattedPrice,
          })}
        </span>
      </div>
    </li>
  );
};

export default CartProduct;
