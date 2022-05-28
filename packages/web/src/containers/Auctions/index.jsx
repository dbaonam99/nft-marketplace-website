import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/Breadcrumb"
import LiveAuctions from "../../components/LiveAuctions"

const AuctionsContainer = () => {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb
        namePage={t("common.auctions")}
        title={t("common.auctions")}
      />
      <LiveAuctions />
    </>
  );
};

export default AuctionsContainer;
