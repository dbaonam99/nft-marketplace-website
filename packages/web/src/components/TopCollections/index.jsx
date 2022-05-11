import React from "react";
import TopCollectionsItem from "../TopCollectionsItem";
import InfoComponent from "../InfoComponent";
import { TopCollectionsData } from "../../data/data-components/data-TopCollections.js";

function TopCollectionsContainer() {
  return (
    <section className="section-padding-100 clearfix">
      <div className="container">
        <InfoComponent
          titleSm="Những bộ sưu tập hàng đầu của chúng tôi"
          titleLg="Những Bộ Sưu Tập Nổi Tiếng"
        />
        <div className="row">
          {TopCollectionsData &&
            TopCollectionsData.map((item, i) => (
              <TopCollectionsItem
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
