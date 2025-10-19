import { useTranslation } from "react-i18next";
import BackToHome from "../shared/components";

const AccessoriesPage = () => {
  const { t } = useTranslation("accessoriesPage");

  return (
    <>
      <title>{t("title")}</title>

      <BackToHome t={t} heading="accessoriesHeading" />

      <h1 className="title--xl">{t("accessoriesHeading")}</h1>
    </>
  );
};

export default AccessoriesPage;
