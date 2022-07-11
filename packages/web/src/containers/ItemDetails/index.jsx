import Detailed from "./Detailed";
import AuctionSidebar from "./AuctionSidebar";
import MarketSideBar from "./MarketSideBar";
import clsx from "clsx";

import "../../assets/css/itemDetails.css";
import useThemeMode from "../../hooks/useThemeMode";
import { useGetNFTDetailQuery } from "../../queries/NFT";
import { useParams, useLocation } from "react-router-dom";
import { useGetAuctionDetailQuery } from "../../queries/Auction";

const ItemDetailsContainer = () => {
  const isLightMode = useThemeMode();
  const { tokenId } = useParams();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const isAuctionDetail = sp.get("auction");

  const { data: nftDetail } = useGetNFTDetailQuery(tokenId, isAuctionDetail);
  const { data: auctionDetail } = useGetAuctionDetailQuery(
    tokenId,
    isAuctionDetail
  );

  return (
    <>
      <section
        className={clsx(
          "section-padding-100 item-detail-section",
          isLightMode && "bg-light"
        )}
      >
        <div className="container">
          {isAuctionDetail ? (
            <div className="row item-detail-container">
              <Detailed imageUrl={auctionDetail?.image} />
              <AuctionSidebar {...auctionDetail} />
            </div>
          ) : (
            <div className="row item-detail-container">
              <Detailed imageUrl={nftDetail?.image} />
              <MarketSideBar {...nftDetail} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ItemDetailsContainer;
