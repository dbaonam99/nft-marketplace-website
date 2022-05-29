import Head from '../../layouts/Head';
import LoginContainer from '../../containers/Login';
import Footer from '../../layouts/Footer';
import { useTranslation } from 'react-i18next';

const Login = () => {
	const { t } = useTranslation();

  return (
  	<>
		<Head Title={t("common.login")} />
		<LoginContainer />
		<Footer />
	</>

  );
}

export default Login;

