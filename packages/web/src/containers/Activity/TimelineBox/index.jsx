import ItemTimeline from "./ItemTimeline";
import useThemeMode from "../../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";

const TimelineBox = ({ data }) => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  return (
    <>
      <div className="col-12 col-md-9">
        <div className="timelineBox">
          <div
            className={
              isLightMode ? "timelineHeader bt-bg-light" : "timelineHeader"
            }
          >
            <h3 className={isLightMode ? "text-dark" : ""}>
              {t("activity.recentActivity")}
            </h3>
            <span className={isLightMode ? "text-dark" : ""}>
              {t("activity.businessHistory")}
            </span>
          </div>
          <div className="timelineBody">
            <ul className="timeline">
              {data &&
                data?.length > 0 &&
                data.map((item) => (
                  <ItemTimeline
                    key={`${item.actionType} ${item.tokenId}`}
                    date={item?.date}
                    time={item?.time}
                    actionType={item?.actionType}
                    tokenId={item?.tokenId}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimelineBox;
