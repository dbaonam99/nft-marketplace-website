import Breadcrumb from "../../components/Breadcrumb";
import TimelineBox from "./TimelineBox";
import SidebarAreaContainer from "./SidebarArea";
import "../../assets/css/activity.css";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from 'react-i18next';

const ActivityContainer = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb
        namePage={t("header.activity")}
        title={t("header.activity")}
      />
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
