import ItemTimeline from './ItemTimeline'
import timelineData from '../../../data/data-containers/data-Timeline.json'
import useThemeMode from '../../../hooks/useThemeMode';
import { useTranslation } from 'react-i18next';

const TimelineBox = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  return (
    <>
      <div className="col-12 col-md-9">
          <div className="timelineBox">
              <div className={isLightMode ? "timelineHeader bt-bg-light" : "timelineHeader"}>
                  <h3 className={isLightMode ? "text-dark" : ""}>{t("activity.recentActivity")}</h3>
                  <span className={isLightMode ? "text-dark" : ""}>{t("activity.businessHistory")}</span>
              </div>
              <div className="timelineBody">
                  <ul className="timeline">
                      {timelineData && timelineData.map((item , i) => (
                        <ItemTimeline
                          FullTime={item.FullTime}
                          Time={item.Time}
                          title={item.title}
                          text={item.title}
                          addLink={item.title}
                          name={item.title}
                          bid={item.bid}
                        />
                      ))}
                  </ul>
              </div>
          </div>
      </div>
    </>
  );
}

export default TimelineBox;