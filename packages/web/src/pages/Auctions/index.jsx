import Head from '../../layouts/Head';
import AuctionsContainer from '../../containers/Auctions';
import Footer from '../../layouts/Footer';
import { useTranslation } from 'react-i18next';
function Auctions(){
  const { t } = useTranslation();

  return(
    <>
      <Head Title={t("common.auctions")} />
      <AuctionsContainer />
      <Footer />
    </>
  )
}

export default Auctions