import clsx from "clsx";
import type { TFunction } from "i18next";
import styles from "./CartEmpty.module.scss";

interface CartEmptyProps {
  t: TFunction;
}

const CartEmpty: React.FC<CartEmptyProps> = ({ t }) => {
  return (
    <section>
      <h2 className={clsx(styles.heading, "title--lg")}>{t("cartEmpty")}</h2>
      <img
        className={styles.image}
        src="/img/cart-is-empty.svg"
        alt=""
        width="250"
        height="223"
        decoding="async"
      />
    </section>
  );
};

export default CartEmpty;
