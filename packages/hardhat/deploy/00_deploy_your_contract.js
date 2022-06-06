const hre = require("hardhat");
const fs = require("fs");

const ADMIN_ADDRESS = "0x8C1bB3eb266b6416278a039de9b61b546093C437";

module.exports = async () => {
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address);
  fs.writeFileSync(
    "../web/src/contracts/Token.address.js",
    `export const TOKEN_ADDRESS = "${token.address}";`
  );

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("NFT deployed to:", nft.address);
  fs.writeFileSync(
    "../web/src/contracts/NFT.address.js",
    `export const NFT_ADDRESS = "${nft.address}";`
  );

  const Auction = await hre.ethers.getContractFactory("NFTAuction");
  const auction = await Auction.deploy(token.address, ADMIN_ADDRESS);
  await auction.deployed();
  console.log("Auction deployed to:", auction.address);
  fs.writeFileSync(
    "../web/src/contracts/Auction.address.js",
    `export const AUCTION_ADDRESS = "${auction.address}";`
  );

  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy(token.address, ADMIN_ADDRESS);
  await nftMarket.deployed();
  console.log("NFTMarket deployed to:", nftMarket.address);

  fs.writeFileSync(
    "../web/src/contracts/NFTMarket.address.js",
    `export const MARKET_ADDRESS = "${nftMarket.address}";`
  );
};

module.exports.tags = ["NFT"];
