import Breadcrumb from "../../components/Breadcrumb";
import InfoComponent from "../../components/InfoComponent";
import FeaturesList from "./FeaturesList";
import ImageBox from "./ImageBox";
import CardSection from "./CardSection";
import clsx from "clsx";
import useThemeMode from "../../hooks/useThemeMode";

const ConnectWalletContainer = () => {
  const isLightMode = useThemeMode();

  return (
    <>
      <Breadcrumb namePage="Wallet Connect" title="Wallet Connect" />
      <section
        className={clsx(
          "features section-padding-100 ",
          isLightMode && "bg-light"
        )}
      >
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
