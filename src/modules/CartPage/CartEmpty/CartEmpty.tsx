import clsx from "clsx";
import type { TFunction } from "i18next";
import styles from "./CartEmpty.module.scss";

interface CartEmptyProps {
  t: TFunction;
}

const CartEmpty: React.FC<CartEmptyProps> = ({ t }) => {
  return (
    <section aria-labelledby="cart-empty" className={styles.wrapper}>
      {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
      <h1 id="cart-empty" className={clsx(styles.heading, "title--lg")}>
        {t("cartEmpty")}
      </h1>

      <img
        className={styles.image}
        src="/img/cart-is-empty.svg"
        alt=""
        width="300"
        height="268"
        decoding="async"
      />
    </section>
  );
};

export default CartEmpty;
