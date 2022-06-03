import Head from '../../layouts/HeadV2';
import ActivityContainer from '../../containers/Activity';
import Footer from '../../layouts/Footer';
import { useTranslation } from 'react-i18next';

// import '../../assets/css/activity.css'
// import './activity.css'

const Activity = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head Title={t("header.activity")} />
      <ActivityContainer />
      <Footer />
    </>
  );
}

export default Activity;