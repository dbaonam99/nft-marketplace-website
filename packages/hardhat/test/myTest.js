const { ethers } = require("hardhat");
const { expect } = require("chai");

const ACCOUNTS = {
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8": "addr1",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC": "addr2",
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906": "addr3",
};

// describe("NFT Market", function () {
//   let market;
//   let nft;
//   let history;
//   let token;
//   let owner;
//   let addr1;
//   let addr2;
//   let addr3;

//   beforeEach(async function () {
//     [owner, addr1, addr2, addr3] = await ethers.getSigners();
//   });

//   it("Should deploy contracts", async function () {
//     const History = await ethers.getContractFactory("History");
//     history = await History.deploy();
//     await history.deployed();

//     const Token = await ethers.getContractFactory("Token");
//     token = await Token.deploy(owner.address);
//     await token.deployed();

//     const Market = await ethers.getContractFactory("NFTMarket");
//     market = await Market.deploy(token.address, owner.address, history.address);
//     await market.deployed();

//     const NFT = await ethers.getContractFactory("NFT");
//     nft = await NFT.deploy(history.address);
//     await nft.deployed();
//   });

//   const getBalance = async (address) => {
//     const balance = await token.balanceOf(address);
//     return balance.toString();
//   };

//   it("Should create tokens", async function () {
//     await nft.connect(addr1).createToken("https://www.mytokenlocation.com");
//     await nft.connect(addr1).createToken("https://www.mytokenlocation.com2");
//     await nft.connect(addr1).createToken("https://www.mytokenlocation.com3");
//     await nft.connect(addr1).createToken("https://www.mytokenlocation.com4");
//     await nft.connect(addr2).createToken("https://www.mytokenlocation.com5");
//     await nft.connect(addr2).createToken("https://www.mytokenlocation.com6");
//   });

//   it("Should transfer Tokens to Bidders", async function () {
//     await token.approve(owner.address, 1000000);

//     await token.transferFrom(owner.address, addr1.address, 10000);
//     await token.transferFrom(owner.address, addr2.address, 10000);
//     await token.transferFrom(owner.address, addr3.address, 10000);

//     expect(await getBalance(addr1.address)).to.equal("10000");
//     expect(await getBalance(addr2.address)).to.equal("10000");
//     expect(await getBalance(addr3.address)).to.equal("10000");
//   });

//   it("Should put a Token for sale", async function () {
//     let listingPrice = await market.getListingPrice();
//     listingPrice = listingPrice.toString();

//     await nft.connect(addr1).setApprovalForAll(market.address, true);
//     await market.connect(addr1).createMarketItem(nft.address, 1, 1000, 0, {
//       value: listingPrice,
//     });

//     // await nft.connect(addr2).setApprovalForAll(market.address, true);
//     // await market.connect(addr2).createMarketItem(nft.address, 2, 1000, {
//     //   value: listingPrice,
//     // });
//     // await market.connect(addr1).createMarketItem(nft.address, 3, 1000, {
//     //   value: listingPrice,
//     // });
//     // await market.connect(addr1).createMarketItem(nft.address, 4, 1000, {
//     //   value: listingPrice,
//     // });
//     // await nft.connect(addr2).setApprovalForAll(market.address, true);
//     // await market.connect(addr2).createMarketItem(nft.address, 5, 1000, {
//     //   value: listingPrice,
//     // });
//     // await market.connect(addr2).createMarketItem(nft.address, 6, 1000, {
//     //   value: listingPrice,
//     // });
//   });

//   it("Should shown on the market", async function () {
//     const items = await market.fetchMarketItems();
//     items.map(async (i) => {
//       const item = {
//         seller: i.seller,
//         owner: i.owner,
//         tokenId: i.tokenId.toString(),
//       };
//       return item;
//     });
//     console.log(items);
//   });

//   it("Should buy a Token", async function () {
//     // expect(await getBalance(addr1.address)).to.equal("10000");
//     // expect(await getBalance(addr2.address)).to.equal("10000");

//     await token.connect(addr2).approve(market.address, 1000);
//     await market.connect(addr2).buyMarketItem(nft.address, 1, {
//       value: 1000,
//     });

//     // await token.connect(addr3).approve(market.address, 1000);
//     // await market.connect(addr3).buyMarketItem(nft.address, 2, {
//     //   value: 1000,
//     // });

//     // expect(await getBalance(addr1.address)).to.equal("12000");
//     // expect(await getBalance(addr2.address)).to.equal("8900"); // 100 is listing price
//     // expect(await getBalance(addr3.address)).to.equal("8900"); // 100 is listing price
//   });

//   it("Should hide on the market", async function () {
//     const items = await market.fetchMarketItems();
//     items.map(async (i) => {
//       const item = {
//         seller: i.seller,
//         owner: i.owner,
//         tokenId: i.tokenId.toString(),
//       };
//       return item;
//     });
//     console.log(items);
//     return items;
//   });

