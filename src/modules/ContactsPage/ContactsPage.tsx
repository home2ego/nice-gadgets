import clsx from "clsx";
import { useTranslation } from "react-i18next";
import styles from "./ContactsPage.module.scss";

const ContactsPage = () => {
  const { t } = useTranslation("contactsPage");

  return (
    <>
      <title>{t("title")}</title>

      <h1 className={clsx(styles.heading, "title--xl")}>{t("contacts")}</h1>

      <section>
        <h2 className={clsx(styles.subheading, "title--lg")}>
          {t("contactInfo")}
        </h2>

        <dl className={styles.list}>
          <dt className={clsx(styles.list__title, "text--body")}>
            {t("website")}
          </dt>
          <dd className="text--btn">
            <a
              className={styles.link}
              href="https://artemzhyrnyi.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.link__text}>artemzhyrnyi.pages.dev</span>
            </a>
          </dd>

          <dt className={clsx(styles.list__title, "text--body")}>Email:</dt>
          <dd className="text--btn">
            <a className={styles.link} href="mailto:ic3ego@gmail.com">
              <span className={styles.link__text}>ic3ego@gmail.com</span>
            </a>
          </dd>

          <dt className={clsx(styles.list__title, "text--body")}>LinkedIn:</dt>
          <dd className="text--btn">
            <a
              className={styles.link}
              href="https://www.linkedin.com/in/home2ego"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.link__text}>
                www.linkedin.com/in/home2ego
              </span>
            </a>
          </dd>
        </dl>
      </section>
    </>
  );
};

export default ContactsPage;
