import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import useThemeMode from "../../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { useBuyNFTMutation } from "../../../queries/NFT";
import { getUserInfo } from "../../../queries/User";

import BidTabs from "../BidTabs";
import Avatar from "../../../components/Avatar/Avatar";

const MarketSideBar = ({
  name,
  price,
  owner,
  seller,
  description,
  sold,
  itemId,
}) => {
  const { tokenId } = useParams();
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState({});

  const buyNFTMutation = useBuyNFTMutation();

  useEffect(() => {
    (async () => {
      const _userInfo = await getUserInfo(sold ? owner : seller);
      setUserInfo(_userInfo);
    })();
  }, [seller, owner, sold]);

  const buyNft = () => {
    if (sold) return;
    buyNFTMutation.mutate({
      tokenId,
      price: price,
    });
  };

  return (
    <>
      <div className="col-12 col-lg-5 mt-s sidebar-container">
        <div className="sidebar-area">
          <div className="donnot-miss-widget">
            <div className="who-we-contant">
              <h2 className={isLightMode ? "text-dark" : ""}>
                {name} #{tokenId}
              </h2>
            </div>
            <div
              className={isLightMode ? "mb-15 text-muted" : "mb-15 gray-text"}
            >
              <span
                className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}
              >
                {t("common.price")}:
              </span>
              <span
                className={
                  isLightMode
                    ? "mb-15 text-muted mr-15"
                    : "mb-15 gray-text mr-15"
                }
              >
                {price?.toString()} UIT
              </span>
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
                <NavLink to="/profile">
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

            <BidTabs itemId={itemId} />
          </div>
        </div>
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
