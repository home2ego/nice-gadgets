import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import Breadcrumb from "@/modules/shared/components/Breadcrumb";
import ProductsSection from "../shared/components/ProductsSection";
import type { OutletContext } from "../shared/types/outletContext";
import type { Product } from "../shared/types/product";
import { getProductsByCategory } from "../shared/utils/getProductsByCategory";

const phones = getProductsByCategory("phones") as Product[];
const countPhones = phones.length;

const PhonesPage = () => {
  const { footerRef, normalizedLang } = useOutletContext<OutletContext>();
  const { t } = useTranslation();

  return (
    <>
      <title>{t("phonesPageTitle")}</title>

      <Breadcrumb t={t} heading="phones" />

      <ProductsSection
        t={t}
        sectionHeading="phones"
        noProducts="noPhones"
        countModels={countPhones}
        products={phones}
        footerRef={footerRef}
        normalizedLang={normalizedLang}
      />
    </>
  );
};

export default PhonesPage;
