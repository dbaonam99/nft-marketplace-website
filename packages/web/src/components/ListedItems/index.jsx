import React from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import InfoComponent from "../InfoComponent";

import "./listedItems.css";

import useThemeMode from "../../hooks/useThemeMode";
import { useGetMarketItemsQuery } from "../../queries/NFT";
import { useTranslation } from "react-i18next";
import LoadingIndicator from "../LoadingIndicator";
import NftCard from "../NftCard";

function ListedItemsContainer() {
  const isLightMode = useThemeMode();
  const { data: NFTs, isLoading } = useGetMarketItemsQuery();
  const { t } = useTranslation();

  return (
    <section
      className={clsx(
        "features section-padding-0-100",
        isLightMode && "bg-light"
      )}
      style={{ paddingTop: 100 }}
    >
      <div className="container">
        <InfoComponent
          titleSm={t("common.discoverNewItems")}
          titleLg={t("common.newNFTList")}
        />
        <div className="row">
          {isLoading ? (
            <div className="d-flex align-items-center justify-content-center w-100">
              <LoadingIndicator />
            </div>
          ) : (
            <>
              {NFTs?.map((item, index) => (
                <NftCard key={index} {...item} />
              ))}
            </>
          )}
          <div className="col-12 col-lg-12 text-center">
            <NavLink className="btn more-btn" to="/discover">
              {t("common.loadmore")}
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListedItemsContainer;
