import Web3Modal from "web3modal";
import axios from "axios";
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

      const transaction = await contract.createMarketItem(
        NFT_ADDRESS,
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

export const useGetNFTsQuery = () => {
  return useQuery("NFTs", async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );

    const tokenContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider);
    const marketContract = new ethers.Contract(
      NFTMarket_ADDRESS,
      NFTMarket_ABI,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        console.log("tokenUri", tokenUri);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
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
