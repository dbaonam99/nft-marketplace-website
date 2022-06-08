import HeroContainer from "./Hero";
import TopSellers from "../../components/TopSellers";
import ListedItems from "../../components/ListedItems";
import LiveAuctions from "../../components/LiveAuctions";

import "../../assets/css/home.css";
import { useTopSellerQuery } from "../../queries/NFT";
import { useEffect } from "react";

const HomeContainer = () => {
  const { data, refetch } = useTopSellerQuery();

  useEffect(() => {
    // refetch();
    // console.log("home", data);
  }, []);

  console.log(data);

  return (
    <>
      <HeroContainer />
      <TopSellers />
      <TopSellers />
      <ListedItems />
      <LiveAuctions />
    </>
  );
};

export default HomeContainer;
