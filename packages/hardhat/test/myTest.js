const { ethers, waffle } = require("hardhat");

// describe("NFT Market", function () {
//   const provider = waffle.provider;
//   let market;
//   let nft;
//   let owner;
//   let addr1;

//   beforeEach(async function () {
//     [owner, addr1] = await ethers.getSigners();
//   });

//   it("Should deploy contracts", async function () {
//     const Market = await ethers.getContractFactory("NFTMarket");
//     market = await Market.deploy();
//     await market.deployed();

//     const NFT = await ethers.getContractFactory("NFT");
//     nft = await NFT.deploy(market.address);
//     await nft.deployed();
//   });

//   it("Should create tokens", async function () {
//     await nft.connect(owner).createToken("https://www.mytokenlocation.com");
//     await nft.connect(owner).createToken("https://www.mytokenlocation.com2");
//   });

//   const getMyItems = async (sender) => {
//     const items = await market.connect(sender).fetchMyNFTs();
//     return items.map(async (i) => {
//       const item = {
//         seller: i.seller,
//         owner: i.owner,
//       };
//       return item;
//     });
//   };

//   it("Should put both tokens for sale", async function () {
//     let listingPrice = await market.getListingPrice();
//     listingPrice = listingPrice.toString();
//     const price = ethers.utils.parseUnits("1000", "ether");

//     await market.connect(owner).createMarketItem(nft.address, 1, price, {
//       value: listingPrice,
//     });

//     // console.log("Owner's items: ", await getMyItems(owner));
//     let balance = await provider.getBalance(owner.address);
//     console.log("Owner's balance: ", balance.toString());

//     // console.log("Addr1's item: ", await getMyItems(addr1));
//     // balance = await provider.getBalance(addr1.address);
//     console.log("Addr1's balance: ", balance.toString());

//     const transaction = await market
//       .connect(addr1)
//       .buyMarketItem(nft.address, 1, {
//         value: price,
//       });
//     await transaction.wait();
//     console.log("Buying............");

//     // console.log("Owner's items: ", await getMyItems(owner));
//     balance = await provider.getBalance(owner.address);
//     console.log("Owner's balance: ", balance.toString());

//     // console.log("Addr1's item: ", await getMyItems(addr1));
//     balance = await provider.getBalance(addr1.address);
//     console.log("Addr1's balance: ", balance.toString());
//   });
// });

describe("NFT Auction", function () {
  let market;
  let nft;
  let auction;
  let owner;
  let addr1;
  let addr2;
  let auctionId;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should deploy contracts", async function () {
    const Market = await ethers.getContractFactory("NFTMarket");
    market = await Market.deploy();
    await market.deployed();

    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy(market.address);
    await nft.deployed();

    const Auction = await ethers.getContractFactory("NFTAuction");
    auction = await Auction.deploy(nft.address);
    await auction.deployed();
  });

  it("Should create tokens", async function () {
    await nft.connect(owner).createToken("https://www.mytokenlocation.com");
    await nft.connect(owner).createToken("https://www.mytokenlocation.com2");
  });

  it("Should start a Auction", async function () {
    const date = new Date();
    date.setDate(date.getDate());
    const startDate = Math.floor(date.getTime() / 1000);

    await nft.connect(owner).setApprovalForAll(auction.address, true);
    const trans = await auction.connect(owner).startAuction(
      nft.address,
      1,
      1, // starting price
      startDate,
      10,
      1
    );
    const result = await trans.wait();
    auctionId = result.events[2].args.auctionId;
  });

  it("Should bid a Auction", async function () {
    let balance;
    // let balance = await owner.getBalance();
    // console.log(ethers.utils.formatEther(balance));
    balance = await addr1.getBalance();
    console.log(ethers.utils.formatEther(balance));
    balance = await addr2.getBalance();
    console.log(ethers.utils.formatEther(balance));

    console.log("=======================");
    const trans = await auction.connect(addr1).bid(auctionId, {
      value: ethers.utils.parseUnits("1000", "ether"),
    });
    const result = await trans.wait();
    console.log(result.events[0].args);

    // balance = await owner.getBalance();
    // console.log(ethers.utils.formatEther(balance));
    balance = await addr1.getBalance();
    console.log(ethers.utils.formatEther(balance));
    balance = await addr2.getBalance();
    console.log(ethers.utils.formatEther(balance));
    console.log("=======================");

    const trans2 = await auction.connect(addr2).bid(auctionId, {
      value: ethers.utils.parseUnits("2000", "ether"),
    });
    const result2 = await trans2.wait();
    console.log(result2.events[0].args);

    // balance = await owner.getBalance();
    // console.log(ethers.utils.formatEther(balance));
    balance = await addr1.getBalance();
    console.log(ethers.utils.formatEther(balance));
    balance = await addr2.getBalance();
    console.log(ethers.utils.formatEther(balance));

    // console.log("=======================");
    // await auction.connect(owner).withdraw();

    // balance = await addr1.getBalance();
    // console.log(ethers.utils.formatEther(balance));
    // balance = await addr2.getBalance();
    // console.log(ethers.utils.formatEther(balance));
  });

  // it("Should end a Auction", async function () {
  //   await auction.connect(addr1).endAuction();
  // });
});
