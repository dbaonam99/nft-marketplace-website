import { ethers } from "ethers";
import { useState } from "react";
import { ConnectWalletIconsw1 } from "../../../utils/allImgs";
import ConnectWalletIconswallet from "../../../assets/img/icons/wallet.png";
import { useAuth } from "../../../auth/account";
import useThemeMode from "../../../hooks/useThemeMode";

const FeaturesList = () => {
  const { getUserInfo } = useAuth();
  const [data, setData] = useState({
    address: "",
    balance: null,
  });
  const isLightMode = useThemeMode();

  const connectToMetaMask = () => {
    console.log("check");
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        console.log(res);
        getBalance(res[0]);
      });
      // getUserInfo(res.data.privateKey);
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
        setData({
          address: address,
          balance: ethers.utils.formatEther(balance),
        });
      });
  };

  console.log("data", data);

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
            <h4 className={isLightMode ? "text-dark mb-30" : "w-text mb-30"} data-wow-delay="0.3s">
              Kết nối tới ví của bạn để bắt đầu sưu tầm, mua và bán các NFT.
            </h4>
            <div 
                className={isLightMode ? "pricing-item v2 bt-border" : "pricing-item v2"}
                onClick={connectToMetaMask}
              >
              <img
                src={ConnectWalletIconsw1}
                width="30"
                className="wal-icon"
                alt=""
              />
              Kết nối ví MetaMask
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesList;
