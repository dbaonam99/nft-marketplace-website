import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import useThemeMode from "../../hooks/useThemeMode";

function CardContainer({ imgBig, imgSm, name }) {
    const isLightMode = useThemeMode();
    const { t } = useTranslation();

    return (
        <div className="col-12 col-md-6 col-lg-3">

            <div className={isLightMode ? "service_single_content collection-item l-bg" : "service_single_content collection-item"}>
                <div className="collection_icon">
                    <img src={imgBig} alt="" />
                </div>
                <span className={`aut-info ${!imgBig && "mt-5"}`}>
                    <img src={imgSm} width="50" alt="" />
                </span>
                <div className="collection_info text-center">
                    <h6 className={isLightMode ? "text-dark" : ""}>{name}</h6>
                    <p className={isLightMode ? "text-muted" : ""}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <NavLink to="/profile" className="more-btn mt-15">{t("common.follow")}</NavLink>
                </div>

            </div>
        </div>
    )
}

export default CardContainer