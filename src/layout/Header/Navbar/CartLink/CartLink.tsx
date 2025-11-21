import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/core/store/hooks";
import Icon from "@/layout/shared/components/Icon";
import Count from "../Count";
import type { LinkProps } from "../linkProps";
import styles from "./CartLink.module.scss";

const CartLink: React.FC<LinkProps> = ({ t, onLinkClick }) => {
  const cartProducts = useAppSelector((state) => state.cart);
  const cartCount = cartProducts.length;

  return (
    <NavLink
      to="/cart"
      aria-label={
        cartCount > 0
          ? t("cartLabelWithCount", { count: cartCount })
          : t("cartLabelEmpty")
      }
      className="btn--nav-right"
      onClick={onLinkClick}
    >
      <div className={styles.wrapper} aria-hidden="true">
        <Icon>
          <path d="M16 10a4 4 0 0 1-8 0M3.103 6.034h17.794" />
          <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
        </Icon>

        {cartCount > 0 && <Count quantity={cartCount} />}
      </div>
    </NavLink>
  );
};

export default CartLink;
