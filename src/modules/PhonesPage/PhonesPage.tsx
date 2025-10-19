import { useTranslation } from "react-i18next";
import BackToHome from "../shared/components";

const PhonesPage = () => {
  const { t } = useTranslation("phonesPage");

  return (
    <>
      <title>{t("title")}</title>

      <BackToHome t={t} heading="phonesHeadingShort" />

      <h1 className="title--xl">{t("phonesHeading")}</h1>
    </>
  );
};

export default PhonesPage;
