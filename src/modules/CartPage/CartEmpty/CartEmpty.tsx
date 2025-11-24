import clsx from "clsx";
import type { TFunction } from "i18next";
import styles from "./CartEmpty.module.scss";

interface CartEmptyProps {
  t: TFunction;
}

const CartEmpty: React.FC<CartEmptyProps> = ({ t }) => {
  return (
    <>
      <h2 className={clsx(styles.heading, "title--md")}>{t("cartEmpty")}</h2>
      <img
        className={styles["image-empty"]}
        src="/img/cart-is-empty.svg"
        alt=""
        width="250"
        height="240"
        decoding="async"
      />
    </>
  );
};

export default CartEmpty;
