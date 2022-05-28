import { useEffect } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import InfoComponent from "../InfoComponent";
import ListedItemsItem from "../ListedItemsItem";

import "./listedItems.css";

import useThemeMode from "../../hooks/useThemeMode";
import { useGetNFTsQuery } from "../../queries/NFT";
import { useTranslation } from "react-i18next";

function ListedItemsContainer() {
  const isLightMode = useThemeMode();
  const { data: NFTs } = useGetNFTsQuery();
  const { t } = useTranslation();

  return (
    <section
      className={clsx(
        "features section-padding-0-100 ",
        isLightMode && "bg-light"
      )}
    >
      <div className="container">
        <InfoComponent
          titleSm={t("common.discoverNewItems")}
          titleLg={t("common.newNFTList")}
        />
        <div className="row align-items-center">
          {NFTs?.map((item) => (
            <ListedItemsItem
              key={item.tokenId}
              tokenId={item.tokenId}
              imgBig={item.image}
              imgSm={item.image}
              title={item.name}
              price={item.price}
              bid={item.bid}
            />
          ))}
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
