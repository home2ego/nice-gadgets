import { clsx } from "clsx";
import type { TFunction } from "i18next";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/core/store/hooks";
import styles from "./CartLink.module.scss";

interface CartLinkProps {
  t: TFunction;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const CartLink: React.FC<CartLinkProps> = ({ t, onLinkClick }) => {
  const cartProducts = useAppSelector((state) => state.cart);

  return (
    <NavLink
      to="/cart"
      aria-label={
        cartProducts.length > 0
          ? t("cartLabelWithCount", { count: cartProducts.length })
          : t("cartLabelEmpty")
      }
      className="btn--nav-right"
      onClick={onLinkClick}
    >
      <div className={styles.wrapper} aria-hidden="true">
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
          <path d="M16 10a4 4 0 0 1-8 0M3.103 6.034h17.794" />
          <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
        </svg>

        {cartProducts.length > 0 && (
          <span className={clsx(styles.count, "text--xs")}>
            {cartProducts.length}
          </span>
        )}
      </div>
    </NavLink>
  );
};

export default CartLink;