//   it("Should put a Token for sale", async function () {
//     let listingPrice = await market.getListingPrice();
//     listingPrice = listingPrice.toString();

//     await nft.connect(addr2).setApprovalForAll(market.address, true);
//     await market.connect(addr2).createMarketItem(nft.address, 1, 2000, 1, {
//       value: listingPrice,
//     }); // return 7
//   });

//   it("Should shown on the market", async function () {
//     const items = await market.fetchMarketItems();
//     // const result = await items.wait();
//     // console.log(result.events[0].args);
//     items.map(async (i) => {
//       const item = {
//         seller: i.seller,
//         owner: i.owner,
//         tokenId: i.tokenId.toString(),
//       };
//       return item;
//     });
//     console.log(items);
//   });

//   // it("Should buy a Token", async function () {
//   //   await token.connect(addr3).approve(market.address, 2000);
//   //   await market.connect(addr3).buyMarketItem(nft.address, 7, {
//   //     value: 2000,
//   //   });
//   // });

//   // it("Should put a Token for sale", async function () {
//   //   let listingPrice = await market.getListingPrice();
//   //   listingPrice = listingPrice.toString();

//   //   await nft.connect(addr3).setApprovalForAll(market.address, true);
//   //   await market.connect(addr3).createMarketItem(nft.address, 1, 3000, {
//   //     value: listingPrice,
//   //   });
//   // });

//   it("Should addr2 own a Token", async function () {
//     const items = await market.fetchMyNFTs(addr2.address);
//     items.map(async (i) => {
//       const item = {
//         seller: i.seller,
//         owner: i.owner,
//         tokenId: i.tokenId.toString(),
//       };
//       return item;
//     });
//     // console.log(items);
//     return items;
//   });

//   it("Should get Token detail", async function () {
//     await market.getTokenDetail(1);
//   });

//   it("Should get top seller", async function () {
//     await market.getTopSeller();
//   });

//   it("Should get top buyer", async function () {
//     await market.getTopBuyer();
//   });

//   it("Should get history token", async function () {
//     await history.getUserHistory(addr1.address);
//   });

//   it("Should get history market", async function () {
//     const items = await market.getMarketHistory(1);
//     // console.log(
//     //   items.map(async (i) => {
//     //     const item = {
//     //       tokenId: i.tokenId.toString(),
//     //       price: i.price.toString(),
//     //       message: i.message.toString(),
//     //     };
//     //     return item;
//     //   })
//     // );
//     // const items2 = await market.getMarketHistory(2);
//     // console.log(
//     //   items2.map(async (i) => {
//     //     const item = {
//     //       tokenId: i.tokenId.toString(),
//     //       price: i.price.toString(),
//     //       message: i.message.toString(),
//     //     };
//     //     return item;
//     //   })
//     // );
//   });
// });

// describe("NFT Auction", function () {
//   let nft;
//   let token;
//   let auction;
//   let owner;
//   let addr1;
//   let addr2;
//   let addr3;
//   let auctionId;
//   let trans;
//   let result;

//   beforeEach(async function () {
//     [owner, addr1, addr2, addr3] = await ethers.getSigners();
//   });

//   it("Should deploy contracts", async function () {
//     const Token = await ethers.getContractFactory("Token");
//     token = await Token.deploy(owner.address);
//     await token.deployed();

//     const NFT = await ethers.getContractFactory("NFT");
//     nft = await NFT.deploy();
//     await nft.deployed();

//     const Auction = await ethers.getContractFactory("NFTAuction");
//     auction = await Auction.deploy(token.address, owner.address);
//     await auction.deployed();
//   });

//   const getBalance = async (address) => {
//     const balance = await token.balanceOf(address);
//     return balance.toString();
//   };

//   it("Should create tokens", async function () {
//     await nft.connect(addr1).createToken("https://www.mytokenlocation.com");
//   });

//   it("Should transfer Tokens to Bidders", async function () {
//     await token.approve(owner.address, 1000000);

//     await token.transferFrom(owner.address, addr1.address, 10000);
//     await token.transferFrom(owner.address, addr2.address, 10000);
//     await token.transferFrom(owner.address, addr3.address, 10000);

//     expect(await getBalance(addr1.address)).to.equal("10000");
//     expect(await getBalance(addr2.address)).to.equal("10000");
//     expect(await getBalance(addr3.address)).to.equal("10000");
//   });

//   it("Should start a Auction", async function () {
//     const date = new Date();
//     date.setDate(date.getDate());
//     const startDate = Math.floor(date.getTime() / 1000);
//     let listingPrice = await auction.getListingPrice();
//     listingPrice = listingPrice.toString();
//     await nft.connect(addr1).setApprovalForAll(auction.address, true);
//     trans = await auction.connect(addr1).startAuction(
//       nft.address,
//       1,
//       1, // starting price
//       startDate,
//       new Date().getTime(),
//       1,
//       {
//         value: listingPrice,
//       }
//     );
//     result = await trans.wait();
//     auctionId = result.events[2].args.auctionId;
//   });

