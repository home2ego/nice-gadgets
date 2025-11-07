import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import Breadcrumb from "@/modules/shared/components/Breadcrumb";
import SectionContent from "@/modules/shared/components/SectionContent";
import type { OutletContext } from "../shared/types/outletContext";
import { getProductsByCategory } from "../shared/utils/getProductsByCategory";

const phones = getProductsByCategory("phones");
const countPhones = phones.length;

const PhonesPage = () => {
  const { footerRef, normalizedLang } = useOutletContext<OutletContext>();
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
        footerRef={footerRef}
        normalizedLang={normalizedLang}
      />
    </>
  );
};

export default PhonesPage;
