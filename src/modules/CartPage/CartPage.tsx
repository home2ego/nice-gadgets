import clsx from "clsx";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAppSelector } from "@/core/store/hooks";
import Icon from "@/layout/shared/components/Icon";
import type { OutletContext } from "../shared/types/outletContext";
import { formatPrice } from "../shared/utils/priceUtils";
import CartEmpty from "./CartEmpty";
import styles from "./CartPage.module.scss";
import CartProduct from "./CartProduct";
import { calculateCartTotals } from "./calculateCartTotals";

const CartPage = () => {
  const { normalizedLang } = useOutletContext<OutletContext>();
  const { t } = useTranslation("cartPage");
  const cartProducts = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { totalSum, totalCount } = calculateCartTotals(
    cartProducts,
    normalizedLang,
  );

  return (
    <>
      <title>{t("title")}</title>

      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(-1)}
      >
        <Icon>
          <path d="m15 18-6-6 6-6" />
        </Icon>
        <span className="text--sm">{t("back")}</span>
      </button>

      {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
      <h1 id="cart-heading" className={clsx(styles.heading, "title--xl")}>
        {t("cart")}
      </h1>

      {cartProducts.length === 0 && <CartEmpty t={t} />}

      {cartProducts.length > 0 && (
        <section className={styles.cart} aria-labelledby="cart-heading">
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
              {t("totalForItems", { count: totalCount })}
            </p>

            <span className={styles.summary__line} />

            <button
              type="button"
              className={clsx(styles.summary__checkout, "text--btn")}
              onClick={() => dialogRef.current?.showModal()}
            >
              {t("checkout")}
            </button>
          </div>
        </section>
      )}

      <dialog
        ref={dialogRef}
        closedby="any"
        className={styles.dialog}
        aria-labelledby="not-available-title"
        aria-describedby="not-available-desc"
      >
        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <h2 id="not-available-title" className="title--lg">
          {t("notAvailableTitle")}
        </h2>

        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <p
          id="not-available-desc"
          className={clsx(styles.dialog__message, "text--body")}
        >
          {t("notAvailableMessage")}
        </p>

        <button
          type="button"
          className={clsx(styles.dialog__ok, "text--btn")}
          onClick={() => dialogRef.current?.close()}
        >
          OK
        </button>
      </dialog>
    </>
  );
};

export default CartPage;
