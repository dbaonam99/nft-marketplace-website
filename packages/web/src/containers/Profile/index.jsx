import {useEffect} from "react";
import { NavLink } from "react-router-dom";
import {SortingCard} from '../../utils'
import CollectionItem from './CollectionItem'
import Breadcumb from '../../components/Breadcumb'
import {ProfileData} from '../../data/data-containers/data-Profile.js'

import '../../assets/css/profile.css'
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";

const ProfileContainer = () => {
	const isLightMode = useThemeMode();
  const { t } = useTranslation();
	
    useEffect(() => {
      SortingCard()
    },[])

  return (
    <>
		<Breadcumb  
			namePage={t("header.authorProfile")}
			title={t("header.authorProfile")}
		/>
		<section className={isLightMode ? "blog-area section-padding-100 bg-light" : "blog-area section-padding-100"}>
		    <div className="container">

		        <div className="row">

	                  <CollectionItem />

		            <div className="col-12 col-md-9">
		                
		                <div className="dream-projects-menu mb-50">
		                    <div className="text-center portfolio-menu">
		                        <button className={isLightMode ? "btn active text-dark" : "btn active"} data-filter="*">All</button>
		                        <button className={isLightMode ? "btn text-dark" : "btn"} data-filter=".branding">Collectable</button>
		                        <button className={isLightMode ? "btn text-dark" : "btn"} data-filter=".design">Created</button>
		                        <button className={isLightMode ? "btn text-dark" : "btn"} data-filter=".development">On Auction</button>
		                    </div>
		                </div>
		                <div className="row">
		                    
		                    <div className="container">
		                        <div className="row dream-portfolio" data-aos="fade-up">

		                        	{ProfileData && ProfileData.map((item , i) => (

			                            <div className={`col-12 col-md-6 col-lg-4 single_gallery_item ${item.ClassChange}`}>
			                                <div className={isLightMode ? "l-bg bt-border pricing-item " : "pricing-item "}>
			                                    <div className="wraper">
			                                        <NavLink to="/itemDetails"><img src={item.imgBig} alt="" /></NavLink>
			                                        <NavLink to="/itemDetails"><h4 className={isLightMode ? "text-dark" : ""}>Scarecrow in daylight</h4></NavLink>
			                                        <div className={isLightMode ? "owner-info bg-light" : "owner-info"}>
			                                            <img src={item.imgSm} width="40" alt="" />
			                                            <a href="/profile"><h3 className={isLightMode ? "text-dark" : ""}>{item.title}</h3></a>
			                                        </div>
			                                        <span><span className={isLightMode ? "text-muted" : "g-text"}>Price</span> {item.price} ETH <span className="g-text ml-15">1 of 10</span></span> 
			                                        <div className={isLightMode ? "text-dark pricing" : "pricing"}>Highest Bid : <span className="ml-15">{item.bid} ETH</span> </div> 
			                                        <div className="admire">
			                                            <div className={isLightMode ? "adm text-muted" : "adm"}><i className="fa fa-clock-o"></i>6 Hours Ago</div>
			                                            <div className={isLightMode ? "adm text-muted" : "adm"}><i className="fa fa-heart-o"></i>134 Like</div>
			                                        </div>
			                                    </div>
			                                </div>
			                            </div>

		                        	))}

		                        </div>


		                    </div>

	                        <div className="col-12 col-lg-12 text-center">
	                            <a className="btn more-btn" href="/discover">{t("common.loadmore")}</a>
	                        </div>
		                </div>
		            </div>

		            
		        </div>
		    </div>
		</section>
    </>
  );
}

export default ProfileContainer;