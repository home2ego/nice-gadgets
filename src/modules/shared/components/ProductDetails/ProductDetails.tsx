import clsx from "clsx";
import type { TFunction } from "i18next";
import styles from "./ProductDetails.module.scss";

interface ProductDetailsProps {
  t: TFunction;
  screen: string;
  capacity: string;
  ram: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  t,
  screen,
  capacity,
  ram,
}) => (
  <dl className={clsx(styles.details, "text--sm")}>
    <div className={styles.details__detail}>
      <dt className={styles.details__title}>{t("screen")}</dt>
      <dd>{screen}</dd>
    </div>

    <div className={styles.details__detail}>
      <dt className={styles.details__title}>{t("capacity")}</dt>
      <dd>{capacity}</dd>
    </div>

    <div className={styles.details__detail}>
      <dt className={styles.details__title}>RAM</dt>
      <dd>{ram}</dd>
    </div>
  </dl>
);

export default ProductDetails;
