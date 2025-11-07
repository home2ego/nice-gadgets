import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import Breadcrumb from "../shared/components/Breadcrumb";
import SectionContent from "../shared/components/SectionContent";
import type { OutletContext } from "../shared/types/outletContext";
import { getProductsByCategory } from "../shared/utils/getProductsByCategory";

const tablets = getProductsByCategory("tablets");
const countTablets = tablets.length;

const TabletsPage = () => {
  const { footerRef, normalizedLang } = useOutletContext<OutletContext>();
  const { t } = useTranslation("tabletsPage");

  return (
    <>
      <title>{t("title")}</title>

      <Breadcrumb t={t} heading="tablets" />

      <SectionContent
        t={t}
        sectionHeading="tablets"
        countModels={countTablets}
        products={tablets}
        footerRef={footerRef}
        normalizedLang={normalizedLang}
      />
    </>
  );
};

export default TabletsPage;
