import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./RightsPage.module.scss";

const RightsPage = () => {
  const { t } = useTranslation("rightsPage");

  return (
    <>
      <title>{t("rightsPageTitle")}</title>

      <h1 className={clsx(styles.heading, "title--xl")}>{t("rights")}</h1>

      <section>
        <ul className={clsx(styles.list, "text--body")}>
          <li className={styles.list__item}>{t("items.explore")}</li>
          <li className={styles.list__item}>{t("items.privacy")}</li>
          <li className={styles.list__item}>{t("items.demo")}</li>

          <li className={styles.list__item}>
            {t("items.contact")}
            <Link
              to="/contacts"
              className={clsx(styles.link, "text--uppercase")}
            >
              <span className={styles.link__text}>{t("contactLink")}</span>
            </Link>
            .
          </li>
        </ul>
      </section>
    </>
  );
};

export default RightsPage;
