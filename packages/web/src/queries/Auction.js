import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

import AUCTION_ABI from "../contracts/contracts/NFTAuction.sol/NFTAuction.json";
import NFT_ABI from "../contracts/contracts/NFT.sol/NFT.json";
import Token_ABI from "../contracts/contracts/Token.sol/Token.json";

import { AUCTION_ADDRESS } from "../contracts/Auction.address";
import { NFT_ADDRESS } from "../contracts/NFT.address";
import { TOKEN_ADDRESS } from "../contracts/Token.address";

export const useCreateAuctionMutation = () => {
  return useMutation(
    async ({
      listingPrice,
      tokenId,
      price,
      duration,
      biddingStep,
      callback,
    }) => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        AUCTION_ADDRESS,
        AUCTION_ABI,
        signer
      );

      const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
      await nftContract.setApprovalForAll(AUCTION_ADDRESS, true);

      const date = new Date();
      date.setDate(date.getDate());
      const startDate = Math.floor(date.getTime() / 1000);

      const _price = price * 10 ** 10;
      let transaction = await contract.startAuction(
        NFT_ADDRESS,
        tokenId,
        _price,
        startDate,
        duration,
        biddingStep,
        { value: listingPrice }
      );

      callback();
      return await transaction.wait();
    }
  );
};

export const useEndAuctionMutation = () => {
  return useMutation(async ({ auctionId }) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(AUCTION_ADDRESS, AUCTION_ABI, signer);
    const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);

    await nftContract.setApprovalForAll(AUCTION_ADDRESS, true);
    let transaction = await contract.endAuction(auctionId);

    return await transaction.wait();
  });
};

export const useBidMutation = () => {
  return useMutation(async ({ auctionId, price }) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(AUCTION_ADDRESS, AUCTION_ABI, signer);

    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, Token_ABI, signer);

    const _price = price * 10 ** 10;
    await tokenContract.approve(AUCTION_ADDRESS, _price);
    let transaction = await contract.bid(auctionId, {
      value: _price,
    });

    return await transaction.wait();
  });
};

export const useGetAuctionItemsQuery = () => {
  return useQuery("auctionItems", async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );

    const tokenContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider);
    const auctionContract = new ethers.Contract(
      AUCTION_ADDRESS,
      AUCTION_ABI,
      provider
    );

    const data = await auctionContract.fetchAuctionItems();

    const items = await Promise.all(
      data.map(async (i) => {
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

    return items;
  });
};

export const useGetAuctionDetailQuery = (tokenId) => {
  return useQuery("AuctionDetail", async () => {
    if (!tokenId) return;
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );

    const tokenContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider);
    const auctionContract = new ethers.Contract(
      AUCTION_ADDRESS,
      AUCTION_ABI,
      provider
    );

    const data = await auctionContract.getAuctionDetail(tokenId);
    const tokenUri = await tokenContract.tokenURI(data.tokenId);
    const meta = await axios.get(tokenUri);

    const item = {
      auctionId: data.auctionId.toString(),
      owner: data.owner,
      tokenId: data.tokenId.toString(),
      startingPrice: Number(data.startingPrice.toString()) / 10 ** 10,
      startTime: data.startTime.toString(),
      duration: data.duration.toString(),
      biddingStep: data.biddingStep.toString(),
      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description,
      createdDate: data.createdDate.toString(),
      highestBidAmount: Number(data.highestBidAmount.toString()) / 10 ** 10,
    };
    return item;
  });
};

export const useGetHighestBidderQuery = ({ auctionId }) => {
  return useQuery("highestBidder", async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );

    const auctionContract = new ethers.Contract(
      AUCTION_ADDRESS,
      AUCTION_ABI,
      provider
    );

    const data = await auctionContract.getCurrentBidOwner(auctionId);

    return data.toString();
  });
};

export const useGetHighestBidAmountQuery = ({ auctionId }) => {
  return useQuery(
    "highestBidAmount",
    async () => {
      if (!auctionId) return;
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:8545"
      );

      const auctionContract = new ethers.Contract(
        AUCTION_ADDRESS,
        AUCTION_ABI,
        provider
      );

      const data = await auctionContract.getCurrentBidAmount(auctionId);

      return data.toString();
    },
    {
      refetchInterval: 2000,
    }
  );
};

export const useGetBidHistoryQuery = ({ auctionId }) => {
  return useQuery(
    "bidHistory",
    async () => {
      if (!auctionId) return;
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:8545"
      );

      const auctionContract = new ethers.Contract(
        AUCTION_ADDRESS,
        AUCTION_ABI,
        provider
      );

      const data = await auctionContract.getAuctionHistory(auctionId);

      const items = await Promise.all(
        data.map(async (i) => {
          console.log(i);
          let item = {
            price: Number(i.price.toString()) / 10 ** 10,
            auctionId: i.auctionId.toNumber(),
            bidder: i.bidder,
            bidDate: i.bidDate,
            description: i.description,
          };
          return item;
        })
      );
      return items.reverse();
    },
    {
      refetchInterval: 2000,
    }
  );
};

export const useGetMyAuctionItemsQuery = (ethAddress) => {
  return useQuery(
    "myAuctionItems",
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

      const data = await auctionContract.fetchMyAuctionItems(ethAddress);

      const items = await Promise.all(
        data.map(async (i) => {
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
          };
          return item;
        })
      );

      return items || [];
    },
    {
      refetchInterval: 5000,
    }
  );
};
