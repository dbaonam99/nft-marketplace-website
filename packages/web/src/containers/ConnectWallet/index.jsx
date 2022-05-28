import Breadcrumb from "../../components/Breadcrumb";
import InfoComponent from "../../components/InfoComponent";
import FeaturesList from "./FeaturesList";
import ImageBox from "./ImageBox";
import CardSection from "./CardSection";
import clsx from "clsx";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";

const ConnectWalletContainer = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb
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
