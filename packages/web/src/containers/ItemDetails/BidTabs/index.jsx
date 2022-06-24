import { useTranslation } from "react-i18next";
import useThemeMode from "../../../hooks/useThemeMode";
import { useState } from "react";
import { useGetBidHistoryQuery } from "../../../queries/Auction";
import { useGetTokenHistoryQuery } from "../../../queries/NFT.js";
import HistoryItem from "./HistoryItem";

const BidTabs = ({ isAuction, auctionId, tokenId }) => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const { data: bidHistory } = useGetBidHistoryQuery({
    auctionId,
  });
  const { data: marketHistory } = useGetTokenHistoryQuery({
    tokenId,
  });

  const [currentTab, setTab] = useState(0);

  return (
    <>
      <div className={isLightMode ? "bid-tab-items-light" : "bid-tab-items"}>
        <p
          className={
            currentTab === 0 || !isAuction
              ? isLightMode
                ? "bid-tab-item-active-light"
                : "bid-tab-item-active"
              : isLightMode
              ? "bid-tab-item-light"
              : "bid-tab-item"
          }
          onClick={() => setTab(0)}
        >
          {t("common.history")}
        </p>
        {bidHistory?.length > 0 && isAuction && (
          <p
            className={
              currentTab === 1
                ? isLightMode
                  ? "bid-tab-item-active-light"
                  : "bid-tab-item-active"
                : isLightMode
                ? "bid-tab-item-light"
                : "bid-tab-item"
            }
            onClick={() => setTab(1)}
          >
            {t("common.latestBids")}
          </p>
        )}
      </div>
      {(currentTab === 0 || !isAuction) && (
        <div
          className={
            isLightMode
              ? "highest-bid bid-item bt-bg-light"
              : "highest-bid bid-item"
          }
        >
          {marketHistory?.map((item, i) => {
            return <HistoryItem item={item} key={i} isMarket />;
          })}
        </div>
      )}
      {currentTab === 1 && isAuction && (
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
    </>
  );
};

export default BidTabs;
