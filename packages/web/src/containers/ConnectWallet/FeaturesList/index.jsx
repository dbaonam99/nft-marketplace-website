import { useMoralis } from "react-moralis";
import { useTranslation } from "react-i18next";

import { ConnectWalletIconsw1, ConnectWalletIconsw4 } from "../../../utils/allImgs";
import ConnectWalletIconswallet from "../../../assets/img/icons/wallet.png";
import useThemeMode from "../../../hooks/useThemeMode";

const FeaturesList = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const { authenticate, isAuthenticated } = useMoralis();

  const connectToMetaMask = async () => {
    authenticate();
  };

  return (
    <>
      <div className="service-img-wrapper col-lg-5 col-md-12 col-sm-12 no-padding-right">
        <div className="features-list">
          <div className="who-we-contant text-center">
            <img
              src={ConnectWalletIconswallet}
              className="mb-15"
              width="90"
              alt=""
            />
            <h4
              className={isLightMode ? "text-dark mb-30" : "w-text mb-30"}
              data-wow-delay="0.3s"
            >
              {t("connectWallet.connectYourWalletDescription")}
            </h4>
            <div
              className={
                isLightMode
                  ? "pricing-item v2 bt-border bg-light text-dark"
                  : "pricing-item v2"
              }
              onClick={connectToMetaMask}
            >
              <img
                src={ConnectWalletIconsw1}
                width="30"
                className="wal-icon"
                alt=""
              />
              {isAuthenticated
                ? t("connectWallet.connected")
                : t("connectWallet.connectMetaMask")}
            </div>

            <div
              className={
                isLightMode
                  ? "pricing-item v2 bt-border bg-light text-dark"
                  : "pricing-item v2"
              }
            >
              <img
                src={ConnectWalletIconsw4}
                width="30"
                className="wal-icon"
                alt=""
              />
              Torus (Coming soon)
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesList;
