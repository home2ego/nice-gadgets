import clsx from "clsx";
import type { TFunction } from "i18next";
import { formatWithRate } from "../../utils/priceUtils";
import styles from "./ProductPrices.module.scss";

interface ProductPricesProps {
  hasOnlyFullPrice: boolean;
  t: TFunction;
  price: number;
  fullPrice: number;
  normalizedLang: string;
}

const ProductPrices: React.FC<ProductPricesProps> = ({
  hasOnlyFullPrice,
  t,
  price,
  fullPrice,
  normalizedLang,
}) => (
  <div className={clsx(styles.prices, "title--sm")}>
    {hasOnlyFullPrice ? (
      <p>{formatWithRate(fullPrice, normalizedLang)}</p>
    ) : (
      <>
        <p>
          {formatWithRate(price, normalizedLang)}
          <span className="sr-only">{t("priceLabel")}</span>
        </p>

        <p className={styles["prices__full-price"]}>
          {formatWithRate(fullPrice, normalizedLang)}
          <span className="sr-only">{t("fullPriceLabel")}</span>
        </p>
      </>
    )}
  </div>
);

export default ProductPrices;
