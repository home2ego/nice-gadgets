import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { useAppSelector } from "@/core/store/hooks";
import Breadcrumb from "../shared/components/Breadcrumb";
import ProductCard from "../shared/components/ProductCard";
import type { OutletContext } from "../shared/types/outletContext";
import styles from "./FavouritesPage.module.scss";

const FavouritesPage = () => {
  const { normalizedLang } = useOutletContext<OutletContext>();
  const { t } = useTranslation("favouritesPage");
  const favouritesProducts = useAppSelector((state) => state.favourites);

  return (
    <>
      <title>{t("title")}</title>

      <Breadcrumb t={t} heading="favourites" />

      <section aria-labelledby="favourites-heading">
        {/* biome-ignore lint/correctness/useUniqueElementIds: unique per page */}
        <h1
          id="favourites-heading"
          className={clsx(styles.heading, "title--xl")}
        >
          {t("favourites")}
        </h1>

        <p className={clsx(styles.items, "text--body")}>
          {t("countItems", { count: favouritesProducts.length })}
        </p>

        {favouritesProducts.length > 0 && (
          <ul className={styles.products}>
            {favouritesProducts.map((product, idx) => (
              <li key={product.id}>
                <ProductCard
                  t={t}
                  product={product}
                  totalProducts={favouritesProducts.length}
                  productIdx={idx}
                  loading={idx < 12 ? "eager" : "lazy"}
                  hasOnlyFullPrice={false}
                  normalizedLang={normalizedLang}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default FavouritesPage;
