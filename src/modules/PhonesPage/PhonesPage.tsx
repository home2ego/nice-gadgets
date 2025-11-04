import { useTranslation } from "react-i18next";
import products from "@/api/products.json";
import Breadcrumb from "@/modules/shared/components/Breadcrumb";
import SectionContent from "@/modules/shared/components/SectionContent";
import type { Category } from "../shared/types/category";

const phones = products.filter((product) => {
  return (product.category as Category) === "phones";
});
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
        products={phones}
      />
    </>
  );
};

export default PhonesPage;
