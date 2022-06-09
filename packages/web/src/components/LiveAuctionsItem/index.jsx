import { NavLink } from "react-router-dom";
import clsx from "clsx";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { useGetUserInfoQuery } from "../../queries/User";

function LiveAuctionsItem({ seller, imgBig, price, title, tokenId }) {
  const isLightMode = useThemeMode();
  const { data: userInfo } = useGetUserInfoQuery({
    params: {
      address: seller,
    },
  });
  const { t } = useTranslation();

  return (
    <div className="col-lg-3 col-sm-6 col-xs-12">
      <div className={clsx(isLightMode && "l-bg bt-border", "pricing-item ")}>
        <div className="wraper">
          <div className="relative">
            <NavLink to={`/item-details/${tokenId}?auction=true`}>
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
            {price} ETH{" "}
            <span className={isLightMode ? "text-muted ml-15" : "g-text ml-15"}>
              1 {t("common.of")} 10
            </span>
          </span>
          <div className="count-down titled circled text-center">
            <div className="simple_timer"></div>
            <div className="admire">
              <NavLink
                className="btn more-btn w-100 text-center my-0 mx-auto "
                to={`/item-details/${tokenId}?auction=true`}
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
