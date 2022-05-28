import Head from '../../layouts/Head';
import ProfileContainer from '../../containers/Profile';
import Footer from '../../layouts/Footer';
import { useTranslation } from 'react-i18next';

// import '../../assets/css/profile.css'

const Profile = () => {
  const { t } = useTranslation();

  return (
    <>
		<Head Title={t("header.authorProfile")} />
		<ProfileContainer />
		<Footer />
    </>
  );
}

export default Profile;