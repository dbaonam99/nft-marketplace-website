import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useMutation } from "react-query";

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
