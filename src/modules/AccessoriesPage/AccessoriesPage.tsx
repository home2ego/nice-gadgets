import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import Breadcrumb from "@/modules/shared/components/Breadcrumb";
import ProductsSection from "@/modules/shared/components/ProductsSection";
import type { OutletContext } from "../shared/types/outletContext";
import { getProductsByCategory } from "../shared/utils/getProductsByCategory";

const accessories = getProductsByCategory("accessories");
const countAccessories = accessories.length;

const AccessoriesPage = () => {
  const { footerRef, normalizedLang } = useOutletContext<OutletContext>();
  const { t } = useTranslation("accessoriesPage");

  return (
    <>
      <title>{t("title")}</title>

      <Breadcrumb t={t} heading="accessories" />

      <ProductsSection
        t={t}
        sectionHeading="accessories"
        noProducts="noAccessories"
        countModels={countAccessories}
        products={accessories}
        footerRef={footerRef}
        normalizedLang={normalizedLang}
      />
    </>
  );
};

export default AccessoriesPage;
