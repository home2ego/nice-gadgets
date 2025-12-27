import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { clearCart } from "@/core/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import Back from "../shared/components/Back";
import type { OutletContext } from "../shared/types/outletContext";
import { formatPrice } from "../shared/utils/priceUtils";
import CartEmpty from "./CartEmpty";
import styles from "./CartPage.module.scss";
import CartProduct from "./CartProduct";
import CheckoutDialog from "./CheckoutDialog";
import { calculateCartTotals } from "./calculateCartTotals";

const CartPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { normalizedLang } = useOutletContext<OutletContext>();
  const { t } = useTranslation("cartPage");
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart);
  const checkoutRef = useRef<HTMLButtonElement>(null);
  const prevIsDialogOpen = useRef(isDialogOpen);

  useEffect(() => {
    if (prevIsDialogOpen.current && !isDialogOpen) {
      checkoutRef.current?.focus();
    }

    prevIsDialogOpen.current = isDialogOpen;
  }, [isDialogOpen]);

  const { totalSum, totalCount } = calculateCartTotals(
    cartProducts,
    normalizedLang,
  );

  const handleCartClear = () => {
    setIsDialogOpen(false);
    dispatch(clearCart());
  };

  return (
    <>
      <title>{t("cartPageTitle")}</title>

      {cartProducts.length === 0 && <CartEmpty t={t} />}

      {cartProducts.length > 0 && (
        <>
          <Back t={t} />

          <h1 id="cart" className={clsx(styles.heading, "title--xl")}>
            {t("cart")}
          </h1>

          <section aria-labelledby="cart" className={styles.cart}>
            <ul className={styles.cart__products}>
              {cartProducts.map((product) => (
                <CartProduct
                  key={product.itemId}
                  t={t}
                  product={product}
                  normalizedLang={normalizedLang}
                />
              ))}
            </ul>

            <div className={styles.cart__summary}>
              <h2 className="title--lg">
                <span className="sr-only">{t("orderTotal")}</span>
                {formatPrice(totalSum, normalizedLang)}
              </h2>

              <p className={clsx(styles.cart__total, "text--body")}>
                {t("totalForItems", { count: totalCount })}
              </p>

              <span className={styles.cart__line} />

              <button
                type="button"
                aria-haspopup="dialog"
                className={clsx(styles.cart__checkout, "text--btn")}
                onClick={() => setIsDialogOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsDialogOpen(true);
                  }
                }}
                ref={checkoutRef}
              >
                {t("checkout")}
              </button>
            </div>
          </section>
        </>
      )}

      <CheckoutDialog
        t={t}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onClear={handleCartClear}
      />
    </>
  );
};

export default CartPage;
