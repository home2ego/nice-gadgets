import clsx from "clsx";
import imgEmptyCart from "@/assets/icons/cart-is-empty.svg";
import styles from "./CartEmpty.module.scss";

const CartEmpty = () => {
  return (
    <>
      <h2 className={clsx(styles.heading, "title--md")}>Your cart is empty</h2>
      <img
        className={styles["image-empty"]}
        src={imgEmptyCart}
        alt=""
        width="250"
        height="240"
        decoding="async"
      />
    </>
  );
};

export default CartEmpty;
