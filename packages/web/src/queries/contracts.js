import { web3 } from "./web3";
import NFT_ABI from "../contracts/NFT.abi";
import NFTMarket_ABI from "../contracts/NFTMarket.abi";

export const TOKEN_ADDRESS = "0xCD8a1C3ba11CF5ECfa6267617243239504a98d90";
export const NFT_ADDRESS = "0x82e01223d51Eb87e16A03E24687EDF0F294da6f1";
export const NFTMarket_ADDRESS = "0x7969c5eD335650692Bc04293B07F5BF2e7A673C0";

export const NFTContract = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);
export const NFTMarketContract = new web3.eth.Contract(
  NFTMarket_ABI,
  NFTMarket_ADDRESS
);
