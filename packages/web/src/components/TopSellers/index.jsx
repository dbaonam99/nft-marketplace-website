import TopSellersItem from "../TopSellersItem";
import {
  TopSellersData1,
  TopSellersData2,
  TopSellersData3,
} from "../../data/data-components/data-TopSellers.js";
import clsx from "clsx";
import useThemeMode from "../../hooks/useThemeMode";

function TopSellersContainer() {
  const isLightMode = useThemeMode();

  return (
    <section 
      className={
        clsx(
          "about-us-area section-padding-50 clearfix",
          isLightMode && "bg-light"
        )
      }
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-12">
            <div className="who-we-contant">
              <div className="dream-dots text-left">
                <span className="gradient-text">Người sáng tạo</span>
              </div>
              <h4 className={clsx(isLightMode && "text-dark")}>Top Sellers Trong Tháng</h4>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className={clsx("creator-sec", isLightMode ? "ll-bg" : "dd-bg")}>
              {TopSellersData1 &&
                TopSellersData1.map((item, i) => (
                  <TopSellersItem
                    key={i}
                    rank={item.rank}
                    img={item.img}
                    title={item.title}
                    price={item.price}
                  />
                ))}
            </div>
          </div>

          <div className="col-12 col-lg-4 mt-s">
            <div className={clsx("creator-sec", isLightMode ? "ll-bg" : "dd-bg")}>
              {TopSellersData2 &&
                TopSellersData2.map((item, i) => (
                  <TopSellersItem
                    key={i}
                    rank={item.rank}
                    img={item.img}
                    title={item.title}
                    price={item.price}
                  />
                ))}
            </div>
          </div>

          <div className="col-12 col-lg-4 mt-s">
            <div className={clsx("creator-sec", isLightMode ? "ll-bg" : "dd-bg")}>
              {TopSellersData3 &&
                TopSellersData3.map((item, i) => (
                  <TopSellersItem
                    key={i}
                    rank={item.rank}
                    img={item.img}
                    title={item.title}
                    price={item.price}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopSellersContainer;
