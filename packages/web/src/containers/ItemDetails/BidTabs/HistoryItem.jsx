import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useThemeMode from "../../../hooks/useThemeMode";
import { getUserInfo } from "../../../queries/User";
import moment from "moment";

const HistoryItem = ({ item, isMarket }) => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    (async () => {
      const _userInfo = await getUserInfo(isMarket ? item?.user : item?.bidder);
      setUserInfo(_userInfo);
    })();
  }, [item?.bidder, isMarket, item?.user]);

  return (
    <div className={`author-item ${item.addMargin && "mb-0"}`}>
      <div className="author-img ml-0">
        <img src={userInfo?.avatar} width="40" height="40px" alt="" />
      </div>
      <div className="author-info">
        <p className={isLightMode ? "text-muted" : ""}>
          {t(`common.${item.message}By`)}
          <span className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}>
            {" "}
            {userInfo?.username}
          </span>
        </p>

        <p className={isLightMode ? "mb-15 text-dark" : "mb-15"}>
          {isMarket ? t("common.price") : t("common.bidAt")}
          <span className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}>
            {" "}
            {item?.price?.toString()} UIT
          </span>
          <span>
            <i className="fa fa-clock-o mr-5p" />
            {moment(
              new Date(
                isMarket ? item?.createdDate * 1000 : item.bidDate * 1000
              )
            ).format("DD-MM-YYYY / HH:mm")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default HistoryItem;
