import { useTranslation } from "react-i18next";
import tablets from "../../api/tablets.json";
import Breadcrumb from "../shared/components/Breadcrumb";
import SectionContent from "../shared/components/SectionContent";

const countModels = tablets.length;

const TabletsPage = () => {
  const { t } = useTranslation("tabletsPage");

  return (
    <>
      <title>{t("title")}</title>

      <Breadcrumb t={t} heading="tablets" />

      <SectionContent
        t={t}
        sectionHeading="tablets"
        countModels={countModels}
        items={tablets}
      />
    </>
  );
};

export default TabletsPage;
