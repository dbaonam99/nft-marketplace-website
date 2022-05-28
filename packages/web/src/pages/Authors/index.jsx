import Head from '../../layouts/Head';
import AuthorsContainer from '../../containers/Authors';
import Footer from '../../layouts/Footer';
import { useTranslation } from 'react-i18next';

const Authors = () => {
  const { t } = useTranslation();

  return (
    <>
		<Head Title={t("header.authors")} />
		<AuthorsContainer />
		<Footer />
    </>
  );
}

export default Authors;

