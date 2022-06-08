import Web3Modal from "web3modal";
import { useMoralis } from "react-moralis";
import axios from "axios";
import { ethers } from "ethers";
import { useMutation, useQuery } from "react-query";
import { useAuth } from "../auth/account";

import NFT_ABI from "../contracts/contracts/NFT.sol/NFT.json";
import NFTMarket_ABI from "../contracts/contracts/NFTMarket.sol/NFTMarket.json";
import Token_ABI from "../contracts/contracts/Token.sol/Token.json";

import { TOKEN_ADDRESS } from "../contracts/Token.address";
import { NFT_ADDRESS } from "../contracts/NFT.address";
import { MARKET_ADDRESS } from "../contracts/NFTMarket.address";

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
          // toast.error(error.message);
        }
      },

      onSuccess: (data) => {
        // toast.success(data);
      },
    }
  );
};

export const useCreateNFTMarketItemMutation = () => {
  return useMutation(
    async ({ listingPrice, tokenId, price, callback }) => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const marketContract = new ethers.Contract(
        MARKET_ADDRESS,
        NFTMarket_ABI,
        signer
      );

      const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
      await nftContract.setApprovalForAll(MARKET_ADDRESS, true);

      const transaction = await marketContract.createMarketItem(
        NFT_ADDRESS,
        tokenId,
        price.toString(),
        {
          value: listingPrice,
        }
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

export const useBuyNFTMutation = () => {
  const { user } = useMoralis();
  return useMutation(
    async ({ tokenId, price }) => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const marketContract = new ethers.Contract(
        MARKET_ADDRESS,
        NFTMarket_ABI,
        signer
      );

      const tokenContract = new ethers.Contract(
        TOKEN_ADDRESS,
        Token_ABI,
        signer
      );

      await tokenContract.approve(MARKET_ADDRESS, price);
      const transaction = await marketContract.buyMarketItem(
        NFT_ADDRESS,
        tokenId,
        {
          value: price,
        }
      );
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

export const useGetListingPriceQuery = () => {
  return useQuery("listingPrice", async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(MARKET_ADDRESS, NFTMarket_ABI, signer);

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
      MARKET_ADDRESS,
      NFTMarket_ABI,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
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

export const useGetNFTDetailQuery = (tokenId) => {
  return useQuery("NFTDetail", async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );

    const tokenContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider);
    const marketContract = new ethers.Contract(
      MARKET_ADDRESS,
      NFTMarket_ABI,
      provider
    );

    const data = await marketContract.getTokenDetail(tokenId);
    const tokenUri = await tokenContract.tokenURI(data.tokenId);
    const meta = await axios.get(tokenUri);
    const item = {
      price: data.price,
      tokenId: data.tokenId.toNumber(),
      seller: data.seller,
      owner: data.owner,
      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description,
    };
    return item;
  });
};

export const useGetCreatedNFTsQuery = () => {
  const { user } = useMoralis();

  return useQuery("createNFTs", async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );

    const tokenContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider);
    const marketContract = new ethers.Contract(
      MARKET_ADDRESS,
      NFTMarket_ABI,
      provider
    );

    const data = await marketContract
      .connect(user?.get("ethAddress"))
      .fetchItemsCreated();

    console.log("data", data);

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
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

export const useTopSellerQuery = () => {
  return useQuery("topSeller", async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );

    const marketContract = new ethers.Contract(
      MARKET_ADDRESS,
      NFTMarket_ABI,
      provider
    );

    const data = await marketContract.getTopSeller();

    const items = data.map((i) => ({
      user: i.user,
      count: i.count,
    }));

    return items;
  });
};
