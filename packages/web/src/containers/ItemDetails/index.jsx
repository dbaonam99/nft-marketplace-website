import Detailed from "./Detailed";
import SidebarArea from "./SidebarArea";
import clsx from "clsx";

import "../../assets/css/itemDetails.css";
import useThemeMode from "../../hooks/useThemeMode";
import { useGetNFTDetailQuery } from "../../queries/NFT";
import { useParams } from "react-router-dom";
import { useGetAuctionDetailQuery } from "../../queries/Auction";

const ItemDetailsContainer = () => {
  const isLightMode = useThemeMode();
  let { tokenId } = useParams();
  const { data: nftDetail } = useGetNFTDetailQuery(tokenId);
  const { data: auctionDetail } = useGetAuctionDetailQuery(tokenId);

  console.log(auctionDetail);
  return (
    <>
      <section
        className={clsx(
          "section-padding-100 item-detail-section",
          isLightMode && "bg-light"
        )}
      >
        <div className="container">
          {nftDetail && (
            <div className="row">
              <Detailed imageUrl={nftDetail?.image} />
              <SidebarArea {...nftDetail} />
            </div>
          )}

          {auctionDetail && (
            <div className="row item-detail-container">
              <Detailed imageUrl={auctionDetail?.image} />
              <SidebarArea {...auctionDetail} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ItemDetailsContainer;
