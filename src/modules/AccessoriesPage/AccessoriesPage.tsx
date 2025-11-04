import { useTranslation } from "react-i18next";
import products from "@/api/products.json";
import Breadcrumb from "@/modules/shared/components/Breadcrumb";
import SectionContent from "@/modules/shared/components/SectionContent";
import type { Category } from "../shared/types/category";

const accessories = products.filter((product) => {
  return (product.category as Category) === "accessories";
});
const countModels = accessories.length;

const AccessoriesPage = () => {
  const { t } = useTranslation("accessoriesPage");

  return (
    <>
      <title>{t("title")}</title>

      <Breadcrumb t={t} heading="accessories" />

      <SectionContent
        t={t}
        sectionHeading="accessories"
        countModels={countModels}
        products={accessories}
      />
    </>
  );
};

export default AccessoriesPage;
