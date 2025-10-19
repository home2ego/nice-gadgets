import { useTranslation } from "react-i18next";
import accessories from "../../api/accessories.json";
import TopHeader from "../shared/components";

const countModels = accessories.length;

const AccessoriesPage = () => {
  const { t } = useTranslation("accessoriesPage");

  return (
    <>
      <title>{t("title")}</title>

      <TopHeader t={t} heading="accessories" countModels={countModels} />
    </>
  );
};

export default AccessoriesPage;
