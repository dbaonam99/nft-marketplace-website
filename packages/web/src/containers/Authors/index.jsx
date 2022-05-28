import { useTranslation } from 'react-i18next';
import Breadcumb from '../../components/Breadcumb'
import TopSellers from '../../components/TopSellers'
import CardSection from './CardSection'

const AuthorsContainer = () => {
  const { t } = useTranslation();

  return (
    <>
			<Breadcumb  
				namePage={t("header.authors")}
				title={t("header.authors")}
			/>
			<TopSellers />
			<CardSection />
    </>
  );
}

export default AuthorsContainer;