//   it("Should addr2 bid a Auction", async function () {
//     await token.connect(owner).approve(auction.address, 1000000);
//     await token.connect(addr2).approve(auction.address, 1000);

//     await auction.connect(addr2).bid(auctionId, {
//       value: 1000,
//     });

//     expect(await getBalance(addr2.address)).to.equal("9000");
//   });

//   it("Should addr3 bid a Auction", async function () {
//     expect(await getBalance(addr2.address)).to.equal("9000");
//     expect(await getBalance(addr3.address)).to.equal("10000");

//     await token.connect(addr3).approve(auction.address, 2000);
//     await auction.connect(addr3).bid(auctionId, {
//       value: 2000,
//     });

//     // When addr3 make a bid, addr2 will received money that bid before
//     expect(await getBalance(addr2.address)).to.equal("10000");
//     expect(await getBalance(addr3.address)).to.equal("8000");
//   });

//   it("Should get all item are on the auction", async function () {
//     const items = await auction.fetchAuctionItems();

//     items.map(async (i) => {
//       const item = {
//         auctionId: i.auctionId.toString(),
//         owner: i.owner,
//         tokenId: i.tokenId.toString(),
//         startingPrice: i.startingPrice.toString(),
//         startTime: i.startTime.toString(),
//         duration: i.duration.toString(),
//         biddingStep: i.biddingStep.toString(),
//       };
//       return item;
//     });
//   });

//   it("Should get auction detail", async function () {
//     await auction.getAuctionDetail(auctionId);
//   });

//   it("Should end a Auction", async function () {
//     await nft.connect(owner).setApprovalForAll(auction.address, true);

//     expect(await getBalance(addr1.address)).to.equal("10000");
//     await auction.connect(addr1).endAuction(auctionId);
//     expect(await getBalance(addr1.address)).to.equal("12000");
//   });

//   it("Should get auction history", async function () {
//     console.log(await auction.getAuctionHistory(1));
//   });
// });

describe("NFT Market", function () {
  let market;
  let nft;
  let history;
  let token;
  let owner;
  let addr1;
  let addr2;
  let addr3;

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
  });

  const getBalance = async (address) => {
    const balance = await token.balanceOf(address);
    return balance.toString();
  };

  it("Should create tokens", async function () {
    await nft.connect(addr1).createToken("https://www.mytokenlocation.com");
    // await nft.connect(addr1).createToken("https://www.mytokenlocation.com2");
    // await nft.connect(addr1).createToken("https://www.mytokenlocation.com3");
    // await nft.connect(addr1).createToken("https://www.mytokenlocation.com4");
    // await nft.connect(addr2).createToken("https://www.mytokenlocation.com5");
    // await nft.connect(addr2).createToken("https://www.mytokenlocation.com6");
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

  it("Should put a Token for sale", async function () {
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    await nft.connect(addr1).setApprovalForAll(market.address, true);
    await market.connect(addr1).createMarketItem(nft.address, 1, 1000, 0, {
      value: listingPrice,
    });
  });

  it("Should addr 2 buy a Token", async function () {
    await token.connect(addr2).approve(market.address, 1000);
    await market.connect(addr2).buyMarketItem(nft.address, 1, {
      value: 1000,
    });
  });

  it("Should addr 2 put a Token for sale", async function () {
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    await nft.connect(addr2).setApprovalForAll(market.address, true);
    await market.connect(addr2).createMarketItem(nft.address, 1, 2000, 1, {
      value: listingPrice,
    }); // return 7
  });

  it("Should addr 3 buy a Token", async function () {
    await token.connect(addr3).approve(market.address, 2000);
    await market.connect(addr3).buyMarketItem(nft.address, 1, {
      value: 2000,
    });
  });

  it("Should addr 3 put a Token for sale", async function () {
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    await nft.connect(addr3).setApprovalForAll(market.address, true);
    await market.connect(addr3).createMarketItem(nft.address, 1, 3000, 2, {
      value: listingPrice,
    });
  });

  it("Should addr 1 buy a Token", async function () {
    await token.connect(addr1).approve(market.address, 3000);
    await market.connect(addr1).buyMarketItem(nft.address, 1, {
      value: 3000,
    });
  });

  it("Should get top seller", async function () {
    const data = await market.getTopSeller();
    const items = data.map((i) => ({
      user: ACCOUNTS[i.user],
      count: Number(i.count.toString()),
    }));

    const sortedData = items.sort((a, b) => b.count - a.count);
    console.log(sortedData);
  });

  it("Should get top buyer", async function () {
    const data = await market.getTopBuyer();
    const items = data.map((i) => ({
      user: ACCOUNTS[i.user],
      count: Number(i.count.toString()),
    }));

    const sortedData = items.sort((a, b) => b.count - a.count);
    console.log(sortedData);
  });
});
