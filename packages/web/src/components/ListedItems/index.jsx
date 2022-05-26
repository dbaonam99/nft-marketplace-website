import { useEffect } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import InfoComponent from "../InfoComponent";
import ListedItemsItem from "../ListedItemsItem";
import { ListedItemsData } from "../../data/data-components/data-ListedItems.js";

import "./listedItems.css";

import useThemeMode from "../../hooks/useThemeMode";
import { useGetNFTsQuery } from "../../queries/NFT";

function ListedItemsContainer() {
  const isLightMode = useThemeMode();
  const { data: NFTs } = useGetNFTsQuery();

  return (
    <section
      className={clsx(
        "features section-padding-0-100 ",
        isLightMode && "bg-light"
      )}
    >
      <div className="container">
        <InfoComponent
          titleSm="Khám phá các NFT mới"
          titleLg="Danh Sách NFT mới nhất"
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
          {/* {ListedItemsData?.map((item) => (
            <ListedItemsItem
              key={item.id}
              tokenId={item.id}
              imgBig={item.imgBig}
              imgSm={item.imgSm}
              title={item.title}
              price={item.price}
              bid={item.bid}
            />
          ))} */}
          <div className="col-12 col-lg-12 text-center">
            <NavLink className="btn more-btn" to="/discover">
              Xem Thêm
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListedItemsContainer;
