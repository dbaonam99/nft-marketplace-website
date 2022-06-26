import React from "react";
import InfoComponent from "../InfoComponent";
import clsx from "clsx";
import "./liveAuctions.css";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { useGetAuctionItemsQuery } from "../../queries/Auction";
import LoadingIndicator from "../LoadingIndicator";
import NftCard from "../NftCard";
import { NavLink } from "react-router-dom";

function LiveAuctionsContainer() {
  const isLightMode = useThemeMode();
  const { data: auctionItems, isLoading } = useGetAuctionItemsQuery();
  const { t } = useTranslation();

  return (
    <section
      className={clsx(
        "features section-padding-0-100",
        isLightMode && "bg-light"
      )}
    >
      <div className="container">
        <InfoComponent
          titleSm={t("common.auctions")}
          titleLg={t("common.liveAuctions")}
        />
        <div className="row">
          {isLoading ? (
            <div className="d-flex align-items-center justify-content-center w-100">
              <LoadingIndicator />
            </div>
          ) : (
            <>
              {auctionItems?.map((item, i) => (
                <NftCard key={i} {...item} />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="col-12 col-lg-12 text-center">
        <NavLink className="btn more-btn" to="/discover">
          {t("common.loadmore")}
        </NavLink>
      </div>
    </section>
  );
}

export default LiveAuctionsContainer;
