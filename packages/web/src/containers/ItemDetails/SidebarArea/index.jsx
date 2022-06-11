import { NavLink, useParams } from "react-router-dom";
import authors8 from "../../../assets/img/authors/8.png";
import authors2 from "../../../assets/img/authors/2.png";
import artworkfire from "../../../assets/img/art-work/fire.png";
import useThemeMode from "../../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { useBuyNFTMutation } from "../../../queries/NFT";
import { useGetUserInfoQuery } from "../../../queries/User";

import BidTabs from "./BidTabs";
import { useBidMutation } from "../../../queries/Auction";
import BiddingBox from "./BiddingBox";

const DETAILED = [
  {
    text1: "common.size",
    text2: "3000 x 300",
  },
  {
    text1: "common.createdAt",
    text2: "04 April , 2021",
  },
];

const SidebarArea = ({
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
  const { data: userInfo } = useGetUserInfoQuery({
    params: {
      address: seller,
    },
  });

  const buyNFTMutation = useBuyNFTMutation();
  const bidMutation = useBidMutation();

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
                {t("common.from")}:
              </span>
              <span
                className={
                  isLightMode
                    ? "mb-15 text-muted mr-15"
                    : "mb-15 gray-text mr-15"
                }
              >
                {startingPrice} UIT
              </span>

              <span
                className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}
              >
                {t("common.highestBid")}:
              </span>
              <span
                className={isLightMode ? "mb-15 text-muted" : "mb-15 gray-text"}
              >
                {startingPrice} UIT
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

            <div className="details-list">
              {DETAILED?.map((item, i) => (
                <p className={isLightMode ? "text-muted" : ""} key={i}>
                  {t(item.text1)}:{" "}
                  <span className={isLightMode ? "text-dark" : ""}>
                    {item.text2}
                  </span>
                </p>
              ))}
            </div>
            <div className="author-item mb-30">
              <div className="author-img ml-0">
                <img src={authors8} width="70" alt="" />
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
            {/* <div
              className={
                isLightMode ? "highest-bid bt-bg-light" : "highest-bid"
              }
            >
              <h5 className={isLightMode ? "text-dark mb-15" : "w-text mb-15"}>
                {t("common.highestBid")}
              </h5>
              <div className="admire">
                <div className={isLightMode ? "adm text-dark" : "adm w-text"}>
                  <img src={authors2} width="30" alt="" className="mr-5p" />
                  Wadee-Nel
                </div>
                <div className="adm">
                  <img src={artworkfire} width="30" alt="" className="mr-5p" />
                  <span
                    className={
                      isLightMode ? "text-muted bold mr-5p" : "bold mr-5p"
                    }
                  >
                    0.34 ETH
                  </span>
                  <span className={isLightMode ? "text-muted" : "gray-text"}>
                    {" "}
                    $534.22
                  </span>
                </div>
              </div>
            </div> */}
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

export default SidebarArea;
