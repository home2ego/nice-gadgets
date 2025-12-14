import styles from "./ProductDetailsSkeleton.module.scss";

const ProductDetailsSkeleton = () => {
  return (
    <>
      <div className={styles.breadcrumb} />

      <div className={styles.back} />

      <div className={styles.heading} />

      <div className={styles.overview}>
        <div className={styles.overview__image} />

        <div className={styles.overview__thumbnails}>
          <div className={styles.thumbnail} />
          <div className={styles.thumbnail} />
          <div className={styles.thumbnail} />
        </div>

        <div className={styles.overview__details}>
          <div className={styles.colors}>
            <div className={styles.colors__title} />

            <div className={styles.colors__wrapper}>
              <span className={styles.colors__color} />
              <span className={styles.colors__color} />
              <span className={styles.colors__color} />
            </div>
          </div>

          <div className={styles.variant}>
            <div className={styles.variant__title} />

            <div className={styles.variant__wrapper}>
              <span className={styles.variant__option} />
              <span className={styles.variant__option} />
              <span className={styles.variant__option} />
              <span className={styles.variant__option} />
            </div>
          </div>

          <div className={styles.prices} />
          <div className={styles.controls} />
          <div className={styles.tech} />

          <span className={styles.id} />
        </div>
      </div>
    </>
  );
};

export default ProductDetailsSkeleton;
