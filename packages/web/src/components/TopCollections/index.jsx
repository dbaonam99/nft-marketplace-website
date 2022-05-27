import React from "react";
import clsx from "clsx";
import TopCollectionsItem from "../TopCollectionsItem";
import InfoComponent from "../InfoComponent";
import { TopCollectionsData } from "../../data/data-components/data-TopCollections.js";
import useThemeMode from "../../hooks/useThemeMode";

function TopCollectionsContainer() {
  const isLightMode = useThemeMode();

  return (
    <section
      className={clsx(
        "section-padding-100 clearfix",
        isLightMode && "bg-light"
      )}
    >
      <div className="container">
        <InfoComponent
          titleSm="Những bộ sưu tập hàng đầu của chúng tôi"
          titleLg="Những Bộ Sưu Tập Nổi Tiếng"
        />
        <div className="row">
          {TopCollectionsData &&
            TopCollectionsData.map((item, i) => (
              <TopCollectionsItem
                key={i}
                img={item.img}
                title={item.title}
                text={item.text}
                Delay={item.Delay}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default TopCollectionsContainer;
