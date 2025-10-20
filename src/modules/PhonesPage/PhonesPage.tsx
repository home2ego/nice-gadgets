import { useTranslation } from "react-i18next";
import phones from "../../api/phones.json";
import Breadcrumb from "../shared/components/Breadcrumb";
import SectionContent from "../shared/components/SectionContent";

const countModels = phones.length;

const PhonesPage = () => {
  const { t } = useTranslation("phonesPage");

  return (
    <>
      <title>{t("title")}</title>

      <Breadcrumb t={t} heading="phones" />

      <SectionContent t={t} heading="phones" countModels={countModels} />
    </>
  );
};

export default PhonesPage;
