import { NavLink, useParams } from "react-router-dom";
import useThemeMode from "../../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { useBuyNFTMutation } from "../../../queries/NFT";
import { useGetUserInfoQuery } from "../../../queries/User";

import BidTabs from "../BidTabs";
import { useBidMutation } from "../../../queries/Auction";
import BiddingBox from "./BiddingBox";
import { useEffect } from "react";

const MarketAuctionSideBar = ({
  name,
  price,
  owner,
  seller,
  auctionId,
  description,
  startingPrice,
}) => {
  const { tokenId } = useParams();
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  const { data: userInfo, refetch } = useGetUserInfoQuery({
    ethAddress: seller,
  });

  const buyNFTMutation = useBuyNFTMutation();
  const bidMutation = useBidMutation();

  useEffect(() => {
    refetch();
  }, [refetch, seller]);

  const buyNft = () => {
    buyNFTMutation.mutate({
      tokenId,
      price,
    });
  };

  const bid = () => {
    bidMutation.mutate({
      auctionId,
      price: startingPrice,
    });
  };

  console.log(userInfo);

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
                <img src={userInfo?.avatar} width="70" alt="" />
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

            <BidTabs />
          </div>
        </div>
        <div
          className={isLightMode ? "item-detail-cta-light" : "item-detail-cta"}
        >
          {auctionId ? (
            <BiddingBox onBid={bid} />
          ) : (
            <div
              className="open-popup-link more-btn width-100"
              onClick={buyNft}
            >
              {t("common.purchaseNow")}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MarketAuctionSideBar;
