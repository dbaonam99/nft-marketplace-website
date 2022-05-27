import Breadcrumb from "../../components/Breadcrumb";
import TimelineBox from "./TimelineBox";
import SidebarAreaContainer from "./SidebarArea";
import "../../assets/css/activity.css";
import useThemeMode from "../../hooks/useThemeMode";

const ActivityContainer = () => {
  const isLightMode = useThemeMode();

  return (
    <>
      <Breadcrumb namePage="Activity" title="Activity" />
      <section
        className={
          isLightMode
            ? "blog-area section-padding-100 bg-light"
            : "blog-area section-padding-100"
        }
      >
        <div className="container">
          <div className="row">
            <TimelineBox />
            <SidebarAreaContainer />
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivityContainer;
