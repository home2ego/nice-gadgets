import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import accessories from "../../../../api/accessories.json";
import phones from "../../../../api/phones.json";
import tablets from "../../../../api/tablets.json";
import imgCategoryAccessories from "../../../../assets/images/category-accessories.webp";
import imgCategoryPhones from "../../../../assets/images/category-phones.webp";
import imgCategoryTablets from "../../../../assets/images/category-tablets.webp";
import styles from "./ShopByCategory.module.scss";

interface CategoryCards {
  id: number;
  path: string;
  src: string;
  objectPosition: string;
  heading: string;
  countModels: number;
}

const categoryCards: CategoryCards[] = [
  {
    id: 1,
    path: "/phones",
    src: imgCategoryPhones,
    objectPosition: "75px 35px",
    heading: "headingPhones",
    countModels: phones.length,
  },
  {
    id: 2,
    path: "/tablets",
    src: imgCategoryTablets,
    objectPosition: "60px 60px",
    heading: "headingTablets",
    countModels: tablets.length,
  },
  {
    id: 3,
    path: "/accessories",
    src: imgCategoryAccessories,
    objectPosition: "35px 75px",
    heading: "headingAccessories",
    countModels: accessories.length,
  },
];

interface CategoryProps {
  children: React.ReactNode;
}

const ShopByCategory: React.FC<CategoryProps> = ({ children }) => {
  const { t } = useTranslation("homePage");

  return (
    <section>
      {children}

      <div className={styles.categories}>
        {categoryCards.map((card) => (
          <Link key={card.id} to={card.path} className={styles.category}>
            <div className={styles["category__img-wrapper"]}>
              <img
                style={{ objectPosition: card.objectPosition }}
                src={card.src}
                width="368"
                height="368"
                alt=""
                loading="lazy"
                aria-hidden="true"
              />
            </div>

            <h4 className={clsx(styles.category__heading, "title--sm")}>
              {t(card.heading)}
            </h4>

            <p className={clsx(styles.category__models, "text--body")}>
              {t("countModels", { count: card.countModels })}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
