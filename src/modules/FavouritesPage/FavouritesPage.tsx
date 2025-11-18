import { useTranslation } from "react-i18next";
import styles from "./FavouritesPage.module.scss";

const FavouritesPage = () => {
  const { t } = useTranslation("favouritesPage");

  return (
    <>
      <title>{t("title")}</title>

      <h1 className={styles.heading}>{t("favourites")}</h1>
    </>
  );
};

export default FavouritesPage;
