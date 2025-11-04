import { useTranslation } from "react-i18next";
import Breadcrumb from "../shared/components/Breadcrumb";
import SectionContent from "../shared/components/SectionContent";
import { getProductsByCategory } from "../shared/utils/getProductsByCategory";

const tablets = getProductsByCategory("tablets");
const countTablets = tablets.length;

const TabletsPage = () => {
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
      />
    </>
  );
};

export default TabletsPage;
