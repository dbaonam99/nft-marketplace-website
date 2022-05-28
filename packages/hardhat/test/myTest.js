const { ethers } = require("hardhat");

describe("NFT Market", function () {
  let market;
  let nft;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
  });

  it("Should deploy contracts", async function () {
    const Market = await ethers.getContractFactory("NFTMarket");
    market = await Market.deploy();
    await market.deployed();

    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy(market.address);
    await nft.deployed();
  });

  it("Should create tokens", async function () {
    await nft.connect(owner).createToken("https://www.mytokenlocation.com");
    await nft.connect(owner).createToken("https://www.mytokenlocation.com2");
  });

  const getMyItems = async (sender) => {
    const items = await market.connect(sender).fetchItemsCreated();
    return items.map(async (i) => {
      const item = {
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
      };
      return item;
    });
  };

  it("Should put both tokens for sale", async function () {
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();
    const price = ethers.utils.parseUnits("10", "ether");

    console.log("owner", owner.address);
    await market.connect(owner).createMarketItem(nft.address, 1, price, {
      value: listingPrice,
    });

    console.log("Owner's items: ", await getMyItems(owner));
    // console.log("Owner's balance: ", await nft.balanceOf(owner.address));

    // console.log("Addr1's item: ", await getMyItems(addr1));
    // console.log("Addr1's balance: ", await nft.balanceOf(addr1.address));

    // const transaction = await market
    //   .connect(addr1)
    //   .buyMarketItem(nft.address, 1, {
    //     value: price,
    //   });
    // await transaction.wait();

    // console.log("Owner's items: ", await getMyItems(owner));
    // console.log("Owner's balance: ", await nft.balanceOf(owner.address));

    // console.log("Addr1's item: ", await getMyItems(addr1));
    // console.log("Addr1's balance: ", await nft.balanceOf(addr1.address));
  });
});

// describe("NFT Auction", function () {
//   let market;
//   let nft;
//   let auction;
//   let owner;
//   let addr1;

//   beforeEach(async function () {
//     [owner, addr1] = await ethers.getSigners();
//   });

//   it("Should deploy contracts", async function () {
//     const Market = await ethers.getContractFactory("NFTMarket");
//     market = await Market.deploy();
//     await market.deployed();

//     const Auction = await ethers.getContractFactory("Auction");
//     auction = await Auction.deploy();
//     await auction.deployed();

//     const NFT = await ethers.getContractFactory("NFT");
//     nft = await NFT.deploy(market.address);
//     await nft.deployed();
//   });

//   it("Should create tokens", async function () {
//     await nft.connect(owner).createToken("https://www.mytokenlocation.com");
//     await nft.connect(owner).createToken("https://www.mytokenlocation.com2");
//   });

//   it("Should put both tokens for sale", async function () {
//     let listingPrice = await market.getListingPrice();
//     listingPrice = listingPrice.toString();
//     const auctionPrice = ethers.utils.parseUnits("1", "ether");

//     await market
//       .connect(owner)
//       .createMarketItem(nft.address, 1, auctionPrice, true, 123, 1, {
//         value: listingPrice,
//       });

//     await nft.connect(owner).setApprovalForAll(auction.address, true);
//     await auction.connect(owner).startAuction(nft.address, 2, 1000);

//     // const [_, buyerAddress] = await ethers.getSigners();
//     /* execute sale of token to another user */
//     // await market
//     //   .connect(buyerAddress)
//     //   .createMarketSale(nftContractAddress, 1, { value: auctionPrice });

//     /* query for and return the unsold items */
//     // let items = await market.fetchMarketItems();
//     // items = await Promise.all(
//     //   items.map(async (i) => {
//     //     const tokenUri = await nft.tokenURI(i.tokenId);
//     //     return {
//     //       price: i.price.toString(),
//     //       tokenId: i.tokenId.toString(),
//     //       seller: i.seller,
//     //       owner: i.owner,
//     //       tokenUri,
//     //       isBid: i.isBid,
//     //       bidDuration: i.bidDuration,
//     //       bidPrice: i.bidPrice,
//     //     };
//     //   })
//     // );
//     // console.log("items: ", items);
//   });
// });
