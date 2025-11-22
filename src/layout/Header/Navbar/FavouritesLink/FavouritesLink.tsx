import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/core/store/hooks";
import Icon from "@/layout/shared/components/Icon";
import Count from "../Count";
import type { LinkProps } from "../linkProps";
import styles from "./FavouritesLink.module.scss";

const PATH = "/favourites";

const FavouritesLink: React.FC<LinkProps> = ({ t, onLinkClick }) => {
  const favouritesCount = useAppSelector((state) => state.favourites.length);

  return (
    <NavLink
      to={PATH}
      aria-label={
        favouritesCount > 0
          ? t("favouritesLabelWithCount", { count: favouritesCount })
          : t("favouritesLabelEmpty")
      }
      className="btn--nav-right"
      onClick={onLinkClick}
    >
      <div className={styles.wrapper} aria-hidden="true">
        <Icon>
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </Icon>

        {favouritesCount > 0 && <Count quantity={favouritesCount} />}
      </div>
    </NavLink>
  );
};

export default FavouritesLink;
