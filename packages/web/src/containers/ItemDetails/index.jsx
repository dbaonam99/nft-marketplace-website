import Breadcrumb from "../../components/Breadcrumb";
import Detailed from "./Detailed";
import SidebarArea from "./SidebarArea";
import HighestBid from "./HighestBid";
import TestPopup from "./TestPopup";
import clsx from "clsx";

import "../../assets/css/itemDetails.css";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { useGetNFTDetailQuery } from "../../queries/NFT";
import { useParams } from "react-router-dom";
import { useGetAuctionDetailQuery } from "../../queries/Auction";

const ItemDetailsContainer = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  let { tokenId } = useParams();
  const { data: nftDetail } = useGetNFTDetailQuery(tokenId);
  const { data: auctionDetail } = useGetAuctionDetailQuery(tokenId);

  console.log("AuctionDetail", auctionDetail);

  return (
    <>
      <Breadcrumb
        namePage={t("header.itemDetails")}
        title={t("header.itemDetails")}
      />
      <section
        className={clsx("section-padding-100", isLightMode && "bg-light")}
      >
        <div className="container">
          {nftDetail && (
            <div className="row">
              <Detailed imageUrl={nftDetail?.image} />

              <SidebarArea {...nftDetail} />

              <HighestBid {...nftDetail} />
            </div>
          )}

          {auctionDetail && (
            <div className="row">
              <Detailed imageUrl={auctionDetail?.image} />

              <SidebarArea {...auctionDetail} />

              <HighestBid {...auctionDetail} />
            </div>
          )}
        </div>
      </section>
      <TestPopup />
    </>
  );
};

export default ItemDetailsContainer;
