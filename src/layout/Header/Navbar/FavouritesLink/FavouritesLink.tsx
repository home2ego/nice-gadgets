import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/core/store/hooks";
import Count from "../Count";
import type { LinkProps } from "../linkProps";
import styles from "./FavouritesLink.module.scss";

const FavouritesLink: React.FC<LinkProps> = ({ t, onLinkClick }) => {
  const favouritesProducts = useAppSelector((state) => state.favourites);
  const favouritesCount = favouritesProducts.length;

  return (
    <NavLink
      to="/favorites"
      aria-label={
        favouritesCount > 0
          ? t("favouritesLabelWithCount", { count: favouritesCount })
          : t("favouritesLabelEmpty")
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
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </svg>

        {favouritesCount > 0 && <Count quantity={favouritesCount} />}
      </div>
    </NavLink>
  );
};

export default FavouritesLink;
