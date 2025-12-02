import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className={clsx(styles["not-found"], "container")}>
      <title>404 | Nice Gadgets</title>

      <h1 className={clsx(styles["not-found__heading"], "title--md")}>
        {t("errorMessage")}
      </h1>

      <img
        src="/img/page-not-found.svg"
        alt=""
        width="300"
        height="288"
        decoding="async"
      />

      <h2 className={clsx(styles["not-found__subheading"], "title--lg")}>
        {t("notFoundPage")}
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

export default NotFoundPage;
