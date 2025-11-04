import { useTranslation } from "react-i18next";
import Breadcrumb from "@/modules/shared/components/Breadcrumb";
import SectionContent from "@/modules/shared/components/SectionContent";
import { getProductsByCategory } from "../shared/utils/getProductsByCategory";

const phones = getProductsByCategory("phones");
const countPhones = phones.length;

const PhonesPage = () => {
  const { t } = useTranslation("phonesPage");

  return (
    <>
      <title>{t("title")}</title>

      <Breadcrumb t={t} heading="phones" />

      <SectionContent
        t={t}
        sectionHeading="phones"
        countModels={countPhones}
        products={phones}
      />
    </>
  );
};

export default PhonesPage;
