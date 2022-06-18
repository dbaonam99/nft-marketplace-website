import TopSellersItem from "../TopSellersItem";
import clsx from "clsx";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { ethers } from "ethers";
import { useMemo } from "react";

function TopSellersContainer({ data, isTopBuyer }) {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  const sortedData = useMemo(
    () =>
      data?.sort(
        (a, b) =>
          ethers.utils.formatUnits(b?.count.toString(), "ether") -
          ethers.utils.formatUnits(a?.count.toString(), "ether")
      ),
    [data]
  );

  return (
    <section
      className={clsx(
        "about-us-area section-padding-50 clearfix",
        isLightMode && "bg-light"
      )}
    >
      <div className="container">
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
              {sortedData &&
                sortedData?.length > 0 &&
                sortedData
                  ?.slice(0, 3)
                  ?.map((item, i) => (
                    <TopSellersItem
                      key={item.user}
                      rank={i}
                      user={item.user}
                      price={ethers.utils.formatUnits(
                        item.count.toString(),
                        "ether"
                      )}
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
