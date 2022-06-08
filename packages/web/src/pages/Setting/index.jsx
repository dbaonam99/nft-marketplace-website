import Head from '../../layouts/HeadV2';
import SettingContainer from '../../containers/Setting';
import Footer from '../../layouts/Footer';
import { useTranslation } from 'react-i18next';

const CreateItem = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head Title={t("header.updateProfile")} />
      <SettingContainer />
      <Footer />
    </>
  );
}

export default CreateItem;

