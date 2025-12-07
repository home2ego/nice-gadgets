import clsx from "clsx";
import type { TFunction } from "i18next";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/core/store/cart/cartSlice";
import { useAppDispatch } from "@/core/store/hooks";
import Icon from "@/layout/shared/components/Icon";
import type { Product } from "@/modules/shared/types/product";
import { formatWithRate } from "@/modules/shared/utils/priceUtils";
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
  const { count = MIN_COUNT, price, name, shortName, image } = product;
  const dispatch = useAppDispatch();

  return (
    <li className={styles.product}>
      <div className={styles.product__top}>
        <button
          type="button"
          className={styles.product__remove}
          aria-label={t("removeCartLabel", { product: shortName })}
          onClick={() => dispatch(removeFromCart(product))}
        >
          <Icon>
            <path d="M18 6 6 18M6 6l12 12" />
          </Icon>
        </button>

        <img
          src={image}
          alt={product.name}
          width="80"
          height="80"
          decoding="async"
        />

        <h3 className="text--body">{name}</h3>
      </div>

      <div className={styles.product__bottom}>
        {/* biome-ignore lint/a11y/useSemanticElements: not a form group */}
        <div
          role="group"
          aria-label={t("quantityFor", { product: shortName })}
          className={styles.product__controls}
        >
          <button
            type="button"
            className={styles.product__decrement}
            onClick={() => dispatch(decrementQuantity(product))}
            disabled={count === MIN_COUNT}
            aria-label={t("decreaseQuantity")}
          >
            <Icon>
              <path d="M5 12h14" />
            </Icon>
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
            <Icon>
              <path d="M5 12h14M12 5v14" />
            </Icon>
          </button>
        </div>

        <p
          className={clsx(styles.product__price, "title--md")}
          aria-hidden="true"
        >
          {formatWithRate(price * count, normalizedLang)}
        </p>

        {/* biome-ignore lint/a11y/useSemanticElements: role=status is correct for product updates */}
        <span role="status" className="sr-only">
          {t("productUpdate", {
            quantity: count,
            price: formatWithRate(price * count, normalizedLang),
          })}
        </span>
      </div>
    </li>
  );
};

export default CartProduct;
