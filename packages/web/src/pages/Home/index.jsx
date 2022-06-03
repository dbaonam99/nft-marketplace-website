import "../../assets/css/home.css";
// import './home.css'
import Head from "../../layouts/HeadV2";
import HomeContainer from "../../containers/Home";
import Footer from "../../layouts/Footer";

const Home = () => {
  return (
    <>
      <Head Title="Home" />
      <HomeContainer />
      <Footer />
    </>
  );
};

export default Home;
