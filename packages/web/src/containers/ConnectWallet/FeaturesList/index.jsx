import { ethers } from "ethers";
import { useState } from "react";
import { ConnectWalletIconsw1 } from "../../../utils/allImgs";
import ConnectWalletIconswallet from "../../../assets/img/icons/wallet.png";
import { useAuth } from "../../../auth/account";
import useThemeMode from "../../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";

const FeaturesList = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const { getUserInfo, userInfo } = useAuth();

  const connectToMetaMask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          if (accounts.length === 0) {
            console.log("Please connect to MetaMask.");
          } else if (accounts[0] !== userInfo) {
            getBalance(accounts[0]);
          }
        })
        .catch((err) => {
          if (err.code === 4001) {
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
        });
    } else {
      alert("Install metamask extension!!");
    }
  };

  const getBalance = (address) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        getUserInfo({
          address: address,
          balance: ethers.utils.formatEther(balance),
        });
      });
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
              Kết nối tới ví của bạn để bắt đầu sưu tầm, mua và bán các NFT.
              {t("connectWallet.connectYourWalletDescription")}
            </h4>
            <div
              className={
                isLightMode ? "pricing-item v2 bt-border" : "pricing-item v2"
              }
              onClick={connectToMetaMask}
            >
              <img
                src={ConnectWalletIconsw1}
                width="30"
                className="wal-icon"
                alt=""
              />
              {userInfo?.address ? t("connectWallet.connected") : t("connectWallet.connectMetaMask")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesList;
