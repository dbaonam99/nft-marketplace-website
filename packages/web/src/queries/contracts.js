import { web3 } from "./web3";
import NFT_ABI from "../contracts/NFT.abi";
import NFTMarket_ABI from "../contracts/NFTMarket.abi";

export const NFT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const NFTMarket_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const NFTContract = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);
export const NFTMarketContract = new web3.eth.Contract(
  NFTMarket_ABI,
  NFTMarket_ADDRESS
);
