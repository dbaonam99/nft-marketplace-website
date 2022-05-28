import { web3 } from "./web3";
import NFT_ABI from "../contracts/NFT.abi";
import NFTMarket_ABI from "../contracts/NFTMarket.abi";

export const NFT_ADDRESS = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
export const NFTMarket_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

export const NFTContract = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);
export const NFTMarketContract = new web3.eth.Contract(
  NFTMarket_ABI,
  NFTMarket_ADDRESS
);
