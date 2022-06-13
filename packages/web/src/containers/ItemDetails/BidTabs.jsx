import { useTranslation } from "react-i18next";
import useThemeMode from "../../hooks/useThemeMode";
import { data } from "../../data/data-containers/data-HighestBid.js";
import authors1 from "../../assets/img/authors/1.png";
import { useState } from "react";

const BidTabs = ({ isAuction }) => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  const [currentTab, setTab] = useState(0);

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
          {data?.map((item, i) => (
            <div key={i} className={`author-item ${item.addMargin && "mb-0"}`}>
              <div className="author-img ml-0">
                <img src={item.img} width="40" alt="" />
              </div>
              <div className="author-info">
                <p className={isLightMode ? "text-muted" : ""}>
                  {t("common.by")}
                  <span
                    className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}
                  >
                    {" "}
                    {item.text}
                  </span>
                </p>
                <p className={isLightMode ? "text-muted" : ""}>
                  {t("common.bidAt")}
                  <span
                    className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}
                  >
                    {" "}
                    {item.bid} ETH
                  </span>
                </p>
              </div>
              <div className="bid-price">
                <p className={isLightMode ? "text-muted" : ""}>$346.38</p>
                <p className={isLightMode ? "text-muted" : ""}>
                  <i className="fa fa-clock-o mr-5p"></i>
                  {item.time} AM
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {currentTab === 1 ||
        (!isAuction && (
          <div
            className={
              isLightMode
                ? "highest-bid bid-item bt-bg-light"
                : "highest-bid bid-item"
            }
          >
            <div className="author-item mb-0">
              <div className="author-img ml-0">
                <img src={authors1} width="40" alt="" />
              </div>
              <div className="author-info">
                <p className={isLightMode ? "mb-15 text-dark" : "mb-15"}>
                  {t("common.listedBy")}
                  <span className={isLightMode ? "text-dark" : "w-text"}>
                    {" "}
                    Amillia Nnor
                  </span>
                </p>
                <p className={isLightMode ? "mb-15 text-dark" : "mb-15"}>
                  {t("common.price")}
                  <span
                    className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}
                  >
                    {" "}
                    0.212 ETH
                  </span>
                  <span>
                    <i className="fa fa-clock-o mr-5p"></i>01:36 AM
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default BidTabs;
