import { useTranslation } from "react-i18next";
import accessories from "@/api/accessories.json";
import Breadcrumb from "@/modules/shared/components/Breadcrumb";
import SectionContent from "@/modules/shared/components/SectionContent";

const countModels = accessories.length;

const AccessoriesPage = () => {
  const { t } = useTranslation("accessoriesPage");

  return (
    <>
      <title>{t("title")}</title>

      <Breadcrumb t={t} heading="accessories" />

      <SectionContent
        t={t}
        heading="accessories"
        countModels={countModels}
        items={accessories}
      />
    </>
  );
};

export default AccessoriesPage;
