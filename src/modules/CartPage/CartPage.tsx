import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import { clearCart } from "@/core/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import Icon from "@/layout/shared/components/Icon";
import type { OutletContext } from "../shared/types/outletContext";
import { formatPrice } from "../shared/utils/priceUtils";
import CartEmpty from "./CartEmpty";
import styles from "./CartPage.module.scss";
import CartProduct from "./CartProduct";
import { calculateCartTotals } from "./calculateCartTotals";
import Dialog from "./Dialog";

const CartPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { normalizedLang } = useOutletContext<OutletContext>();
  const { t } = useTranslation("cartPage");
  const navigate = useNavigate();
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
      <h1 id="cart" className={clsx(styles.heading, "title--xl")}>
        {t("cart")}
      </h1>

      {cartProducts.length === 0 && <CartEmpty t={t} />}

      {cartProducts.length > 0 && (
        <section className={styles.cart} aria-labelledby="cart">
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
      )}

      <Dialog
        t={t}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onClear={handleCartClear}
      />
    </>
  );
};

export default CartPage;
