import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className={styles["not-found"]}>
      <title>404 | Nice Gadgets</title>

      <h1 className={clsx(styles["not-found__heading"], "title--sm")}>
        {t("errorMessage")}
      </h1>

      <img
        src="/img/page-not-found.svg"
        alt=""
        width="250"
        height="240"
        decoding="async"
      />

      <h2 className={clsx(styles["not-found__subheading"], "title--md")}>
        {t("notFound")}
      </h2>

      <Link
        to="/"
        className={clsx(styles["not-found__link"], "text--uppercase")}
      >
        {t("goHomePage")}
      </Link>
    </div>
  );
};

export default NotFound;
