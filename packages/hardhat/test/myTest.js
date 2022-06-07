const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("NFT Market", function () {
  let market;
  let nft;
  let token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should deploy contracts", async function () {
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    await token.deployed();

    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();
    await nft.deployed();

    const Market = await ethers.getContractFactory("NFTMarket");
    market = await Market.deploy(token.address, owner.address);
    await market.deployed();
  });

  const getBalance = async (address) => {
    const balance = await token.balanceOf(address);
    return balance.toString();
  };

  it("Should create tokens", async function () {
    await nft.connect(addr1).createToken("https://www.mytokenlocation.com");
  });

  it("Should transfer Tokens to Bidders", async function () {
    await token.approve(owner.address, 1000000);

    await token.transferFrom(owner.address, addr1.address, 10000);
    await token.transferFrom(owner.address, addr2.address, 10000);

    expect(await getBalance(addr1.address)).to.equal("10000");
    expect(await getBalance(addr2.address)).to.equal("10000");
  });

  it("Should put a Token for sale", async function () {
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    await nft.connect(addr1).setApprovalForAll(market.address, true);
    await market.connect(addr1).createMarketItem(nft.address, 1, 1000, {
      value: listingPrice,
    });
  });

  it("Should buy a Token", async function () {
    expect(await getBalance(addr1.address)).to.equal("10000");
    expect(await getBalance(addr2.address)).to.equal("10000");

    await token.connect(addr2).approve(market.address, 1000);
    const transaction = await market
      .connect(addr2)
      .buyMarketItem(nft.address, 1, {
        value: 1000,
      });
    await transaction.wait();

    expect(await getBalance(addr1.address)).to.equal("11000");
    expect(await getBalance(addr2.address)).to.equal("8900"); // 100 is listing price
  });

  it("Should addr2 own a Token", async function () {
    const items = await market.connect(addr2.address).fetchMyNFTs();
    return items.map(async (i) => {
      const item = {
        seller: i.seller,
        owner: i.owner,
        tokenId: i.tokenId.toString(),
      };
      return item;
    });
  });

  it("Should get Token detail", async function () {
    console.log(await market.getTokenDetail(1));
  });
});

describe("NFT Auction", function () {
  let nft;
  let token;
  let auction;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let auctionId;
  let trans;
  let result;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
  });

  it("Should deploy contracts", async function () {
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    await token.deployed();

    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();
    await nft.deployed();

    const Auction = await ethers.getContractFactory("NFTAuction");
    auction = await Auction.deploy(token.address, owner.address);
    await auction.deployed();
  });

  const getBalance = async (address) => {
    const balance = await token.balanceOf(address);
    return balance.toString();
  };

  it("Should create tokens", async function () {
    await nft.connect(addr1).createToken("https://www.mytokenlocation.com");
  });

  it("Should transfer Tokens to Bidders", async function () {
    await token.approve(owner.address, 1000000);

    await token.transferFrom(owner.address, addr1.address, 10000);
    await token.transferFrom(owner.address, addr2.address, 10000);
    await token.transferFrom(owner.address, addr3.address, 10000);

    expect(await getBalance(addr1.address)).to.equal("10000");
    expect(await getBalance(addr2.address)).to.equal("10000");
    expect(await getBalance(addr3.address)).to.equal("10000");
  });

  it("Should start a Auction", async function () {
    const date = new Date();
    date.setDate(date.getDate());
    const startDate = Math.floor(date.getTime() / 1000);

    await nft.connect(addr1).setApprovalForAll(auction.address, true);
    trans = await auction.connect(addr1).startAuction(
      nft.address,
      1,
      1, // starting price
      startDate,
      10,
      1
    );
    result = await trans.wait();
    auctionId = result.events[2].args.auctionId;
  });

  it("Should addr2 bid a Auction", async function () {
    await token.connect(owner).approve(auction.address, 1000000);
    await token.connect(addr2).approve(auction.address, 1000);

    await auction.connect(addr2).bid(auctionId, {
      value: 1000,
    });

    expect(await getBalance(addr2.address)).to.equal("9000");
  });

  it("Should addr3 bid a Auction", async function () {
    expect(await getBalance(addr2.address)).to.equal("9000");
    expect(await getBalance(addr3.address)).to.equal("10000");

    await token.connect(addr3).approve(auction.address, 2000);
    await auction.connect(addr3).bid(auctionId, {
      value: 2000,
    });

    // When addr3 make a bid, addr2 will received money that bid before
    expect(await getBalance(addr2.address)).to.equal("10000");
    expect(await getBalance(addr3.address)).to.equal("8000");
  });

  it("Should end a Auction", async function () {
    await nft.connect(owner).setApprovalForAll(auction.address, true);

    expect(await getBalance(addr1.address)).to.equal("10000");
    await auction.connect(addr1).endAuction(auctionId);
    expect(await getBalance(addr1.address)).to.equal("12000");
  });
});
