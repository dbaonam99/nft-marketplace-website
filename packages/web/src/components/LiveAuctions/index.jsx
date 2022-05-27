import React from "react";
import InfoComponent from "../InfoComponent";
import LiveAuctionsItem from "../LiveAuctionsItem";
import { LiveAuctionsData } from "../../data/data-components/data-LiveAuctions.js";
// import LiveAuctionsData from './data.json'
import clsx from "clsx";

import "./liveAuctions.css";
import useThemeMode from "../../hooks/useThemeMode";

function LiveAuctionsContainer() {
  const isLightMode = useThemeMode();

  return (
    <section
      className={clsx(
        "features section-padding-50 ",
        isLightMode && "bg-light"
      )}
    >
      <div className="container">
        <InfoComponent titleSm="Sàn đấu giá" titleLg="Sàn Đầu giá trực tuyến" />
        <div className="row align-items-center">
          {LiveAuctionsData &&
            LiveAuctionsData.map((item, i) => (
              <LiveAuctionsItem
                key={i}
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
