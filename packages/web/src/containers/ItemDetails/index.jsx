import Breadcrumb from "../../components/Breadcrumb";
import Detailed from "./Detailed";
import SidebarArea from "./SidebarArea";
import HighestBid from "./HighestBid";
import TestPopup from "./TestPopup";
import clsx from "clsx";

import "../../assets/css/itemDetails.css";
import useThemeMode from "../../hooks/useThemeMode";

const ItemDetailsContainer = () => {
  const isLightMode = useThemeMode();

  return (
    <>
      <Breadcrumb namePage="Item Details" title="Item Details" />
      <section
        className={clsx("section-padding-100", isLightMode && "bg-light")}
      >
        <div className="container">
          <div className="row">
            <Detailed />

            <SidebarArea />

            <HighestBid />
          </div>
        </div>
      </section>
      <TestPopup />
    </>
  );
};

export default ItemDetailsContainer;
