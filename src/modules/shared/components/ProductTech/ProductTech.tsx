import type { TFunction } from "i18next";
import styles from "./ProductTech.module.scss";

interface ProductTechProps {
  t: TFunction;
  productDetails: { key: string; value: string | string[] | undefined }[];
}

const ProductTech: React.FC<ProductTechProps> = ({ t, productDetails }) => (
  <dl className={"text--sm"}>
    {productDetails.map(({ key, value }, idx) => {
      if (!value) {
        return null;
      } else {
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: Safe to use index as key here
          <div key={idx} className={styles.details}>
            <dt className={styles.details__title}>{t(key)}</dt>
            <dd>{Array.isArray(value) ? value.join(", ") : value}</dd>
          </div>
        );
      }
    })}
  </dl>
);

export default ProductTech;
