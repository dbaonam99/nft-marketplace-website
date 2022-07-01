const hre = require("hardhat");
const fs = require("fs");

const ADMIN_ADDRESS = "0xB809bbe7Baca49b75DA0364468b6821A8A1113c9";

module.exports = async () => {
  /* ----------------- History Contract ----------------- */

  const History = await hre.ethers.getContractFactory("History");
  const history = await History.deploy();
  await history.deployed();
  console.log("History deployed to:", history.address);
  fs.writeFileSync(
    "../web/src/contracts/History.address.js",
    `export const HISTORY_ADDRESS = "${history.address}";`
  );
  fs.writeFileSync(
    "../web-admin/src/contracts/History.address.js",
    `export const HISTORY_ADDRESS = "${history.address}";`
  );

  /* ----------------- Token Contract ----------------- */

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy(ADMIN_ADDRESS);
  await token.deployed();
  console.log("Token deployed to:", token.address);
  fs.writeFileSync(
    "../web/src/contracts/Token.address.js",
    `export const TOKEN_ADDRESS = "${token.address}";`
  );
  fs.writeFileSync(
    "../web-admin/src/contracts/Token.address.js",
    `export const TOKEN_ADDRESS = "${token.address}";`
  );

  /* ----------------- NFT Contract ----------------- */

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(history.address);
  await nft.deployed();
  console.log("NFT deployed to:", nft.address);
  fs.writeFileSync(
    "../web/src/contracts/NFT.address.js",
    `export const NFT_ADDRESS = "${nft.address}";`
  );
  fs.writeFileSync(
    "../web-admin/src/contracts/NFT.address.js",
    `export const NFT_ADDRESS = "${nft.address}";`
  );

  /* ----------------- Auction Contract ----------------- */

  const Auction = await hre.ethers.getContractFactory("NFTAuction");
  const auction = await Auction.deploy(
    token.address,
    ADMIN_ADDRESS,
    history.address
  );
  await auction.deployed();
  console.log("Auction deployed to:", auction.address);
  fs.writeFileSync(
    "../web/src/contracts/Auction.address.js",
    `export const AUCTION_ADDRESS = "${auction.address}";`
  );
  fs.writeFileSync(
    "../web-admin/src/contracts/Auction.address.js",
    `export const AUCTION_ADDRESS = "${auction.address}";`
  );

  /* ----------------- Market Contract ----------------- */

  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy(
    token.address,
    ADMIN_ADDRESS,
    history.address
  );
  await nftMarket.deployed();
  console.log("NFTMarket deployed to:", nftMarket.address);
  fs.writeFileSync(
    "../web/src/contracts/NFTMarket.address.js",
    `export const MARKET_ADDRESS = "${nftMarket.address}";`
  );
  fs.writeFileSync(
    "../web-admin/src/contracts/NFTMarket.address.js",
    `export const MARKET_ADDRESS = "${nftMarket.address}";`
  );
};

module.exports.tags = ["NFT"];
