import React from "react";
import InfoComponent from "../InfoComponent";
import LiveAuctionsItem from "../LiveAuctionsItem";
import clsx from "clsx";
import "./liveAuctions.css";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { useGetAuctionItemsQuery } from "../../queries/Auction";
import LoadingIndicator from "../LoadingIndicator";

function LiveAuctionsContainer() {
  const isLightMode = useThemeMode();
  const { data: auctionItems, isLoading } = useGetAuctionItemsQuery();
  const { t } = useTranslation();


  return (
    <section
      className={clsx(
        "features section-padding-50 ",
        isLightMode && "bg-light"
      )}
    >
      <div className="container">
        <InfoComponent
          titleSm={t("common.auctions")}
          titleLg={t("common.liveAuctions")}
        />
        <div className="row">
          {isLoading ?
            <div
              className="d-flex align-items-center justify-content-center w-100"
            >
              <LoadingIndicator />
            </div> :
            <>
              {auctionItems?.map((item, i) => (
                <LiveAuctionsItem
                  key={i}
                  imgBig={item.image}
                  title={item.name}
                  seller={item.owner}
                  auctionId={item.auctionId}
                  price={item.startingPrice}
                  bid={item.bid}
                />
              ))}
            </>
          }
        </div>
      </div>
    </section>
  );
}

export default LiveAuctionsContainer;
