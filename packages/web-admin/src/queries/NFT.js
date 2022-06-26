import Web3Modal from "web3modal";
import axios from "axios";
import { ethers } from "ethers";
import { useMutation, useQuery } from "react-query";

import NFT_ABI from "../contracts/contracts/NFT.sol/NFT.json";
import NFTMarket_ABI from "../contracts/contracts/NFTMarket.sol/NFTMarket.json";
import Token_ABI from "../contracts/contracts/Token.sol/Token.json";
import HISTORY_ABI from "../contracts/contracts/History.sol/History.json";
import AUCTION_ABI from "../contracts/contracts/NFTAuction.sol/NFTAuction.json";

import { TOKEN_ADDRESS } from "../contracts/Token.address";
import { NFT_ADDRESS } from "../contracts/NFT.address";
import { MARKET_ADDRESS } from "../contracts/NFTMarket.address";
import { HISTORY_ADDRESS } from "../contracts/History.address";
import moment from "moment";
import { AUCTION_ADDRESS } from "../contracts/Auction.address";

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
    async ({ listingPrice, tokenId, price, itemId }) => {
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

      const _price = price * 10 ** 10;

      const transaction = await marketContract.createMarketItem(
        NFT_ADDRESS,
        tokenId,
        _price,
        itemId || 0,
        {
          value: listingPrice,
        }
      );
      return await transaction.wait();
    },
  );
};

export const useBuyNFTMutation = () => {
  return useMutation(
    async ({ itemId, price }) => {
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

      const _price = price * 10 ** 10;

      await tokenContract.approve(MARKET_ADDRESS, _price);
      const transaction = await marketContract.buyMarketItem(
        NFT_ADDRESS,
        itemId,
        {
          value: _price,
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

export const useGetMarketItemsQuery = () => {
  return useQuery(
    "NFTs",
    async () => {
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

      return items || [];
    },
    {
      refetchInterval: 5000,
    }
  );
};

export const useGetNFTDetailQuery = (tokenId) => {
  return useQuery(["NFTDetail", tokenId], async () => {
    if (!tokenId) return;
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
      price: Number(data.price.toString()) / 10 ** 10,
      tokenId: data.tokenId.toNumber(),
      seller: data.seller,
      owner: data.owner,
      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description,
      sold: data.sold,
      itemId: data.itemId.toNumber(),
    };
    return item;
  },
    {
      enabled: !!tokenId
    });
};

export const useGetCreatedNFTsQuery = (ethAddress) => {
  return useQuery(
    "createNFTs",
    async () => {
      if (!ethAddress) return;
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:8545"
      );

      const tokenContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider);
      const marketContract = new ethers.Contract(
        MARKET_ADDRESS,
        NFTMarket_ABI,
        provider
      );

      const createdData = await marketContract.fetchItemsCreated(ethAddress);

      const createdItems = await Promise.all(
        createdData.map(async (i) => {
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

      return createdItems || [];
    },
    {
      refetchInterval: 5000,
    }
  );
};

export const useGetMyNFTsQuery = (ethAddress) => {
  return useQuery(
    "myNFTs",
    async () => {
      if (!ethAddress) return;
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:8545"
      );

      const tokenContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider);
      const marketContract = new ethers.Contract(
        MARKET_ADDRESS,
        NFTMarket_ABI,
        provider
      );

      const data = await marketContract.fetchMyNFTs(ethAddress);

      const items = await Promise.all(
        data.map(async (i) => {
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

      return items || [];
    },
    {
      refetchInterval: 5000,
    }
  );
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
    const auctionContract = new ethers.Contract(
      AUCTION_ADDRESS,
      AUCTION_ABI,
      provider
    );

    const marketData = await marketContract.getTopSeller();
    const auctionData = await auctionContract.getTopSeller();
    const items = [...marketData, ...auctionData].map((i) => {
      return {
        user: i.user,
        count: Number(i.count.toString()) / 10 ** 10,
      };
    });

    return items;
  });
};

export const useTopBuyerQuery = () => {
  return useQuery("topBuyer", async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );

    const marketContract = new ethers.Contract(
      MARKET_ADDRESS,
      NFTMarket_ABI,
      provider
    );
    const auctionContract = new ethers.Contract(
      AUCTION_ADDRESS,
      AUCTION_ABI,
      provider
    );

    const marketData = await marketContract.getTopBuyer();
    const auctionData = await auctionContract.getTopBuyer();

    const items = [...marketData, ...auctionData].map((i) => ({
      user: i.user,
      count: Number(i.count.toString()) / 10 ** 10,
    }));

    return items;
  });
};

export const useGetTokenHistoryQuery = ({ tokenId }) => {
  return useQuery(
    "marketHistory",
    async () => {
      if (!tokenId) return;
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:8545"
      );

      const historyContract = new ethers.Contract(
        HISTORY_ADDRESS,
        HISTORY_ABI,
        provider
      );

      const data = await historyContract.getTokenHistory(tokenId);

      const items = await Promise.all(
        data.map(async (i) => {
          let price = Number(i.price.toString()) / 10 ** 10;
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            user: i.user,
            description: i.description,
            createdDate: i.createdDate.toString(),
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

export const useUserHistoryQuery = (ethAddress) => {
  return useQuery(
    "userHistory",
    async () => {
      if (!ethAddress) return;
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:8545"
      );

      const historyContract = new ethers.Contract(
        HISTORY_ADDRESS,
        HISTORY_ABI,
        provider
      );

      const data = await historyContract.getUserHistory(ethAddress);

      const items = await Promise.all(
        data.map(async (i) => {
          const item = {
            tokenId: i?.tokenId?.toNumber(),
            actionType: i?.actionType,
            date: moment(
              new Date(
                parseInt(i.date.toString()) * 1000
              )
            ).format("DD/MM/YYYY"),
            time: moment(
              new Date(
                parseInt(i.date.toString()) * 1000
              )
            ).format("hh:mm A"),
          };
          return item;
        })
      );

      return items.reverse();
    },
    {
      enabled: !!ethAddress,
    }
    // {
    //   refetchInterval: 2000,
    // }
  );
};
