import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/Breadcrumb"
import TopSellers from "../../components/TopSellers"
import { useTopSellerQuery } from "../../queries/NFT";
import CardSection from "./CardSection"

const AuthorsContainer = () => {
  const { t } = useTranslation();
  const { data: topSellers, isLoading } = useTopSellerQuery();

  return (
    <>
      <Breadcrumb
        namePage={t("header.authors")}
        title={t("header.authors")}
      />
      <TopSellers data={topSellers} isLoading={isLoading} />
      <CardSection />
    </>
  );
};

export default AuthorsContainer;
