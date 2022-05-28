import Breadcumb from "../../components/Breadcumb";
import InfoComponent from "../../components/InfoComponent";
import FeaturesList from "./FeaturesList";
import ImageBox from "./ImageBox";
import CardSection from "./CardSection";
import { useAuth } from "../../auth/account";
import { useEffect } from "react";
import clsx from "clsx";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";

const ConnectWalletContainer = () => {
  const { getUserAddress } = useAuth();
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  useEffect(() => {
    getUserAddress("0x8C1bB3eb266b6416278a039de9b61b546093C437");
  }, []);

  return (
    <>
      <Breadcumb 
        namePage={t("header.connectWallet")} 
        title={t("header.connectWallet")} 
      />
      <section 
        className={
          clsx(
            "features section-padding-100 ",
            isLightMode && "bg-light"
          )
        }
      >
        <div className="container">
          <InfoComponent
            titleSm={t("connectWallet.connectYourWallet")}
            titleLg={t("header.connectWallet")}
            text={t("connectWallet.connectYourWalletDescription")}
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
