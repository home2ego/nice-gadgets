import clsx from "clsx";
import type { TFunction } from "i18next";
import { useState } from "react";
import { Link } from "react-router-dom";
import accessories from "@/api/accessories.json";
import phones from "@/api/phones.json";
import tablets from "@/api/tablets.json";
import imgCategoryAccessories from "@/assets/images/category-accessories.webp";
import imgCategoryPhones from "@/assets/images/category-phones.webp";
import imgCategoryTablets from "@/assets/images/category-tablets.webp";
import { decodeThumbhash } from "@/modules/shared/utils/decodeThumbhash";
import styles from "./ShopByCategory.module.scss";

// IMPORT PRODUCTS AND SPLIT THEM INTO PHONES/TABLETS ETC..

interface CategoryCards {
  id: number;
  path: string;
  src: string;
  heading: string;
  countModels: number;
  thumbhash: string;
}

const categoryCards: CategoryCards[] = [
  {
    id: 1,
    path: "/phones",
    src: imgCategoryPhones,
    heading: "phones",
    countModels: phones.length,
    thumbhash: "5yiKDAI5P4CGaZZ3+GRmT1aFgFOIR5h1BQ",
  },
  {
    id: 2,
    path: "/tablets",
    src: imgCategoryTablets,
    heading: "tablets",
    countModels: tablets.length,
    thumbhash: "oYmGJQoqLlDHeGGddUFvBZV3Bxd4d4CJGA",
  },
  {
    id: 3,
    path: "/accessories",
    src: imgCategoryAccessories,
    heading: "accessories",
    countModels: accessories.length,
    thumbhash: "5ziKIoodwDWJh4g/ZfdsdggIgohyKCc",
  },
];

interface CategoryProps {
  t: TFunction;
}

const ShopByCategory: React.FC<CategoryProps> = ({ t }) => {
  const [loadedMap, setLoadedMap] = useState<{ [id: string]: boolean }>({});

  const handleLoad = (id: number) => {
    setLoadedMap((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  return (
    <>
      {categoryCards.map((card) => (
        <li key={card.id}>
          <Link
            to={card.path}
            className={styles.category}
            aria-label={t("viewCategoryLabel", {
              category: t(card.heading),
              count: card.countModels,
            })}
          >
            <div className={styles.category__wrapper}>
              {!loadedMap[card.id] && (
                <img
                  src={decodeThumbhash(card.thumbhash)}
                  alt=""
                  width="100%"
                  height="100%"
                  style={{ position: "absolute" }}
                  decoding="async"
                />
              )}

              <img
                className={clsx(
                  styles.category__image,
                  styles[`category__image--${card.id}`],
                  loadedMap[card.id] && styles.loaded,
                )}
                src={card.src}
                alt=""
                width="368"
                height="368"
                decoding="sync"
                onLoad={() => handleLoad(card.id)}
              />
            </div>

            <h3 className={clsx(styles.category__heading, "title--sm")}>
              {t(card.heading)}
            </h3>

            <p className={clsx(styles.category__models, "text--body")}>
              {t("countModels", { count: card.countModels })}
            </p>
          </Link>
        </li>
      ))}
    </>
  );
};

export default ShopByCategory;
