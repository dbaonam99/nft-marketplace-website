import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/Breadcrumb"
import TopSellers from "../../components/TopSellers"
import CardSection from "./CardSection"

const AuthorsContainer = () => {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb
        namePage={t("header.authors")}
        title={t("header.authors")}
      />
      <TopSellers />
      <CardSection />
    </>
  );
};

export default AuthorsContainer;
