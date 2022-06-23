import TopSellersItem from "../TopSellersItem";
import clsx from "clsx";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import LoadingIndicator from "../LoadingIndicator";

function TopSellersContainer({ data, isTopBuyer, isLoading }) {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  const sortedData = useMemo(() => {
    const counts = {};
    for (let i in data) {
      counts[data[i].user] = 0;
    }
    for (let i in data) {
      counts[data[i].user] += data[i].count;
    }

    const newData = Object.entries(counts).map((item) => ({
      user: item[0],
      count: item[1],
    }));

    const emptyLength = 9 - newData.length;
    for (let i = 0; i < emptyLength; i++) {
      newData.push({ user: "", count: 0 });
    }
    return newData.sort((a, b) => b.count - a.count);
  }, [data]);

  return (
    <section
      className={clsx(
        "about-us-area section-padding-50 clearfix",
        isLightMode && "bg-light"
      )}
    >
      <div className="container top-seller">
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center w-100">
            <LoadingIndicator />
          </div>
        ) : (
          <div className="row align-items-center">
            <div className="col-12 col-lg-12">
              <div className="who-we-contant">
                <div className="dream-dots text-left">
                  <span className="gradient-text">
                    {t("common.creativeCreators")}
                  </span>
                </div>
                <h4 className={clsx(isLightMode && "text-dark")}>
                  {t(
                    isTopBuyer
                      ? "common.topMonthBuyers"
                      : "common.topMonthSellers"
                  )}
                </h4>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div
                className={clsx("creator-sec", isLightMode ? "ll-bg" : "dd-bg")}
              >
                {sortedData?.slice(0, 3)?.map((item, i) => (
                  <TopSellersItem
                    key={i}
                    rank={i + 1}
                    user={item.user}
                    price={item.count}
                  />
                ))}
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div
                className={clsx("creator-sec", isLightMode ? "ll-bg" : "dd-bg")}
              >
                {sortedData?.slice(3, 6)?.map((item, i) => (
                  <TopSellersItem
                    key={i}
                    rank={i + 4}
                    user={item.user}
                    price={item.count}
                  />
                ))}
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div
                className={clsx("creator-sec", isLightMode ? "ll-bg" : "dd-bg")}
              >
                {sortedData?.slice(6, 9)?.map((item, i) => (
                  <TopSellersItem
                    key={i}
                    rank={i + 7}
                    user={item.user}
                    price={item.count}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TopSellersContainer;
