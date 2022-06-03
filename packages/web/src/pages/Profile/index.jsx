import Head from "../../layouts/HeadV2";
import ProfileContainer from "../../containers/Profile";
import Footer from "../../layouts/Footer";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head Title={t("header.authorProfile")} />
      <ProfileContainer />
      <Footer />
    </>
  );
};

export default Profile;
