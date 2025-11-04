import { useTranslation } from "react-i18next";
import products from "@/api/products.json";
import Breadcrumb from "../shared/components/Breadcrumb";
import SectionContent from "../shared/components/SectionContent";
import type { Category } from "../shared/types/category";

const tablets = products.filter((product) => {
  return (product.category as Category) === "tablets";
});
const countModels = tablets.length;

const TabletsPage = () => {
  const { t } = useTranslation("tabletsPage");

  return (
    <>
      <title>{t("title")}</title>

      <Breadcrumb t={t} heading="tablets" />

      <SectionContent
        t={t}
        sectionHeading="tablets"
        countModels={countModels}
        products={tablets}
      />
    </>
  );
};

export default TabletsPage;
