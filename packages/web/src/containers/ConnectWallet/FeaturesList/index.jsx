import { useMoralis } from "react-moralis";
import { useTranslation } from "react-i18next";

import { ConnectWalletIconsw1 } from "../../../utils/allImgs";
import ConnectWalletIconswallet from "../../../assets/img/icons/wallet.png";
import useThemeMode from "../../../hooks/useThemeMode";

const FeaturesList = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const { authenticate, isAuthenticated, user } = useMoralis();

  const connectToMetaMask = async () => {
    // if (isAuthenticated) return;
    authenticate();
  };

  console.log("user", user?.get("ethAddress"));

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
              Kết nối tới ví của bạn để bắt đầu sưu tầm, mua và bán các NFT.
              {t("connectWallet.connectYourWalletDescription")}
            </h4>
            <div
              className={
                isLightMode ? "pricing-item v2 bt-border bg-light text-dark" : "pricing-item v2"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesList;
