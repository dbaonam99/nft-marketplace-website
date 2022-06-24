import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMoralis } from "react-moralis";
import useThemeMode from "../../../hooks/useThemeMode";
import { getUserInfo } from "../../../queries/User";
import "./index.css";

export default function PreviewItem({
  image,
  name,
  price,
  currentMarketplaceType,
}) {
  const isLightMode = useThemeMode();
  const { user } = useMoralis();
  const { t } = useTranslation();

  const [userInfo, setUserInfo] = useState({});

  const isFixedPrice = currentMarketplaceType === "fixed_price";

  useEffect(() => {
    (async () => {
      const _userInfo = await getUserInfo(user?.get("ethAddress"));
      setUserInfo(_userInfo);
    })();
  }, [user]);

  return (
    <div
      className={
        isLightMode
          ? "preview-item l-bg bt-border-radius"
          : "preview-item dd-bg"
      }
    >
      <div className="preview-item-container">
        <div className="who-we-contant">
          <div className="dream-dots text-left">
            <span className="gradient-text ">Preview</span>
          </div>
        </div>
        <div className="main">
          {!image ? (
            <div className="main-text">
              <span className={isLightMode ? "text-dark" : "w-text"}>
                Upload file to preview your brand new NFT
              </span>
            </div>
          ) : (
            <div className="wrapper">
              <div className="image">
                <img src={image} alt="" />
              </div>
              <h4
                className={
                  isLightMode ? "nft-name text-dark" : "nft-name w-text"
                }
              >
                {name || "Untitled"}
              </h4>
              <div className={isLightMode ? "price-box bg-light" : "price-box"}>
                <div className="item">
                  <span
                    className={
                      isLightMode
                        ? "text-muted text-bold"
                        : "text-white-50 text-bold"
                    }
                  >
                    {isFixedPrice
                      ? t("common.price")
                      : t("common.itemStartPrice")}
                  </span>
                  <span
                    className={
                      isLightMode ? "text-dark text-bold" : "w-text text-bold"
                    }
                  >
                    {`${price || 0} UIT`}
                  </span>
                </div>
                <div className="item">
                  <span
                    className={
                      isLightMode
                        ? "text-muted text-bold"
                        : "text-white-50 text-bold"
                    }
                  >
                    {t("common.highestBid")}
                  </span>
                  <span
                    className={
                      isLightMode ? "text-dark text-bold" : "w-text text-bold"
                    }
                  >
                    {isFixedPrice
                      ? t("common.notForBid")
                      : t("common.noBidYet")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
