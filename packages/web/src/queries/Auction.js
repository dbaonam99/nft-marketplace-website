import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

import AUCTION_ABI from "../contracts/contracts/NFTAuction.sol/NFTAuction.json";
import NFT_ABI from "../contracts/contracts/NFT.sol/NFT.json";

import { AUCTION_ADDRESS } from "../contracts/Auction.address";
import { NFT_ADDRESS } from "../contracts/NFT.address";

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

      let transaction = await contract.startAuction(
        NFT_ADDRESS,
        tokenId,
        price,
        12,
        duration,
        biddingStep,
        { value: listingPrice }
      );

      callback();
      return await transaction.wait();
    },
    {
      onError: (error) => {
        if (error instanceof Error) {
          // toast.error(error.message);
        }
      },

      onSuccess: (data) => {
        // toast.success(data);
      },
    }
  );
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
          startingPrice: i.startingPrice.toString(),
          startTime: i.startTime.toString(),
          duration: i.duration.toString(),
          biddingStep: i.biddingStep.toString(),
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );

    return items;
  });
};
