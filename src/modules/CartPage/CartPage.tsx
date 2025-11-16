import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAppSelector } from "@/core/store/hooks";
import type { OutletContext } from "../shared/types/outletContext";
import { formatPrice } from "../shared/utils/formatPrice";
import styles from "./CartPage.module.scss";
import CartProduct from "./CartProduct";
import { MIN_COUNT } from "./constants";

const CartPage = () => {
  const { normalizedLang } = useOutletContext<OutletContext>();
  const { t } = useTranslation("cartPage");
  const cartProducts = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  const totalSum = cartProducts.reduce((acc, { price, count = MIN_COUNT }) => {
    return acc + price * count;
  }, 0);

  return (
    <>
      <title>{t("title")}</title>

      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(-1)}
      >
        <svg
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
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className="text--sm">{t("back")}</span>
      </button>

      {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
      <h1 id="cart-heading" className={clsx(styles.heading, "title--xl")}>
        {t("cart")}
      </h1>

      <section className={styles.cart} aria-labelledby="cart-heading">
        {cartProducts.length > 0 && (
          <>
            <ul className={styles.products}>
              {cartProducts.map((product) => (
                <CartProduct
                  key={product.id}
                  t={t}
                  product={product}
                  normalizedLang={normalizedLang}
                />
              ))}
            </ul>

            <div className={styles.summary}>
              <h2 className="title--lg">
                <span className="sr-only">{t("orderTotal")}</span>
                {formatPrice(totalSum, normalizedLang)}
              </h2>

              <p className={clsx(styles.summary__total, "text--body")}>
                {t("totalForItems", { count: cartProducts.length })}
              </p>

              <span className={styles.summary__line} />

              <button
                type="button"
                className={clsx(styles.summary__checkout, "text--btn")}
              >
                {t("checkout")}
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default CartPage;
