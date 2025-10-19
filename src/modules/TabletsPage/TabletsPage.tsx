import { useTranslation } from "react-i18next";
import BackToHome from "../shared/components";

const TabletsPage = () => {
  const { t } = useTranslation("tabletsPage");

  return (
    <>
      <title>{t("title")}</title>

      <BackToHome t={t} heading="tabletsHeading" />

      <h1 className="title--xl">{t("tabletsHeading")}</h1>
    </>
  );
};

export default TabletsPage;
