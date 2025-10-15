import styles from "./CategorySkeleton.module.scss";

const CategorySkeleton = () => (
  <>
    <div className={styles.category}>
      <div className={styles.category__image}></div>
      <div className={styles.category__heading}></div>
      <div className={styles.category__text}></div>
    </div>

    <div className={styles.category}>
      <div className={styles.category__image}></div>
      <div className={styles.category__heading}></div>
      <div className={styles.category__text}></div>
    </div>

    <div className={styles.category}>
      <div className={styles.category__image}></div>
      <div className={styles.category__heading}></div>
      <div className={styles.category__text}></div>
    </div>
  </>
);

export default CategorySkeleton;
