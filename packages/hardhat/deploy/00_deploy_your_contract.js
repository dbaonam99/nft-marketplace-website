const hre = require("hardhat");

module.exports = async () => {
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();

  console.log("Token deployed to:", token.address);

  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy();

  await nftMarket.deployed();

  console.log("NFTMarket deployed to:", nftMarket.address);

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();

  await nft.deployed();
  console.log("NFT deployed to:", nft.address);

  const Auction = await hre.ethers.getContractFactory("NFTAuction");
  const auction = await Auction.deploy(token.address);

  await auction.deployed();
  console.log("Auction deployed to:", auction.address);
};
module.exports.tags = ["NFT"];
