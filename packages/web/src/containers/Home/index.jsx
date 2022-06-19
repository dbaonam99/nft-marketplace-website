import HeroContainer from "./Hero";
import TopSellers from "../../components/TopSellers";
import ListedItems from "../../components/ListedItems";
import LiveAuctions from "../../components/LiveAuctions";

import "../../assets/css/home.css";
import { useTopBuyerQuery, useTopSellerQuery } from "../../queries/NFT";

const HomeContainer = () => {
  const { data: topSellers, isLoading: isTopSellersLoading } = useTopSellerQuery();
  const { data: topBuyers, isLoading: isTopBuyerLoading } = useTopBuyerQuery();

  return (
    <>
      <HeroContainer />
      <TopSellers data={topSellers} isLoading={isTopSellersLoading} />
      <TopSellers isTopBuyer data={topBuyers} isLoading={isTopBuyerLoading} />
      <ListedItems />
      <LiveAuctions />
    </>
  );
};

export default HomeContainer;
