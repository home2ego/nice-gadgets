import clsx from "clsx";
import { useTranslation } from "react-i18next";
import styles from "./ContactsPage.module.scss";

const ContactsPage = () => {
  const { t } = useTranslation("contactsPage");

  return (
    <>
      <title>{t("contactsPageTitle")}</title>

      <section aria-labelledby="contacts">
        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <h1 id="contacts" className={clsx(styles.heading, "title--xl")}>
          {t("contacts")}
        </h1>

        <dl className={clsx(styles.list, "text--body")}>
          <dt className={styles.list__title}>{t("website")}</dt>
          <dd>
            <a
              className={styles.link}
              href="https://artemzhyrnyi.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={clsx(styles.link__text, "text--btn")}>
                artemzhyrnyi.pages.dev
              </span>
            </a>
          </dd>

          <dt className={styles.list__title}>Email:</dt>
          <dd>
            <a className={styles.link} href="mailto:ic3ego@gmail.com">
              <span className={clsx(styles.link__text, "text--btn")}>
                ic3ego@gmail.com
              </span>
            </a>
          </dd>

          <dt className={styles.list__title}>LinkedIn:</dt>
          <dd>
            <a
              className={styles.link}
              href="https://www.linkedin.com/in/home2ego"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={clsx(styles.link__text, "text--btn")}>
                linkedin.com/in/home2ego
              </span>
            </a>
          </dd>
        </dl>
      </section>
    </>
  );
};

export default ContactsPage;
