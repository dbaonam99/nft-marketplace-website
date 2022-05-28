import { NavLink } from "react-router-dom";
import clsx from "clsx";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";

function LiveAuctionsItem({imgBig , imgSm , title , text, placeBidText}){
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  return(
    <div className="col-lg-3 col-sm-6 col-xs-12">
        <div className={clsx(
            isLightMode && "l-bg bt-border",  
            "pricing-item "
        )}>
            <div className="wraper">
                <NavLink to="/itemdetails"><img src={imgBig} alt="" /></NavLink>
                <NavLink to="/itemdetails"><h4 className={isLightMode ? "text-dark" : ""}>{text}</h4></NavLink>
                <div className={clsx("owner-info", isLightMode && "bg-light")}>
                    <img src={imgSm} width="40" alt="" />
                    <NavLink to="/profile"><h3 className={isLightMode ? "text-dark" : ""}>{title}</h3></NavLink>
                </div>
                <span><span className={isLightMode ? "text-muted" : "g-text"}>{t("common.price")}</span> 0.081 ETH <span className={isLightMode ? "text-muted ml-15" : "g-text ml-15"}>1 {t("common.of")} 10</span></span> 
                <div className="count-down titled circled text-center">
                    <div className="simple_timer"></div>
                    <div className="admire">
                      <NavLink className="btn more-btn w-100 text-center my-0 mx-auto " to="/itemdetails">{t("common.placeBid")}</NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LiveAuctionsItem