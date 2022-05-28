import Head from '../../layouts/Head';
import ConnectWalletContainer from '../../containers/ConnectWallet';
import Footer from '../../layouts/Footer';
import { useTranslation } from 'react-i18next';

const ConnectWallet = () => {
  const { t } = useTranslation();

  return (
    <>
      	<Head Title={t("header.connectWallet")} />
      	<ConnectWalletContainer />
    	<Footer />
    </>
  );
}

export default ConnectWallet;

