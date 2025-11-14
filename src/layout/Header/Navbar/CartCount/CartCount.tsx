import { clsx } from "clsx";
import { useAppSelector } from "@/core/store/hooks";
import styles from "./CartCount.module.scss";

const CartCount = () => {
  const cartProducts = useAppSelector((state) => state.cart);

  return (
    <>
      {cartProducts.length > 0 && (
        <span className={clsx(styles.count, "text--xs")} aria-hidden="true">
          {cartProducts.length}
        </span>
      )}
    </>
  );
};

export default CartCount;
