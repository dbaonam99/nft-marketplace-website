import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { getUserInfo } from "../../queries/User";
import Avatar from "../Avatar/Avatar";
import "./nftCard.css";

function NftCard(props) {
  const {
    seller,
    image,
    price,
    name,
    tokenId,
    auctionId,
    startingPrice,
    highestBidAmount,
  } = props;
  const isLightMode = useThemeMode();

  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    (async () => {
      const _userInfo = await getUserInfo(seller);
      setUserInfo(_userInfo);
    })();
  }, [seller]);

  return (
    <div className="col-lg-3 col-sm-6 col-xs-12 nft-card">
      <div className={clsx(isLightMode && "l-bg bt-border", "pricing-item")}>
        <div className="wraper">
          <div className="relative">
            <NavLink
              to={
                auctionId
                  ? `/item-details/${auctionId}?auction=true`
                  : `/item-details/${tokenId}`
              }
            >
              <img src={image} alt="" className="nft-img" />
              <div className="nft-img-overlay" />
            </NavLink>
            <div className={clsx("owner-info", isLightMode && "bg-light")}>
              <Avatar src={userInfo?.avatar} size="40px" />

              <NavLink to={`/profile/${seller}`}>
                <h3 className={isLightMode ? "text-dark" : ""}>
                  {userInfo?.username}
                </h3>
              </NavLink>
            </div>
          </div>
          <div className="info">
            <NavLink
              to={
                auctionId
                  ? `/item-details/${auctionId}?auction=true`
                  : `/item-details/${tokenId}`
              }
            >
              <h4 className={isLightMode ? "text-dark" : ""}>{name}</h4>
            </NavLink>
          </div>
          {auctionId ? (
            <div
              className={clsx("d-flex", isLightMode ? "price-light" : "price")}
            >
              <div className="price-box">
                <p className={isLightMode ? "text-muted" : "g-text"}>
                  {t("common.from")}
                </p>
                <p className={isLightMode ? "b-text" : "w-text"}>
                  {startingPrice} UIT
                </p>
              </div>
              <div className="price-box">
                <p className={isLightMode ? "text-muted" : "g-text"}>
                  {t("common.highestBid")}
                </p>
                <p className={isLightMode ? "b-text" : "w-text"}>
                  {highestBidAmount && (
                    <p className={isLightMode ? "b-text" : "w-text"}>
                      {startingPrice === highestBidAmount
                        ? t("common.noBidYet")
                        : `${highestBidAmount} UIT`}
                    </p>
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div
              className={clsx("d-flex", isLightMode ? "price-light" : "price")}
            >
              <div className="price-box">
                <p className={isLightMode ? "text-muted" : "g-text"}>
                  {t("common.price")}
                </p>
                <p className={isLightMode ? "b-text" : "w-text"}>{price} UIT</p>
              </div>
              <div className="price-box">
                <p className={isLightMode ? "text-muted" : "g-text"}>
                  {t("common.highestBid")}
                </p>
                <p className={isLightMode ? "b-text" : "w-text"}>
                  {t("common.notForBid")}
                </p>
              </div>
            </div>
          )}

          {/* <div className="count-down titled circled text-center">
            <div className="simple_timer"></div>
            <div className="admire">
              <NavLink
                className="btn more-btn w-100 text-center my-0 mx-auto "
                to={`/item-details/${tokenId}?auction=true`}
              >
                {t("common.placeBid")}
              </NavLink>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default NftCard;
