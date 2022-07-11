import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { AUCTION_ADDRESS } from "../contracts/Auction.address";
import AUCTION_ABI from "../contracts/contracts/NFTAuction.sol/NFTAuction.json";
import { useMoralis } from "react-moralis";
import { useGetBidedAuctionQuery } from "../queries/Auction";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const { user } = useMoralis();
  const { data: bidedAuction } = useGetBidedAuctionQuery(
    user?.get("ethAddress")
  );
  const [oldEvent, setOldEvent] = useState([]);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );
    const auctionContract = new ethers.Contract(
      AUCTION_ADDRESS,
      AUCTION_ABI,
      provider
    );

    auctionContract.on("AuctionBid", (auctionId, bidder, price, event) => {
      const data = {
        auctionId: auctionId.toString(),
        bidder,
        price: Number(price.toString()) / 10 ** 10,
        data: event,
      };
      console.log(data);
      // if (bidedAuction?.filter((item) => item === data.auctionId).length > 0) {
      //   setOldEvent((prev) => [...prev, data]);
      // } else {
      //   console.log("not bided any nft");
      // }
    });
  }, [bidedAuction]);

  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
};
