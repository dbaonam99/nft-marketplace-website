import ItemTimeline from "./ItemTimeline";
import timelineData from "../../../data/data-containers/data-Timeline.json";
import useThemeMode from "../../../hooks/useThemeMode";

const TimelineBox = () => {
  const isLightMode = useThemeMode();

  return (
    <>
      <div className="col-12 col-md-9">
        <div className="timelineBox">
          <div
            className={
              isLightMode ? "timelineHeader bt-bg-light" : "timelineHeader"
            }
          >
            <h3 className={isLightMode ? "text-dark" : ""}>Recent Activity</h3>
            <span className={isLightMode ? "text-dark" : ""}>
              Business History
            </span>
          </div>
          <div className="timelineBody">
            <ul className="timeline">
              {timelineData &&
                timelineData.map((item, i) => (
                  <ItemTimeline
                    key={i}
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
};

export default TimelineBox;
