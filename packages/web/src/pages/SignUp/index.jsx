import Head from '../../layouts/HeadV2';
import SignUpContainer from '../../containers/SignUp';
import Footer from '../../layouts/Footer';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
	const { t } = useTranslation();

	return (
		<>
			<Head Title={t("common.signUp")} />
			<SignUpContainer />
			<Footer />
		</>
	);
}

export default SignUp;

