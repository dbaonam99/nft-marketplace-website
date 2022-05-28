import { useTranslation } from 'react-i18next';
import Breadcumb from '../../components/Breadcumb'
import LiveAuctions from '../../components/LiveAuctions'

const AuctionsContainer = () => {
  const { t } = useTranslation();

  return (
  	<>
      <Breadcumb  
        namePage={t("common.auctions")}
        title={t("common.auctions")}
      />
      <LiveAuctions />

    </>
  );
}

export default AuctionsContainer;
