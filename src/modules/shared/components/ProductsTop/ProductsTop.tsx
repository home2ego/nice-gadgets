import clsx from "clsx";
import styles from "./ProductsTop.module.scss";

interface ProductsTopProps {
  headingId: string;
  headingText: string;
  infoText: string;
}

const ProductsTop: React.FC<ProductsTopProps> = ({
  headingId,
  headingText,
  infoText,
}) => (
  <>
    <h1 id={headingId} className={clsx(styles.heading, "title--xl")}>
      {headingText}
    </h1>

    <p className={clsx(styles.info, "text--body")}>{infoText}</p>
  </>
);

export default ProductsTop;
