import clsx from "clsx";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import { getProductsByCategory } from "@/modules/shared/utils/getProductsByCategory";
import styles from "./ShopByCategory.module.scss";

const countPhones = getProductsByCategory("phones").length;
const countTablets = getProductsByCategory("tablets").length;
const countAccessories = getProductsByCategory("accessories").length;

interface CategoryCards {
  id: number;
  path: string;
  src: string;
  heading: string;
  countModels: number;
}

const categoryCards: CategoryCards[] = [
  {
    id: 1,
    path: "/phones",
    src: "/img/category-phones.webp",
    heading: "phones",
    countModels: countPhones,
  },
  {
    id: 2,
    path: "/tablets",
    src: "/img/category-tablets.webp",
    heading: "tablets",
    countModels: countTablets,
  },
  {
    id: 3,
    path: "/accessories",
    src: "/img/category-accessories.webp",
    heading: "accessories",
    countModels: countAccessories,
  },
];

interface CategoryProps {
  t: TFunction;
}

const ShopByCategory: React.FC<CategoryProps> = ({ t }) => (
  <>
    {categoryCards.map((card) => (
      <li key={card.id} className={styles.category}>
        <Link
          to={card.path}
          aria-label={t("viewCategoryLabel", {
            category: t(card.heading),
            count: card.countModels,
          })}
          className={styles.category__link}
        />

        <div className={styles.category__wrapper}>
          <img
            className={clsx(
              styles.category__image,
              styles[`category__image--${card.id}`],
            )}
            src={card.src}
            alt=""
            width="368"
            height="368"
            decoding="async"
          />
        </div>

        <h3 className={clsx(styles.category__heading, "title--sm")}>
          {t(card.heading)}
        </h3>

        <p className={clsx(styles.category__models, "text--body")}>
          {t("countModels", { count: card.countModels })}
        </p>
      </li>
    ))}
  </>
);

export default ShopByCategory;
