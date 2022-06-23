import { NavLink, useParams } from "react-router-dom";
import useThemeMode from "../../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { getUserInfo } from "../../../queries/User";
import moment from "moment";

import BidTabs from "../BidTabs";
import { useGetHighestBidderQuery } from "../../../queries/Auction";
import BiddingBox from "./BiddingBox";
import { useEffect, useState } from "react";
import BidModal from "./BidModal";
import Avatar from "../../../components/Avatar";

const AuctionSidebar = (props) => {
  const {
    name,
    price,
    owner,
    seller,
    auctionId,
    description,
    startingPrice,
    duration,
    startTime,
    createdDate,
    highestBidAmount,
    tokenId,
  } = props;
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const { data: highestBidder } = useGetHighestBidderQuery({
    auctionId,
  });
  const [userInfo, setUserInfo] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const _userInfo = await getUserInfo(owner);
      setUserInfo(_userInfo);
    })();
  }, [owner]);

  return (
    <>
      <BidModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        auctionId={auctionId}
      />
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
                {highestBidAmount} UIT
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
              <p className={isLightMode ? "text-muted" : ""}>
                {t("common.createdAt")}:{" "}
                <span className={isLightMode ? "text-dark" : ""}>
                  {moment(new Date(createdDate * 1000)).format("DD-MM-YYYY")}
                </span>
              </p>
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

            <BidTabs isAuction auctionId={auctionId} />
          </div>
        </div>
        <div
          className={isLightMode ? "item-detail-cta-light" : "item-detail-cta"}
        >
          <BiddingBox
            onBid={() => setIsOpen(true)}
            highestBidder={highestBidder}
            highestBidAmount={highestBidAmount}
            duration={duration}
            startTime={startTime}
          />
        </div>
      </div>
    </>
  );
};

export default AuctionSidebar;
