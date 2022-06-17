import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useThemeMode from "../../../hooks/useThemeMode";
import { getUserInfo } from "../../../queries/User";
import moment from "moment";

const HistoryItem = ({ item }) => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    (async () => {
      const _userInfo = await getUserInfo(item?.bidder);
      setUserInfo(_userInfo);
    })();
  }, [item?.bidder]);

  return (
    <div className={`author-item ${item.addMargin && "mb-0"}`}>
      <div className="author-img ml-0">
        <img src={userInfo?.avatar} width="40" height="40px" alt="" />
      </div>
      <div className="author-info">
        <p className={isLightMode ? "text-muted" : ""}>
          {t("common.by")}
          <span className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}>
            {" "}
            {userInfo?.username}
          </span>
        </p>
        <p className={isLightMode ? "text-muted" : ""}>
          {t("common.bidAt")}
          <span className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}>
            {" "}
            {item.price} UIT
          </span>
        </p>
      </div>
      <div className="bid-price">
        <p className={isLightMode ? "text-muted" : ""}>
          <i className="fa fa-clock-o mr-5p"></i>
          {moment(new Date(item.bidDate * 1000)).format("YYYY-MM-DD / HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default HistoryItem;
