import { NavLink } from "react-router-dom";
import clsx from "clsx";
import useThemeMode from "../../hooks/useThemeMode";

function ListedItemsItem({ tokenId, imgBig, imgSm, title, price, bid }) {
  const isLightMode = useThemeMode();

  return (
    <div className="col-lg-3 col-sm-6 col-xs-12">
      <div className={clsx(isLightMode && "l-bg bt-border", "pricing-item ")}>
        <div className="wraper">
          <div className="relative">
            <NavLink to={`/item-details/${tokenId}`}>
              <img src={imgBig} alt="" />
            </NavLink>
            <div className={clsx("owner-info", isLightMode && "bg-light")}>
              <img src={imgSm} width="40" alt="" />
              <NavLink to="profile.html">
                <h3 className={isLightMode ? "text-dark" : ""}>{title}</h3>
              </NavLink>
            </div>
          </div>
          <NavLink to={`/item-details/${tokenId}`}>
            <h4 className={isLightMode ? "text-dark" : ""}>{title}</h4>
          </NavLink>
          <span>
            <span className={isLightMode ? "text-muted" : "g-text"}>Price</span>{" "}
            {price} ETH{" "}
            <span className={isLightMode ? "text-muted ml-15" : "g-text ml-15"}>
              1 of 10
            </span>
          </span>
          <div className={isLightMode ? "text-dark pricing" : "pricing"}>
            Highest Bid : <span className="ml-15">{bid} ETH</span>{" "}
          </div>
          <div className="admire">
            <div className={isLightMode ? "adm text-muted" : "adm"}>
              <i className="fa fa-clock-o"></i> 6 Hours Ago
            </div>
            <div className={isLightMode ? "adm text-muted" : "adm"}>
              <i className="fa fa-heart-o"></i>134 Like
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListedItemsItem;
