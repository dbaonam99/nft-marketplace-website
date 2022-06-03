import Head from '../../layouts/HeadV2';
import DiscoverContainer from '../../containers/Discover';
import Footer from '../../layouts/Footer';
import { useTranslation } from 'react-i18next';

const Discover = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head Title={t("header.discover")} />
      <DiscoverContainer />
      <Footer />
    </>
  );
}

export default Discover;