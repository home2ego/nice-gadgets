import clsx from "clsx";
import { useState } from "react";
import { Blurhash } from "react-blurhash";
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
  heading: string;
  countModels: number;
  blurhash: string;
}

const categoryCards: CategoryCards[] = [
  {
    id: 1,
    path: "/phones",
    src: imgCategoryPhones,
    heading: "headingPhones",
    countModels: phones.length,
    blurhash: "LWOfrm~VFg0fyDNHjEt6T1NGs-xa",
  },
  {
    id: 2,
    path: "/tablets",
    src: imgCategoryTablets,
    heading: "headingTablets",
    countModels: tablets.length,
    blurhash: "LIOCHn8bHD*L]|tlJ;aeLg+a-AK*",
  },
  {
    id: 3,
    path: "/accessories",
    src: imgCategoryAccessories,
    heading: "headingAccessories",
    countModels: accessories.length,
    blurhash: "LVM?rJQ8?K0;yES$k8xBtSozWBob",
  },
];

const ShopByCategory = () => {
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation("homePage");

  return (
    <>
      {categoryCards.map((card) => (
        <Link key={card.id} to={card.path} className={styles.category}>
          <div className={styles.category__wrapper}>
            {!loaded && (
              <Blurhash hash={card.blurhash} width="100%" height="100%" />
            )}

            <img
              className={clsx(
                styles.category__image,
                styles[`category__image--${card.id}`],
                loaded && styles.loaded,
              )}
              src={card.src}
              width="368"
              height="368"
              alt=""
              onLoad={() => setLoaded(true)}
            />
          </div>

          <h3 className={clsx(styles.category__heading, "title--sm")}>
            {t(card.heading)}
          </h3>

          <p className={clsx(styles.category__models, "text--body")}>
            {t("countModels", { count: card.countModels })}
          </p>
        </Link>
      ))}
    </>
  );
};

export default ShopByCategory;
