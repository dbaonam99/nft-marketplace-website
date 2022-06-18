import { useTranslation } from "react-i18next";
import useThemeMode from "../../../hooks/useThemeMode";
import authors1 from "../../../assets/img/authors/1.png";
import { useState } from "react";
import { useGetBidHistoryQuery } from "../../../queries/Auction";
import { useGetMarketHistoryQuery } from "../../../queries/NFT.js";
import HistoryItem from "./HistoryItem";

const BidTabs = ({ isAuction, auctionId, itemId }) => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const { data: bidHistory } = useGetBidHistoryQuery({
    auctionId,
  });
  const { data: marketHistory } = useGetMarketHistoryQuery({
    itemId,
  });

  const [currentTab, setTab] = useState(0);

  console.log("marketHistory", marketHistory);

  return (
    <>
      <div className={isLightMode ? "bid-tab-items-light" : "bid-tab-items"}>
        {isAuction && (
          <p
            className={
              currentTab === 0
                ? isLightMode
                  ? "bid-tab-item-active-light"
                  : "bid-tab-item-active"
                : isLightMode
                ? "bid-tab-item-light"
                : "bid-tab-item"
            }
            onClick={() => setTab(0)}
          >
            {t("common.latestBids")}
          </p>
        )}
        <p
          className={
            currentTab === 1 || !isAuction
              ? isLightMode
                ? "bid-tab-item-active-light"
                : "bid-tab-item-active"
              : isLightMode
              ? "bid-tab-item-light"
              : "bid-tab-item"
          }
          onClick={() => setTab(1)}
        >
          {t("common.history")}
        </p>
      </div>
      {currentTab === 0 && isAuction && (
        <div
          className={
            isLightMode
              ? "highest-bid bid-item bt-bg-light"
              : "highest-bid bid-item"
          }
        >
          {bidHistory?.map((item, i) => (
            <HistoryItem item={item} key={i} />
          ))}
        </div>
      )}
      {(currentTab === 1 || !isAuction) && (
        <div
          className={
            isLightMode
              ? "highest-bid bid-item bt-bg-light"
              : "highest-bid bid-item"
          }
        >
          {marketHistory?.map((item) => {
            console.log(item);
            return (
              <div className="author-item mb-0">
                <div className="author-img ml-0">
                  <img src={authors1} width="40" alt="" />
                </div>
                <div className="author-info">
                  <p className={isLightMode ? "mb-15 text-dark" : "mb-15"}>
                    {t("common.listedBy")}
                    <span className={isLightMode ? "text-dark" : "w-text"}>
                      {" "}
                      {item?.user}
                    </span>
                  </p>
                  <p className={isLightMode ? "mb-15 text-dark" : "mb-15"}>
                    {t("common.price")}
                    <span
                      className={
                        isLightMode ? "text-dark mr-15" : "w-text mr-15"
                      }
                    >
                      {" "}
                      {item?.price?.toString()}
                    </span>
                    <span>
                      <i className="fa fa-clock-o mr-5p" />
                      {item?.createdDate} AM
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default BidTabs;
