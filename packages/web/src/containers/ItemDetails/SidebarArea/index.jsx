import { NavLink, useParams } from "react-router-dom";
import iconsf1 from "../../../assets/img/icons/f1.png";
import authors8 from "../../../assets/img/authors/8.png";
import authors2 from "../../../assets/img/authors/2.png";
import artworkfire from "../../../assets/img/art-work/fire.png";
import details from "../../../data/data-containers/data-ItemDetails-SidebarArea.json";
import useThemeMode from "../../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import TestPopup from "../TestPopup";
import { useBuyNFTMutation } from "../../../queries/NFT";
import { useGetUserInfoQuery } from "../../../queries/User";

const SidebarArea = ({ name, price, owner, seller, auctionId }) => {
  const { tokenId } = useParams();
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const { data: userInfo } = useGetUserInfoQuery({
    params: {
      address: seller,
    },
  });

  const buyNFTMutation = useBuyNFTMutation();

  const buyNft = () => {
    buyNFTMutation.mutate({
      tokenId,
      price,
    });
  };

  return (
    <>
      <div className="col-12 col-lg-4 mt-s">
        <div className="sidebar-area">
          <div className="donnot-miss-widget">
            <div className="who-we-contant">
              <div className="filers-list">
                <NavLink
                  to="/discover"
                  className={
                    isLightMode ? "filter-item text-dark" : "filter-item"
                  }
                >
                  {isLightMode ? (
                    <div className="d-flex align-items-center">
                      <i className="fa fa-list mr-2" aria-hidden="true"></i>
                      {t("itemDetails.cryptoArt")}
                    </div>
                  ) : (
                    <>
                      <img src={iconsf1} alt="" />
                      {t("itemDetails.cryptoArt")}
                    </>
                  )}
                </NavLink>
              </div>
              <h4 className={isLightMode ? "text-dark" : ""}>{name}</h4>
            </div>
            <div
              className={isLightMode ? "mb-15 text-muted" : "mb-15 gray-text"}
            >
              <span
                className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}
              >
                {/* {t("common.currentPrice")} {price} ETH{" "} */}
              </span>
              <span
                className={isLightMode ? "mb-15 text-muted" : "mb-15 gray-text"}
              >
                $534.22
              </span>{" "}
              1/10
            </div>
            <div className="details-list">
              {details &&
                details.map((item, i) => (
                  <p className={isLightMode ? "text-muted" : ""} key={i}>
                    {t(item.text1)}:{" "}
                    <span className={isLightMode ? "text-dark" : ""}>
                      {item.text2}
                    </span>
                  </p>
                ))}
            </div>
            <div className="author-item mb-30">
              <div className="author-img ml-0">
                <img src={authors8} width="70" alt="" />
              </div>
              <div className="author-info">
                <NavLink to="/profile">
                  <h5
                    className={
                      isLightMode ? "author-name text-dark" : "author-name"
                    }
                    style={{ wordBreak: "break-all" }}
                  >
                    {userInfo?.username}
                  </h5>
                </NavLink>
                <p
                  className={
                    isLightMode
                      ? "author-earn mb-0 text-muted"
                      : "author-earn mb-0"
                  }
                >
                  {t("common.itemOwner")}
                </p>
              </div>
            </div>
            <div
              className={
                isLightMode ? "highest-bid bt-bg-light" : "highest-bid"
              }
            >
              <h5 className={isLightMode ? "text-dark mb-15" : "w-text mb-15"}>
                {t("common.highestBid")}
              </h5>
              <div className="admire">
                <div className={isLightMode ? "adm text-dark" : "adm w-text"}>
                  <img src={authors2} width="30" alt="" className="mr-5p" />
                  Wadee-Nel
                </div>
                <div className="adm">
                  <img src={artworkfire} width="30" alt="" className="mr-5p" />
                  <span
                    className={
                      isLightMode ? "text-muted bold mr-5p" : "bold mr-5p"
                    }
                  >
                    0.34 ETH
                  </span>
                  <span className={isLightMode ? "text-muted" : "gray-text"}>
                    {" "}
                    $534.22
                  </span>
                </div>
              </div>
            </div>
            <div
              className="open-popup-link more-btn width-100 mt-30"
              onClick={buyNft}
            >
              {t("common.purchaseNow")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarArea;
