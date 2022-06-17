import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useThemeMode from "../../../hooks/useThemeMode";
import { getUserInfo } from "../../../queries/User";

function ListedItemsItem({
  tokenId,
  imgBig,
  imgSm,
  title,
  price,
  bid,
  seller,
}) {
  const isLightMode = useThemeMode();

  const [userInfo, setUserInfo] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const _userInfo = await getUserInfo(seller);
      setUserInfo(_userInfo);
    })();
  }, [seller]);

  return (
    <div className="col-lg-4 col-sm-6 col-xs-12">
      <div className={clsx(isLightMode && "l-bg bt-border", "pricing-item ")}>
        <div className="wraper">
          <div className="relative">
            <NavLink to={`/item-details/${tokenId}`}>
              <img src={imgBig} alt="" />
            </NavLink>
            <div className={clsx("owner-info", isLightMode && "bg-light")}>
              <img src={userInfo?.avatar} width="40" alt="" />
              <NavLink to={`/profile/${userInfo?.ethAddress}`}>
                <h3 className={isLightMode ? "text-dark" : ""}>
                  {userInfo?.username}
                </h3>
              </NavLink>
            </div>
          </div>
          <NavLink to={`/item-details/${tokenId}`}>
            <h4 className={isLightMode ? "text-dark" : ""}>{title}</h4>
          </NavLink>
          <span>
            <span className={isLightMode ? "text-muted" : "g-text"}>
              {t("common.price")}
            </span>{" "}
            {price} ETH{" "}
            <span className={isLightMode ? "text-muted ml-15" : "g-text ml-15"}>
              1 {t("common.of")} 10
            </span>
          </span>
          <div className={isLightMode ? "text-dark pricing" : "pricing"}>
            {t("common.highestBid")} : <span className="ml-15">{bid} ETH</span>{" "}
          </div>
          <div className="admire">
            <div className={isLightMode ? "adm text-muted" : "adm"}>
              <i className="fa fa-clock-o"></i> 6 Hours Ago
            </div>
            <div className={isLightMode ? "adm text-muted" : "adm"}>
              <i className="fa fa-heart-o"></i>134 {t("common.like")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListedItemsItem;
