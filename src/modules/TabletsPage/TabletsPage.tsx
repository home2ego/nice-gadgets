import { useTranslation } from "react-i18next";
import tablets from "../../api/tablets.json";
import TopHeader from "../shared/components";

const countModels = tablets.length;

const TabletsPage = () => {
  const { t } = useTranslation("tabletsPage");

  return (
    <>
      <title>{t("title")}</title>

      <TopHeader t={t} heading="tablets" countModels={countModels} />
    </>
  );
};

export default TabletsPage;
