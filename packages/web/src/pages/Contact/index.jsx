import Head from '../../layouts/Head';
import ContactContainer from '../../containers/Contact';
import Footer from '../../layouts/Footer';
import { useTranslation } from 'react-i18next';

const Contact = () => {
	const { t } = useTranslation();

  return (
	<>
		<Head Title={t("header.contact")} />
		<ContactContainer />
		<Footer />
	</>
  );
}

export default Contact;

