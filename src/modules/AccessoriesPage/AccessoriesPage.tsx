import { useTranslation } from "react-i18next";
import Breadcrumb from "@/modules/shared/components/Breadcrumb";
import SectionContent from "@/modules/shared/components/SectionContent";
import { getProductsByCategory } from "../shared/utils/getProductsByCategory";

const accessories = getProductsByCategory("accessories");
const countAccessories = accessories.length;

const AccessoriesPage = () => {
  const { t } = useTranslation("accessoriesPage");

  return (
    <>
      <title>{t("title")}</title>

      <Breadcrumb t={t} heading="accessories" />

      <SectionContent
        t={t}
        sectionHeading="accessories"
        countModels={countAccessories}
        products={accessories}
      />
    </>
  );
};

export default AccessoriesPage;
