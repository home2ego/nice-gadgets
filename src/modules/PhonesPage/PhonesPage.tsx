import { useTranslation } from "react-i18next";
import phones from "../../api/phones.json";
import TopHeader from "../shared/components";

const countModels = phones.length;

const PhonesPage = () => {
  const { t } = useTranslation("phonesPage");

  return (
    <>
      <title>{t("title")}</title>

      <TopHeader t={t} heading="phones" countModels={countModels} />
    </>
  );
};

export default PhonesPage;
