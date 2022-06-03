import Head from '../../layouts/HeadV2';
import CreateItemContainer from '../../containers/CreateItem';
import Footer from '../../layouts/Footer';
import { useTranslation } from 'react-i18next';

const CreateItem = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head Title={t("header.createItem")} />
      <CreateItemContainer />
      <Footer />
    </>
  );
}

export default CreateItem;

