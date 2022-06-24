const { ethers } = require("hardhat");
const { expect } = require("chai");

const getMarketData = (data, type) => {
  if (type === "auction") {
    return data.map((i) => {
      const item = {
        auctionId: i.auctionId.toString(),
        tokenId: i.tokenId.toString(),
        owner: i.owner,
        creator: i.creator,
        ended: i.ended,
      };
      return item;
    });
  }
  return data.map((i) => {
    const item = {
      itemId: i.itemId.toString(),
      tokenId: i.tokenId.toString(),
      seller: i.seller,
      owner: i.owner,
      creator: i.creator,
      sold: i.sold,
    };
    return item;
  });
};

describe("NFT Marketplace", function () {
  let market;
  let nft;
  let history;
  let token;
  let auction;

  let owner;
  let addr1;
  let addr2;
  let addr3;
  let trans;
  let result;

  let tokenId1;
  let itemId1;

  let tokenId2;
  let itemId2;

  let tokenId3;
  let auctionId3;
  let auctionId4;

  let listingPrice;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
  });

  it("Should deploy contracts", async function () {
    const History = await ethers.getContractFactory("History");
    history = await History.deploy();
    await history.deployed();

    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy(owner.address);
    await token.deployed();

    const Market = await ethers.getContractFactory("NFTMarket");
    market = await Market.deploy(token.address, owner.address, history.address);
    await market.deployed();

    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy(history.address);
    await nft.deployed();

    const Auction = await ethers.getContractFactory("NFTAuction");
    auction = await Auction.deploy(
      token.address,
      owner.address,
      history.address
    );
    await auction.deployed();
  });

  const getBalance = async (address) => {
    const balance = await token.balanceOf(address);
    return balance.toString();
  };

  it("Should transfer Tokens to Bidders", async function () {
    await token.approve(owner.address, 1000000);

    await token.transferFrom(owner.address, addr1.address, 10000);
    await token.transferFrom(owner.address, addr2.address, 10000);
    await token.transferFrom(owner.address, addr3.address, 10000);

    expect(await getBalance(addr1.address)).to.equal("10000");
    expect(await getBalance(addr2.address)).to.equal("10000");
    expect(await getBalance(addr3.address)).to.equal("10000");
  });

  it("Should get listing price", async function () {
    listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();
    expect(listingPrice).to.equal("100");
  });

  describe("NFT Market", function () {
    describe("Token 1", async function () {
      it("Should create tokens", async function () {
        trans = await nft
          .connect(addr1)
          .createToken("https://www.mytokenlocation.com");
        result = await trans.wait();
        tokenId1 = result.events[0].args.tokenId.toString();

        expect(tokenId1).to.equal("1");

        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);

        expect(addr1History.length).to.equal(1);
        expect(addr2History.length).to.equal(0);
      });

      it("Should ADDRESS 1 put a Token for sale", async function () {
        await nft.connect(addr1).setApprovalForAll(market.address, true);
        trans = await market
          .connect(addr1)
          .createMarketItem(nft.address, tokenId1, 1000, 0, {
            value: listingPrice,
          });
        result = await trans.wait();
        itemId1 =
          result.events[0].args && result.events[0].args.itemId
            ? result.events[0].args.itemId.toString()
            : 1;

        expect(result.events[0].args.itemId.toString()).to.equal("1");
        expect(result.events[0].args.tokenId.toString()).to.equal("1");
        expect(result.events[0].args.seller).to.equal(addr1.address);
        expect(result.events[0].args.owner).to.equal(addr1.address);
        expect(result.events[0].args.creator).to.equal(addr1.address);
        expect(result.events[0].args.price).to.equal("1000");
        expect(result.events[0].args.sold).to.equal(false);

        // GET USER HISTORY
        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);
        expect(addr1History.length).to.equal(2);
        expect(addr2History.length).to.equal(0);

        // GET TOKEN DETAIL
        const data = await market.getTokenDetail(tokenId1);
        expect(data.itemId).to.equal("1");
        expect(data.tokenId).to.equal("1");
        expect(data.seller).to.equal(addr1.address);
        expect(data.owner).to.equal(addr1.address);
        expect(data.creator).to.equal(addr1.address);
      });

      it("Should shown Token1 on the market", async function () {
        const data = await market.fetchMarketItems();
        const items = getMarketData(data);

        expect(items.length).to.equal(1);
        expect(items[0].itemId).to.equal("1");
        expect(items[0].tokenId).to.equal("1");
        expect(items[0].seller).to.equal(addr1.address);
        expect(items[0].owner).to.equal(addr1.address);
        expect(items[0].creator).to.equal(addr1.address);
      });

      it("Should ADDRESS 2 buy Token1", async function () {
        await token.connect(addr2).approve(market.address, 1000);
        await market.connect(addr2).buyMarketItem(nft.address, itemId1, {
          value: 1000,
        });
        expect(await getBalance(addr1.address)).to.equal("11000");
        expect(await getBalance(addr2.address)).to.equal("8900"); // 100 is listing price

        // GET USER HISTORY
        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);
        expect(addr1History.length).to.equal(3);
        expect(addr2History.length).to.equal(1);

        // GET TOKEN DETAIL
        let data = await market.getTokenDetail(tokenId1);
        expect(data.itemId).to.equal("1");
        expect(data.tokenId).to.equal("1");
        expect(data.seller).to.equal(addr1.address);
        expect(data.owner).to.equal(addr2.address);
        expect(data.creator).to.equal(addr1.address);

        // ADDRESS 2 OWN TOKEN1
        data = await market.fetchMyNFTs(addr2.address);
        const items = getMarketData(data);

        expect(items.length).to.equal(1);
        expect(items[0].owner).to.equal(addr2.address);
        expect(items[0].creator).to.equal(addr1.address);
        expect(items[0].sold).to.equal(true);
      });

      it("Should hide Token1 on the market", async function () {
        const data = await market.fetchMarketItems();
        const items = getMarketData(data);

        expect(items.length).to.equal(0);
      });

      it("Should ADDRESS 2 put a Token1 for sale", async function () {
        await nft.connect(addr2).setApprovalForAll(market.address, true);
        trans = await market
          .connect(addr2)
          .createMarketItem(nft.address, tokenId1, 2000, itemId1, {
            value: listingPrice,
          });
        result = await trans.wait();

        expect(result.events[0].args.itemId.toString()).to.equal("1");
        expect(result.events[0].args.tokenId.toString()).to.equal("1");
        expect(result.events[0].args.seller).to.equal(addr2.address);
        expect(result.events[0].args.owner).to.equal(addr2.address);
        expect(result.events[0].args.creator).to.equal(addr1.address);
        expect(result.events[0].args.price).to.equal("2000");
        expect(result.events[0].args.sold).to.equal(false);

        // GET USER HISTORY
        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);
        expect(addr1History.length).to.equal(3);
        expect(addr2History.length).to.equal(2);
      });

      it("Should shown Token1 on the market", async function () {
        const data = await market.fetchMarketItems();
        const items = getMarketData(data);

        expect(items.length).to.equal(1);
        expect(items[0].itemId).to.equal("1");
        expect(items[0].tokenId).to.equal("1");
        expect(items[0].seller).to.equal(addr2.address);
        expect(items[0].owner).to.equal(addr2.address);
        expect(items[0].creator).to.equal(addr1.address);
      });

      it("Should ADDRESS 1 is Token1's creator", async function () {
        const data = await market.fetchItemsCreated(addr1.address);
        const items = getMarketData(data);

        expect(items.length).to.equal(1);
        expect(items[0].owner).to.equal(addr2.address);
        expect(items[0].creator).to.equal(addr1.address);
        expect(items[0].sold).to.equal(false);
      });

      it("Should get Token1 detail", async function () {
        const data = await market.getTokenDetail(tokenId1);

        expect(data.itemId).to.equal("1");
        expect(data.tokenId).to.equal("1");
        expect(data.seller).to.equal(addr2.address);
        expect(data.owner).to.equal(addr2.address);
        expect(data.creator).to.equal(addr1.address);
      });

      it("Should get top seller", async function () {
        await market.getTopSeller();
      });

      it("Should get top buyer", async function () {
        await market.getTopBuyer();
      });

      it("Should get history market", async function () {
        const data = await history.getTokenHistory(tokenId1);
        const items = data.map((i) => {
          const item = {
            tokenId: i.tokenId.toString(),
            price: i.price.toString(),
            description: i.description.toString(),
          };
          return item;
        });
        expect(items.length).to.equal(3);
      });
    });

    describe("Token 2", async function () {
      it("Should create tokens", async function () {
        trans = await nft
          .connect(addr1)
          .createToken("https://www.mytokenlocation.com");
        result = await trans.wait();
        tokenId2 = result.events[0].args.tokenId.toString();

        expect(tokenId2).to.equal("2");

        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);

        expect(addr1History.length).to.equal(4);
        expect(addr2History.length).to.equal(2);
      });

      it("Should ADDRESS 1 put Token2 for sale", async function () {
        await nft.connect(addr1).setApprovalForAll(market.address, true);
        trans = await market
          .connect(addr1)
          .createMarketItem(nft.address, tokenId2, 1000, 0, {
            value: listingPrice,
          });
        result = await trans.wait();
        itemId2 =
          result.events[0].args && result.events[0].args.itemId
            ? result.events[0].args.itemId.toString()
            : 2;

        expect(result.events[0].args.itemId.toString()).to.equal("2");
        expect(result.events[0].args.tokenId.toString()).to.equal("2");
        expect(result.events[0].args.seller).to.equal(addr1.address);
        expect(result.events[0].args.owner).to.equal(addr1.address);
        expect(result.events[0].args.creator).to.equal(addr1.address);
        expect(result.events[0].args.price).to.equal("1000");
        expect(result.events[0].args.sold).to.equal(false);

        // GET USER HISTORY
        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);
        expect(addr1History.length).to.equal(5);
        expect(addr2History.length).to.equal(2);

        // GET TOKEN DETAIL
        const data = await market.getTokenDetail(tokenId2);
        expect(data.itemId).to.equal("2");
        expect(data.tokenId).to.equal("2");
        expect(data.seller).to.equal(addr1.address);
        expect(data.owner).to.equal(addr1.address);
        expect(data.creator).to.equal(addr1.address);
      });

      it("Should shown Token2 on the market", async function () {
        const data = await market.fetchMarketItems();
        const items = getMarketData(data);

        expect(items.length).to.equal(2);
        expect(items[1].itemId).to.equal("2");
        expect(items[1].tokenId).to.equal("2");
        expect(items[1].seller).to.equal(addr1.address);
        expect(items[1].owner).to.equal(addr1.address);
        expect(items[1].creator).to.equal(addr1.address);
      });

      it("Should ADDRESS 2 buy Token2", async function () {
        await token.connect(addr2).approve(market.address, 1000);
        await market.connect(addr2).buyMarketItem(nft.address, itemId2, {
          value: 1000,
        });
        expect(await getBalance(addr1.address)).to.equal("12000");
        expect(await getBalance(addr2.address)).to.equal("7800"); // 100 is listing price

        // GET USER HISTORY
        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);
        expect(addr1History.length).to.equal(6);
        expect(addr2History.length).to.equal(3);

        // GET TOKEN DETAIL
        let data = await market.getTokenDetail(tokenId2);
        expect(data.itemId).to.equal("2");
        expect(data.tokenId).to.equal("2");
        expect(data.seller).to.equal(addr1.address);
        expect(data.owner).to.equal(addr2.address);
        expect(data.creator).to.equal(addr1.address);

        // ADDRESS 2 OWN TOKEN1
        data = await market.fetchMyNFTs(addr2.address);
        const items = getMarketData(data);

        expect(items.length).to.equal(2);
        expect(items[1].owner).to.equal(addr2.address);
        expect(items[1].creator).to.equal(addr1.address);
        expect(items[1].sold).to.equal(true);
      });

      it("Should hide Token1 on the market", async function () {
        const data = await market.fetchMarketItems();
        const items = getMarketData(data);

        expect(items.length).to.equal(1);
      });

      it("Should ADDRESS 2 put a Token1 for sale", async function () {
        await nft.connect(addr2).setApprovalForAll(market.address, true);
        trans = await market
          .connect(addr2)
          .createMarketItem(nft.address, tokenId2, 2000, itemId2, {
            value: listingPrice,
          });
        result = await trans.wait();

        expect(result.events[0].args.itemId.toString()).to.equal("2");
        expect(result.events[0].args.tokenId.toString()).to.equal("2");
        expect(result.events[0].args.seller).to.equal(addr2.address);
        expect(result.events[0].args.owner).to.equal(addr2.address);
        expect(result.events[0].args.creator).to.equal(addr1.address);
        expect(result.events[0].args.price).to.equal("2000");
        expect(result.events[0].args.sold).to.equal(false);

        // GET USER HISTORY
        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);
        expect(addr1History.length).to.equal(6);
        expect(addr2History.length).to.equal(4);
      });

      it("Should shown Token1 on the market", async function () {
        const data = await market.fetchMarketItems();
        const items = getMarketData(data);

        expect(items.length).to.equal(2);
        expect(items[1].itemId).to.equal("2");
        expect(items[1].tokenId).to.equal("2");
        expect(items[1].seller).to.equal(addr2.address);
        expect(items[1].owner).to.equal(addr2.address);
        expect(items[1].creator).to.equal(addr1.address);
      });

      it("Should ADDRESS 1 is Token1's creator", async function () {
        const data = await market.fetchItemsCreated(addr1.address);
        const items = getMarketData(data);

        expect(items.length).to.equal(2);
        expect(items[1].owner).to.equal(addr2.address);
        expect(items[1].creator).to.equal(addr1.address);
        expect(items[1].sold).to.equal(false);
      });

      it("Should get Token1 detail", async function () {
        const data = await market.getTokenDetail(tokenId2);

        expect(data.itemId).to.equal("2");
        expect(data.tokenId).to.equal("2");
        expect(data.seller).to.equal(addr2.address);
        expect(data.owner).to.equal(addr2.address);
        expect(data.creator).to.equal(addr1.address);
      });

      it("Should get top seller", async function () {
        await market.getTopSeller();
      });

      it("Should get top buyer", async function () {
        await market.getTopBuyer();
      });

      it("Should get history market", async function () {
        const data = await history.getTokenHistory(tokenId2);
        const items = data.map((i) => {
          const item = {
            tokenId: i.tokenId.toString(),
            price: i.price.toString(),
            description: i.description.toString(),
          };
          return item;
        });
        expect(items.length).to.equal(3);
      });
    });
  });

  describe("NFT Auction", function () {
    describe("Token 3", async function () {
      it("Should create tokens", async function () {
        trans = await nft
          .connect(addr1)
          .createToken("https://www.mytokenlocation.com3");
        result = await trans.wait();
        tokenId3 = result.events[0].args.tokenId.toString();

        expect(tokenId3).to.equal("3");

        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);

        expect(addr1History.length).to.equal(7);
        expect(addr2History.length).to.equal(4);
      });

      it("Should ADDRESS 1 start a Auction", async function () {
        const date = new Date();
        date.setDate(date.getDate());
        const startDate = Math.floor(date.getTime() / 1000);

        await nft.connect(addr1).setApprovalForAll(auction.address, true);
        trans = await auction.connect(addr1).startAuction(
          nft.address,
          tokenId3,
          1, // starting price
          startDate,
          27,
          1,
          {
            value: listingPrice,
          }
        );
        result = await trans.wait();
        auctionId3 =
          result.events[3].args && result.events[3].args.auctionId
            ? result.events[3].args.auctionId.toString()
            : 1;

        expect(result.events[4].args.auctionId.toString()).to.equal("1");
        expect(result.events[4].args.tokenId.toString()).to.equal("3");
        // expect(result.events[4].args.seller).to.equal(addr1.address);
        expect(result.events[4].args.owner).to.equal(addr1.address);
        // expect(result.events[4].args.creator).to.equal(addr1.address);
        expect(result.events[4].args.startingPrice).to.equal("1");
        expect(result.events[4].args.startTime).to.equal(startDate);
        expect(result.events[4].args.biddingStep).to.equal(1);

        // GET USER HISTORY
        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);
        expect(addr1History.length).to.equal(8);
        expect(addr2History.length).to.equal(4);

        // GET AUCTION DETAIL
        const data = await auction.getAuctionDetail(tokenId3);
        expect(data.auctionId.toString()).to.equal("1");
        expect(data.tokenId.toString()).to.equal("3");
        expect(data.owner).to.equal(addr1.address);
        expect(data.startingPrice).to.equal("1");
        expect(data.startTime).to.equal(startDate);
        expect(data.biddingStep).to.equal(1);
      });

      it("Should shown Token3 on the auction", async function () {
        const data = await auction.fetchAuctionItems();
        const items = getMarketData(data, "auction");

        expect(items.length).to.equal(1);
        expect(data[0].auctionId.toString()).to.equal("1");
        expect(data[0].tokenId.toString()).to.equal("3");
        expect(data[0].owner).to.equal(addr1.address);
      });

      it("Should ADDRESS 2 bid Token3", async function () {
        await token.connect(addr2).approve(auction.address, 1000);

        trans = await auction.connect(addr2).bid(auctionId3, {
          value: 1000,
        });
        result = await trans.wait();

        expect(await getBalance(addr2.address)).to.equal("6800");
        expect(result.events[2].args.auctionId).to.equal("1");
        expect(result.events[2].args.bidder).to.equal(addr2.address);
        expect(result.events[2].args.price).to.equal("1000");

        // GET USER HISTORY
        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);
        expect(addr1History.length).to.equal(8);
        expect(addr2History.length).to.equal(5);

        // GET AUCTION DETAIL
        const data = await auction.getAuctionDetail(tokenId3);
        expect(data.auctionId.toString()).to.equal("1");
        expect(data.tokenId.toString()).to.equal("3");
        expect(data.owner).to.equal(addr1.address);
        expect(data.highestBidAmount).to.equal("1000");
        expect(data.highestBidder).to.equal(addr2.address);

        // GET AUCTION HISTORY
        const auctionHistory = await auction.getAuctionHistory(auctionId3);
        expect(auctionHistory.length).to.equal(1);
      });

      it("Should ADDRESS 3 bid Token3", async function () {
        await token.connect(addr3).approve(auction.address, 2000);
        trans = await auction.connect(addr3).bid(auctionId3, {
          value: 2000,
        });
        result = await trans.wait();

        expect(await getBalance(addr2.address)).to.equal("7800"); // return money after address 3 bided
        expect(await getBalance(addr3.address)).to.equal("8000");
        expect(result.events[3].args.auctionId).to.equal("1");
        expect(result.events[3].args.bidder).to.equal(addr3.address);
        expect(result.events[3].args.price).to.equal("2000");

        // GET USER HISTORY
        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);
        const addr3History = await history.getUserHistory(addr3.address);
        expect(addr1History.length).to.equal(8);
        expect(addr2History.length).to.equal(5);
        expect(addr3History.length).to.equal(1);

        // GET AUCTION DETAIL
        const data = await auction.getAuctionDetail(tokenId3);
        expect(data.auctionId.toString()).to.equal("1");
        expect(data.tokenId.toString()).to.equal("3");
        expect(data.owner).to.equal(addr1.address);
        expect(data.highestBidAmount).to.equal("2000");
        expect(data.highestBidder).to.equal(addr3.address);

        // GET AUCTION HISTORY
        const auctionHistory = await auction.getAuctionHistory(auctionId3);
        expect(auctionHistory.length).to.equal(2);
      });

      it("Should ADDRESS 2 bid Token3 again", async function () {
        await token.connect(addr2).approve(auction.address, 4000);
        trans = await auction.connect(addr2).bid(auctionId3, {
          value: 4000,
        });
        result = await trans.wait();

        expect(await getBalance(addr2.address)).to.equal("3800"); // return money after address 3 bided
        expect(await getBalance(addr3.address)).to.equal("10000");
        expect(result.events[3].args.auctionId).to.equal("1");
        expect(result.events[3].args.bidder).to.equal(addr2.address);
        expect(result.events[3].args.price).to.equal("4000");

        // GET USER HISTORY
        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);
        const addr3History = await history.getUserHistory(addr3.address);
        expect(addr1History.length).to.equal(8);
        expect(addr2History.length).to.equal(6);
        expect(addr3History.length).to.equal(1);

        // GET AUCTION DETAIL
        const data = await auction.getAuctionDetail(tokenId3);
        expect(data.auctionId.toString()).to.equal("1");
        expect(data.tokenId.toString()).to.equal("3");
        expect(data.owner).to.equal(addr1.address);
        expect(data.highestBidAmount).to.equal("4000");
        expect(data.highestBidder).to.equal(addr2.address);

        // GET AUCTION HISTORY
        const auctionHistory = await auction.getAuctionHistory(auctionId3);
        expect(auctionHistory.length).to.equal(3);
      });

      it("Should end a Auction", async function () {
        await nft.connect(owner).setApprovalForAll(auction.address, true);
        await token.connect(addr1).approve(auction.address, listingPrice);
        await auction.connect(addr1).endAuction(auctionId3);

        expect(await getBalance(addr1.address)).to.equal("15900"); // 100 for listing price
        expect(await getBalance(addr2.address)).to.equal("3800");
        expect(await getBalance(addr3.address)).to.equal("10000");

        // GET USER HISTORY
        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);
        const addr3History = await history.getUserHistory(addr3.address);
        expect(addr1History.length).to.equal(9);
        expect(addr2History.length).to.equal(6);
        expect(addr3History.length).to.equal(1);

        // GET AUCTION DETAIL
        const data = await auction.getAuctionDetail(tokenId3);
        expect(data.auctionId.toString()).to.equal("1");
        expect(data.tokenId.toString()).to.equal("3");
        expect(data.owner).to.equal(addr2.address);
        expect(data.highestBidAmount).to.equal("4000");
        expect(data.highestBidder).to.equal(addr2.address);
      });

      it("Should ADDRESS 2 start a Auction", async function () {
        const date = new Date();
        date.setDate(date.getDate());
        const startDate = Math.floor(date.getTime() / 1000);

        await nft.connect(addr2).setApprovalForAll(auction.address, true);
        trans = await auction.connect(addr2).startAuction(
          nft.address,
          tokenId3,
          1, // starting price
          startDate,
          27,
          1,
          {
            value: listingPrice,
          }
        );
        result = await trans.wait();

        auctionId4 =
          result.events[4].args && result.events[4].args.auctionId
            ? result.events[4].args.auctionId.toString()
            : 1;

        expect(result.events[4].args.auctionId.toString()).to.equal("2");
        expect(result.events[4].args.tokenId.toString()).to.equal("3");
        expect(result.events[4].args.owner).to.equal(addr2.address);
        expect(result.events[4].args.startingPrice).to.equal("1");
        expect(result.events[4].args.startTime).to.equal(startDate);
        expect(result.events[4].args.biddingStep).to.equal(1);
        expect(result.events[4].args.ended).to.equal(false);

        // GET USER HISTORY
        const addr1History = await history.getUserHistory(addr1.address);
        const addr2History = await history.getUserHistory(addr2.address);
        expect(addr1History.length).to.equal(9);
        expect(addr2History.length).to.equal(7);

        // GET AUCTION DETAIL
        const data = await auction.getAuctionDetail(tokenId3);
        expect(data.auctionId.toString()).to.equal("2");
        expect(data.tokenId.toString()).to.equal("3");
        expect(data.owner).to.equal(addr2.address);
        expect(data.startingPrice).to.equal("1");
        expect(data.startTime).to.equal(startDate);
        expect(data.biddingStep).to.equal(1);
        expect(data.ended).to.equal(false);
      });

      it("Should shown Token3 on the auction", async function () {
        const data = await auction.fetchAuctionItems();
        const items = getMarketData(data, "auction");

        expect(items.length).to.equal(1);
        expect(data[0].auctionId.toString()).to.equal("2");
        expect(data[0].tokenId.toString()).to.equal("3");
        expect(data[0].owner).to.equal(addr2.address);
      });
    });
  });
});
