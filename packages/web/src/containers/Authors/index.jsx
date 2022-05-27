import Breadcrumb from "../../components/Breadcrumb";
import TopSellers from "../../components/TopSellers";
import CardSection from "./CardSection";

const AuthorsContainer = () => {
  return (
    <>
      <Breadcrumb namePage="Authors" title="Authors" />
      <TopSellers />
      <CardSection />
    </>
  );
};

export default AuthorsContainer;
