import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useThemeMode from "../../hooks/useThemeMode";
import Avatar from "../Avatar";
import "./index.css";

function PartProfile({ cover, avatar, img3, data, user }) {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  }, [isCopied]);

  const handleCopy = (address) => {
    setIsCopied(true);
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="col-12 col-lg-3">
      <div
        className={
          isLightMode
            ? "service_single_content collection-item l-bg"
            : "service_single_content collection-item"
        }
      >
        <div className="part-profile-cover">
          <img src={cover} className="center-block" alt="" />
        </div>
        <span className={isLightMode ? "aut-info bt-border" : "aut-info"}>
          <Avatar src={avatar} size="50px" />
        </span>
        <div className="collection_info text-center">
          <h6 className={isLightMode ? "text-dark" : ""}>{user?.username}</h6>
          <p className={isLightMode ? "text-dark mr-5p" : "w-text mr-5p"}>
            Creative NFTs Designer <img src={img3} width="20" alt="" />
          </p>

          <div
            className="search-widget-area mt-15"
            onClick={() => handleCopy(user?.ethAddress)}
          >
            <p className={isLightMode ? "bt-border text-dark" : ""}>
              {isCopied ? "Copied!" : user?.ethAddress}
            </p>
          </div>

          <ul className="social-links mt-30 mb-30">
            {data &&
              data.map((item, i) => (
                <li key={i}>
                  <a href="#" className={isLightMode ? "bt-bg-light" : ""}>
                    <span className={item.classIcon}></span>
                  </a>
                </li>
              ))}
          </ul>
          <a href="profile.html" className="more-btn">
            {t("common.follow")}
          </a>
        </div>
      </div>
    </div>
  );
}

export default PartProfile;
