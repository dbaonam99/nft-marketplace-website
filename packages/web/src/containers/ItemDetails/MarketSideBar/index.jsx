import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import useThemeMode from "../../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { useBuyNFTMutation } from "../../../queries/NFT";
import { getUserInfo } from "../../../queries/User";

import BidTabs from "../BidTabs";
import Avatar from "../../../components/Avatar";
import { useMoralis } from "react-moralis";
import toast from 'react-hot-toast';

const MarketSideBar = ({
  name,
  price,
  owner,
  seller,
  description,
  sold,
  itemId,
  tokenId,
}) => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const { user } = useMoralis();

  const [userInfo, setUserInfo] = useState({});

  const buyNFTMutation = useBuyNFTMutation();

  const isOwner =
    user?.get("ethAddress")?.toLowerCase() === owner?.toLowerCase();

  useEffect(() => {
    (async () => {
      const _userInfo = await getUserInfo(sold ? owner : seller);
      setUserInfo(_userInfo);
    })();
  }, [seller, owner, sold]);

  const buyNft = () => {
    if (sold) return;
    buyNFTMutation.mutate({
      itemId,
      price: price,
    },
      {
        onSuccess: () => {
          toast.success(t("message.buyNFT"));
        }
      });
  };

  return (
    <>
      <div className="col-12 col-lg-5 mt-s sidebar-container">
        <div className="sidebar-area-market">
          <div className="donnot-miss-widget">
            <div className="who-we-contant">
              <h2 className={isLightMode ? "text-dark" : ""}>
                {name} #{tokenId}
              </h2>
            </div>
            <div
              className={isLightMode ? "mb-15 text-muted" : "mb-15 gray-text"}
            >
              <p className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}>
                {t("common.price")}:
              </p>
              <p
                className={
                  isLightMode
                    ? "mb-15 text-muted mr-15"
                    : "mb-15 gray-text mr-15"
                }
              >
                {price?.toString()} UIT
              </p>
            </div>

            <div
              className={isLightMode ? "mb-15 text-muted" : "mb-15 gray-text"}
            >
              <span
                className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}
              >
                {description}
              </span>
            </div>
            <div className="author-item mb-30">
              <div className="author-img ml-0">
                <Avatar src={userInfo?.avatar} size="60px" />
              </div>
              <div className="author-info">
                <NavLink to={`/profile/${userInfo?.ethAddress}`}>
                  <h5
                    className={
                      isLightMode ? "author-name text-dark" : "author-name"
                    }
                    style={{ wordBreak: "break-all" }}
                  >
                    {userInfo?.username}
                  </h5>
                </NavLink>
                <p
                  className={
                    isLightMode
                      ? "author-earn mb-0 text-muted"
                      : "author-earn mb-0"
                  }
                >
                  {t("common.itemOwner")}
                </p>
              </div>
            </div>

            <BidTabs tokenId={tokenId} />
          </div>
        </div>
        { }
        <div
          className={isLightMode ? "item-detail-cta-light" : "item-detail-cta"}
        >
          <div className="open-popup-link more-btn width-100" onClick={buyNft}>
            {sold ? "SOLD" : t("common.purchaseNow")}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketSideBar;
