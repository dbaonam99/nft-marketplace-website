import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

import AUCTION_ABI from "../contracts/contracts/NFTAuction.sol/NFTAuction.json";
import NFT_ABI from "../contracts/contracts/NFT.sol/NFT.json";
import Token_ABI from "../contracts/contracts/Token.sol/Token.json";
import NFTMarket_ABI from "../contracts/contracts/NFTMarket.sol/NFTMarket.json";

import { AUCTION_ADDRESS } from "../contracts/Auction.address";
import { NFT_ADDRESS } from "../contracts/NFT.address";
import { TOKEN_ADDRESS } from "../contracts/Token.address";
import { MARKET_ADDRESS } from "../contracts/NFTMarket.address";

export const useGetOnSaleItemsQuery = (ethAddress) => {
  return useQuery(
    "onSaleItems",
    async () => {
      if (!ethAddress) return;
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:8545"
      );

      const tokenContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider);
      const auctionContract = new ethers.Contract(
        AUCTION_ADDRESS,
        AUCTION_ABI,
        provider
      );
      const marketContract = new ethers.Contract(
        MARKET_ADDRESS,
        NFTMarket_ABI,
        provider
      );

      const auctionData = await auctionContract.fetchAuctionItems();
      const auctionItems = await Promise.all(
        auctionData.map(async (i) => {
          const tokenUri = await tokenContract.tokenURI(i.tokenId);
          const meta = await axios.get(tokenUri);
          let item = {
            auctionId: i.auctionId.toString(),
            owner: i.owner,
            tokenId: i.tokenId.toString(),
            startingPrice: Number(i.startingPrice.toString()) / 10 ** 10,
            startTime: i.startTime.toString(),
            duration: i.duration.toString(),
            biddingStep: i.biddingStep.toString(),
            highestBidAmount: Number(i.highestBidAmount.toString()) / 10 ** 10,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            createdDate: i.createdDate.toString(),
            type: "auction",
          };
          return item;
        })
      );

      const marketData = await marketContract.fetchMarketItems();
      const marketItems = await Promise.all(
        marketData.map(async (i) => {
          const tokenUri = await tokenContract.tokenURI(i.tokenId);
          const meta = await axios.get(tokenUri);
          let item = {
            price: Number(i.price.toString()) / 10 ** 10,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            itemId: i.itemId.toNumber(),
            type: "market",
          };
          return item;
        })
      );

      return (
        [
          ...auctionItems.filter(
            (item) => item.owner.toLowerCase() === ethAddress.toLowerCase()
          ),
          ...marketItems.filter(
            (item) => item.seller.toLowerCase() === ethAddress.toLowerCase()
          ),
        ] || []
      );
    },
    {
      refetchInterval: 5000,
    }
  );
};

export const useGetOwnedItemsQuery = (ethAddress) => {
  return useQuery(
    "ownedItems",
    async () => {
      if (!ethAddress) return;
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:8545"
      );

      const tokenContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider);
      const auctionContract = new ethers.Contract(
        AUCTION_ADDRESS,
        AUCTION_ABI,
        provider
      );
      const marketContract = new ethers.Contract(
        MARKET_ADDRESS,
        NFTMarket_ABI,
        provider
      );

      const auctionData = await auctionContract.fetchMyAuctionItems(ethAddress);
      const auctionItems = await Promise.all(
        auctionData.map(async (i) => {
          const tokenUri = await tokenContract.tokenURI(i.tokenId);
          const meta = await axios.get(tokenUri);
          let item = {
            auctionId: i.auctionId.toString(),
            owner: i.owner,
            tokenId: i.tokenId.toString(),
            startingPrice: Number(i.startingPrice.toString()) / 10 ** 10,
            startTime: i.startTime.toString(),
            duration: i.duration.toString(),
            biddingStep: i.biddingStep.toString(),
            highestBidAmount: Number(i.highestBidAmount.toString()) / 10 ** 10,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            createdDate: i.createdDate.toString(),
            ended: i.ended,
            type: "auction",
          };
          return item;
        })
      );

      const marketData = await marketContract.fetchMyNFTs(ethAddress);
      const marketItems = await Promise.all(
        marketData.map(async (i) => {
          const tokenUri = await tokenContract.tokenURI(i.tokenId);
          const meta = await axios.get(tokenUri);
          let item = {
            price: Number(i.price.toString()) / 10 ** 10,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            sold: i.sold,
            itemId: i.itemId.toNumber(),
          };
          return item;
        })
      );

      console.log([...auctionItems]);

      return [...auctionItems, ...marketItems] || [];
    },
    {
      refetchInterval: 5000,
    }
  );
};

export const useGetCreatedItemsQuery = (ethAddress) => {
  return useQuery(
    "createdItems",
    async () => {
      if (!ethAddress) return;
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:8545"
      );

      const tokenContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider);
      const auctionContract = new ethers.Contract(
        AUCTION_ADDRESS,
        AUCTION_ABI,
        provider
      );
      const marketContract = new ethers.Contract(
        MARKET_ADDRESS,
        NFTMarket_ABI,
        provider
      );

      const marketData = await marketContract.fetchItemsCreated(ethAddress);

      const marketItems = await Promise.all(
        marketData.map(async (i) => {
          const tokenUri = await tokenContract.tokenURI(i.tokenId);
          const meta = await axios.get(tokenUri);
          let item = {
            price: Number(i.price.toString()) / 10 ** 10,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            itemId: i.itemId.toNumber(),
          };
          return item;
        })
      );

      const auctionData = await auctionContract.fetchAuctionItemsCreated(
        ethAddress
      );

      const auctionItems = await Promise.all(
        auctionData.map(async (i) => {
          const tokenUri = await tokenContract.tokenURI(i.tokenId);
          const meta = await axios.get(tokenUri);
          const item = {
            auctionId: i.auctionId.toString(),
            owner: i.owner,
            tokenId: i.tokenId.toString(),
            startingPrice: Number(i.startingPrice.toString()) / 10 ** 10,
            startTime: i.startTime.toString(),
            duration: i.duration.toString(),
            biddingStep: i.biddingStep.toString(),
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            highestBidAmount: Number(i.highestBidAmount.toString()) / 10 ** 10,
            itemId: i.tokenId.toNumber(),
          };
          return item;
        })
      );

      return [...marketItems, ...auctionItems] || [];
    },
    {
      refetchInterval: 5000,
    }
  );
};
