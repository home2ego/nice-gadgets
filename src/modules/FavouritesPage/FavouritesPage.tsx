import clsx from "clsx";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../shared/components/Breadcrumb";
import styles from "./FavouritesPage.module.scss";

const FavouritesPage = () => {
  const { t } = useTranslation("favouritesPage");

  return (
    <>
      <title>{t("title")}</title>

      <Breadcrumb t={t} heading="favourites" />

      <section aria-labelledby="favourites-heading">
        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <h1
          id="favourites-heading"
          className={clsx(styles.heading, "title--xl")}
        >
          {t("favourites")}
        </h1>

        <p className={clsx(styles.items, "text--body")}>
          {t("countItems", { count: 0 })}
        </p>
      </section>
    </>
  );
};

export default FavouritesPage;
