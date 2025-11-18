import { useTranslation } from "react-i18next";
import Breadcrumb from "../shared/components/Breadcrumb";

const FavouritesPage = () => {
  const { t } = useTranslation("favouritesPage");

  return (
    <>
      <title>{t("title")}</title>

      <Breadcrumb t={t} heading="favourites" />
    </>
  );
};

export default FavouritesPage;
