import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useMutation, useQuery } from "react-query";
import { NFTMarket_ADDRESS, NFT_ADDRESS } from "./contracts";
import { toast } from "react-toastify";
import NFT_ABI from "../contracts/NFT.abi";
import NFTMarket_ABI from "../contracts/NFTMarket.abi";

export const useCreateNFTMutation = () => {
  return useMutation(
    async ({ url }) => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);

      let transaction = await contract.createToken(url);
      let tx = await transaction.wait();
      let tokenId = tx.events[0].args[2].toNumber();

      return tokenId;
    },
    {
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      },

      onSuccess: (data) => {
        toast.success(data);
      },
    }
  );
};

export const useCreateNFTMarketItemMutation = () => {
  return useMutation(
    async ({ listingPrice, tokenId, price }) => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        NFTMarket_ADDRESS,
        NFTMarket_ABI,
        signer
      );

      console.log(contract.createMarketItem);

      const transaction = await contract.createMarketItem(
        NFTMarket_ADDRESS,
        tokenId,
        price,
        {
          value: listingPrice,
        }
      );

      return await transaction.wait();
    },
    {
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      },

      onSuccess: (data) => {
        toast.success(data);
      },
    }
  );
};

export const useGetListingPriceQuery = () => {
  return useQuery("listingPrice", async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      NFTMarket_ADDRESS,
      NFTMarket_ABI,
      signer
    );

    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    return listingPrice;
  });
};
