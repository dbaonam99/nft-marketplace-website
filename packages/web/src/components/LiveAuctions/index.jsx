import React from "react";
import InfoComponent from "../InfoComponent";
import LiveAuctionsItem from "../LiveAuctionsItem";
import { LiveAuctionsData } from "../../data/data-components/data-LiveAuctions.js";
// import LiveAuctionsData from './data.json'
import clsx from "clsx";

import "./liveAuctions.css";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";

function LiveAuctionsContainer() {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  return (
    <section 
      className={
        clsx(
          "features section-padding-50 ",
          isLightMode && "bg-light"
        )
      }
    >
      <div className="container">
        <InfoComponent 
          titleSm={t("common.auctions")}
          titleLg={t("common.liveAuctions")}
        />
        <div className="row align-items-center">
          {LiveAuctionsData &&
            LiveAuctionsData.map((item, i) => (
              <LiveAuctionsItem
                imgBig={item.imgBig}
                imgSm={item.imgSm}
                title={item.title}
                text={item.text}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default LiveAuctionsContainer;
