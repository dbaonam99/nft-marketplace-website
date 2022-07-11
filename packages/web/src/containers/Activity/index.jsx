/* eslint-disable react-hooks/exhaustive-deps */
import Breadcrumb from "../../components/Breadcrumb";
import TimelineBox from "./TimelineBox";
import SidebarAreaContainer from "./SidebarArea";
import "../../assets/css/activity.css";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { useMoralis } from "react-moralis";
import { useUserHistoryQuery } from "../../queries/NFT";
import { useState } from "react";
import { useEffect } from "react";

const ActivityContainer = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const { user } = useMoralis();

  const { data } = useUserHistoryQuery(user?.get("ethAddress"));

  const [filter, setFilter] = useState("listings");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    switch (filter) {
      case "purchases": {
        const tempData = data.filter((item) => item.actionType === "buyToken");
        setFilteredData(tempData);
        break;
      }
      case "sales": {
        const tempData = data.filter((item) =>
          ["createToken", "createMarket", "sellToken"].includes(item.actionType)
        );
        setFilteredData(tempData);
        break;
      }
      case "bids": {
        const tempData = data.filter((item) =>
          ["startAuction", "bid", "endAuction"].includes(item.actionType)
        );
        setFilteredData(tempData);
        break;
      }
      default:
        break;
    }
  }, [filter]);

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
            <TimelineBox data={filter === "listings" ? data : filteredData} />
            <SidebarAreaContainer filter={filter} setFilter={setFilter} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivityContainer;
