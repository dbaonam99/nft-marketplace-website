import Head from "../../layouts/HeadV2";
import MyProfileContainer from "../../containers/MyProfile";
import Footer from "../../layouts/Footer";
import { useTranslation } from "react-i18next";

const MyProfile = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head Title={t("header.authorProfile")} />
      <MyProfileContainer />
      <Footer />
    </>
  );
};

export default MyProfile;
