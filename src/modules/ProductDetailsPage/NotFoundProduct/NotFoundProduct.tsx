import clsx from "clsx";
import type { TFunction } from "i18next";
import styles from "./NotFoundProduct.module.scss";

interface NotFoundPageProps {
  t: TFunction;
}

const NotFoundProduct: React.FC<NotFoundPageProps> = ({ t }) => (
  <>
    <title>{t("notFoundProductTitle")}</title>

    <section className={styles.wrapper}>
      <h1 className={clsx(styles.heading, "title--lg")}>
        {t("notFoundProductHeading")}
      </h1>

      <img
        className={styles.image}
        src="/img/product-not-found.svg"
        alt=""
        width="400"
        height="320"
        decoding="async"
      />
    </section>
  </>
);

export default NotFoundProduct;
