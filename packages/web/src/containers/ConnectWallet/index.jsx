import Breadcumb from "../../components/Breadcumb";
import InfoComponent from "../../components/InfoComponent";
import FeaturesList from "./FeaturesList";
import ImageBox from "./ImageBox";
import CardSection from "./CardSection";
import { useAuth } from "../../auth/account";
import { useEffect } from "react";

const ConnectWalletContainer = () => {
  const { getUserAddress } = useAuth();

  useEffect(() => {
    getUserAddress("0x8C1bB3eb266b6416278a039de9b61b546093C437");
  }, []);

  return (
    <>
      <Breadcumb namePage="Wallet Connect" title="Wallet Connect" />
      <section className="features section-padding-100 ">
        <div className="container">
          <InfoComponent
            titleSm="Connect Your Wallet"
            titleLg="Connect Wallet"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo."
          />
          <div className="row">
            <FeaturesList />
            <ImageBox />
          </div>
        </div>
      </section>
      <CardSection />
    </>
  );
};

export default ConnectWalletContainer;
