import clsx from "clsx";
import type { TFunction } from "i18next";
import { useContext, useState } from "react";
import { ToastContext } from "@/core/context/ToastProvider";
import { addToCart, removeFromCart } from "@/core/store/cart/cartSlice";
import {
  addToFavourites,
  removeFromFavourites,
} from "@/core/store/favourites/favouritesSlice";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import Icon from "@/layout/shared/components/Icon";
import type { Product } from "../../types/product";
import styles from "./ProductControls.module.scss";

export const PARTICLE_KEYS = ["p1", "p2", "p3", "p4", "p5", "p6"];

interface ProductControlsProps {
  t: TFunction;
  product: Product;
}

const ProductControls: React.FC<ProductControlsProps> = ({ t, product }) => {
  const dispatch = useAppDispatch();
  const { showToast } = useContext(ToastContext);
  const cartProducts = useAppSelector((state) => state.cart);
  const favouritesProducts = useAppSelector((state) => state.favourites);
  const [isAnimating, setIsAnimating] = useState(false);

  const isInCart = cartProducts.some((cartProduct) => {
    return cartProduct.itemId === product.itemId;
  });

  const isInFavourites = favouritesProducts.some((favouritesProduct) => {
    return favouritesProduct.itemId === product.itemId;
  });

  const handleCartClick = () => {
    if (!isInCart) {
      dispatch(addToCart(product));
      showToast(t("cartSuccessMessage", { name: product.shortName }));
    } else {
      dispatch(removeFromCart(product.itemId));
    }
  };

  const handleFavouritesClick = () => {
    if (!isInFavourites) {
      dispatch(addToFavourites(product));

      setIsAnimating(false);

      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      dispatch(removeFromFavourites(product.itemId));
    }
  };

  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={clsx(styles.controls__cart, "text--btn", {
          [styles.added]: isInCart,
        })}
        aria-label={t("cartLabel", { product: product.shortName })}
        aria-pressed={isInCart}
        onClick={handleCartClick}
      >
        {isInCart ? t("addedButton") : t("cartButton")}
      </button>

      <button
        type="button"
        className={clsx(styles.controls__favorite, {
          [styles.active]: isInFavourites,
          [styles.animating]: isAnimating,
        })}
        aria-label={t("favoriteLabel", { product: product.shortName })}
        aria-pressed={isInFavourites}
        onClick={handleFavouritesClick}
      >
        <Icon>
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </Icon>

        <div className={styles.effect}>
          <div className={styles.circle} />

          <div>
            {PARTICLE_KEYS.map((key) => (
              <div key={key} className={styles.particle} />
            ))}
          </div>
        </div>
      </button>
    </div>
  );
};

export default ProductControls;
