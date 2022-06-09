import HeroContainer from "./Hero";
import TopSellers from "../../components/TopSellers";
import ListedItems from "../../components/ListedItems";
import LiveAuctions from "../../components/LiveAuctions";

import "../../assets/css/home.css";
import { useTopBuyerQuery, useTopSellerQuery } from "../../queries/NFT";

const HomeContainer = () => {
  const { data: topSellers } = useTopSellerQuery();
  const { data: topBuyers } = useTopBuyerQuery();

  return (
    <>
      <HeroContainer />
      <TopSellers data={topSellers} />
      <TopSellers isTopBuyer data={topBuyers} />
      <ListedItems />
      <LiveAuctions />
    </>
  );
};

export default HomeContainer;
