import { NavLink } from "react-router-dom";
import clsx from "clsx";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { getUserInfo } from "../../queries/User";
import { useEffect, useState } from "react";

function LiveAuctionsItem({ seller, imgBig, price, title, auctionId }) {
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
    <div className="col-lg-3 col-sm-6 col-xs-12">
      <div className={clsx(isLightMode && "l-bg bt-border", "pricing-item ")}>
        <div className="wraper">
          <div className="relative">
            <NavLink to={`/item-details/${auctionId}?auction=true`}>
              <img src={imgBig} alt="" />
            </NavLink>{" "}
            <div className={clsx("owner-info", isLightMode && "bg-light")}>
              <img src={userInfo?.avatar} width="40" alt="" />
              <NavLink to="/profile">
                <h3 className={isLightMode ? "text-dark" : ""}>
                  {userInfo?.username}
                </h3>
              </NavLink>
            </div>
          </div>
          <NavLink to="/item-details">
            <h4 className={isLightMode ? "text-dark" : ""}>{title}</h4>
          </NavLink>

          <span>
            <span className={isLightMode ? "text-muted" : "g-text"}>
              {t("common.price")}
            </span>{" "}
            {price} UIT
          </span>
          <div className="count-down titled circled text-center">
            <div className="simple_timer"></div>
            <div className="admire">
              <NavLink
                className="btn more-btn w-100 text-center my-0 mx-auto "
                to={`/item-details/${auctionId}?auction=true`}
              >
                {t("common.placeBid")}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveAuctionsItem;
