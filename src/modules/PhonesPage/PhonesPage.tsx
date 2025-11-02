import { useTranslation } from "react-i18next";
import phones from "@/api/phones.json";
import Breadcrumb from "@/modules/shared/components/Breadcrumb";
import SectionContent from "@/modules/shared/components/SectionContent";

const countModels = phones.length;

const PhonesPage = () => {
  const { t } = useTranslation("phonesPage");

  return (
    <>
      <title>{t("title")}</title>

      <Breadcrumb t={t} heading="phones" />

      <SectionContent
        t={t}
        sectionHeading="phones"
        countModels={countModels}
        items={phones}
      />
    </>
  );
};

export default PhonesPage;
