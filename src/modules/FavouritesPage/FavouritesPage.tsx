import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { useAppSelector } from "@/core/store/hooks";
import Breadcrumb from "../shared/components/Breadcrumb";
import ProductCard from "../shared/components/ProductCard";
import ProductsTop from "../shared/components/ProductsTop";
import type { OutletContext } from "../shared/types/outletContext";
import styles from "./FavouritesPage.module.scss";

const FavouritesPage = () => {
  const { normalizedLang } = useOutletContext<OutletContext>();
  const { t } = useTranslation("favouritesPage");
  const favouritesProducts = useAppSelector((state) => state.favourites);

  return (
    <>
      <title>{t("favouritesPageTitle")}</title>

      <Breadcrumb t={t} heading="favourites" />

      <section aria-labelledby="favourites">
        <ProductsTop
          headingId="favourites"
          headingText={t("favourites")}
          infoText={t("countItems", { count: favouritesProducts.length })}
        />

        {favouritesProducts.length > 0 && (
          <ul className={styles.products}>
            {favouritesProducts.map((product, idx) => (
              <li key={product.itemId}>
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
