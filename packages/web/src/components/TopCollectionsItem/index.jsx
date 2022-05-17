import { NavLink } from "react-router-dom";
import useThemeMode from "../../hooks/useThemeMode";

function TopCollectionsItem({img , title , text , Delay}){
  const isLightMode = useThemeMode();

  return(
    <div className="col-12 col-md-6 col-lg-3">
        <NavLink 
          to='/discover' 
          className={`service_single_content collection-item aos-init aos-animate ${isLightMode ? "l-bg" : ""}`}
          data-aos-delay={Delay} 
          data-aos="fade-up"
        >
            <div className="collection_icon">
                <img src={img} alt="" />
            </div>
            <div className="collection_info">
                <h6 className={isLightMode ? "text-dark" : ""}>{title}</h6>
                <p>
                  <span className={`${isLightMode ? "text-muted" : ""}`}>Owner: </span><span className={`${isLightMode ? "text-dark" : "w-text"}`}>{text}</span>
                </p>
            </div>
            
        </NavLink>
    </div>
  )
}

export default TopCollectionsItem