import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import Breadcrumb from "../shared/components/Breadcrumb";
import ProductsSection from "../shared/components/ProductsSection";
import type { OutletContext } from "../shared/types/outletContext";
import { getProductsByCategory } from "../shared/utils/getProductsByCategory";

const tablets = getProductsByCategory("tablets");
const countTablets = tablets.length;

const TabletsPage = () => {
  const { footerRef, normalizedLang } = useOutletContext<OutletContext>();
  const { t } = useTranslation();

  return (
    <>
      <title>{t("tabletsPageTitle")}</title>

      <Breadcrumb t={t} heading="tablets" />

      <ProductsSection
        t={t}
        sectionHeading="tablets"
        noProducts="noTablets"
        countModels={countTablets}
        products={tablets}
        footerRef={footerRef}
        normalizedLang={normalizedLang}
      />
    </>
  );
};

export default TabletsPage;
