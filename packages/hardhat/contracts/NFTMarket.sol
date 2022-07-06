// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./History.sol";
import "./NFT.sol";
import "./NFTAuction.sol";

contract NFTMarket is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;
  Counters.Counter private _itemsSold;
  Counters.Counter private _marketHistoryCount;
 
  IERC20 uit;
  address contractOwner;
  address historyAddress;
  uint256 listingPrice = 100;

  constructor(address _uit, address _contractOwner, address _historyAddress) {
    uit = IERC20(_uit);
    contractOwner = _contractOwner;
    historyAddress = _historyAddress;
  }

  struct MarketItem {
    uint itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    address creator;
    uint256 price;
    bool sold;
    uint256 createdDate;
    uint256 updatedDate;
    bool deleted;
  }

  struct UserCount {
    address user;
    uint count;
  }

  struct MarketHistory {
    uint256 tokenId;
    address user;
    uint256 createdDate;
    uint256 price;
    string message;
  }

  mapping (uint256 => MarketItem) public idToNFT;
  mapping (uint256 => MarketItem) public idToMarketItem;
  mapping (uint256 => UserCount) public sellCount;
  mapping (uint256 => UserCount) public boughtCount;
  mapping (uint256 => mapping(uint => MarketHistory)) public marketHistory;
  mapping (uint256 => uint256) public historyCount;

  event MarketItemCreated (
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    address creator,
    uint256 price,
    bool sold,
    uint256 createdDate,
    uint256 updatedDate,
    bool deleted
  );

  function createUserHistory(
    address userAddress, 
    uint256 tokenId,
    uint date,
    string memory actionType
  ) public {
    History(historyAddress).createUserHistory(userAddress, tokenId, date, actionType);
  }

  function createTokenHistory(
    uint256 tokenId,
    address userAddress,
    uint date,
    uint256 price, 
    string memory description
  ) public {
    History(historyAddress).createTokenHistory(tokenId, userAddress, date, price, description);
  }

  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }

  function deleteMarketItem(uint256 tokenId) public {
    uint itemCount = _itemIds.current();

    MarketItem memory item;
    for (uint i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].tokenId == tokenId) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        item = currentItem;
      }
    }
    if (item.itemId != 0) idToMarketItem[item.itemId].deleted = true;
  }

  function createMarketItem(
    address nftContract,
    address auctionContract,
    uint256 tokenId,
    uint256 price,
    uint256 oldItemId
  ) public payable nonReentrant returns (uint256) {
    require(price > 0, "Price must be at least 1 UIT");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    uint256 itemId;
    if (oldItemId == 0) {
      _itemIds.increment();
      itemId = _itemIds.current();
      address _creator = NFT(nftContract).getNFTCreator(tokenId);

      idToMarketItem[itemId] = MarketItem(
        itemId,
        nftContract,
        tokenId,
        payable(msg.sender),
        payable(msg.sender),
        _creator,
        price,
        false,
        block.timestamp,
        block.timestamp,
        false
      );

      emit MarketItemCreated(
        itemId,
        nftContract,
        tokenId,
        msg.sender,
        msg.sender,
        msg.sender,
        price,
        false,
        block.timestamp,
        block.timestamp,
        false
      );
    } else {
      itemId = _itemIds.current();
      uint256 _tokenId = idToMarketItem[itemId].tokenId;
      address _creator = NFT(nftContract).getNFTCreator(tokenId);

      idToMarketItem[itemId] = MarketItem(
        itemId,
        nftContract,
        _tokenId,
        payable(msg.sender),
        payable(msg.sender),
        _creator,
        price,
        false,
        block.timestamp,
        block.timestamp,
        false
      );

      emit MarketItemCreated(
        itemId,
        nftContract,
        tokenId,
        msg.sender,
        msg.sender,
        _creator,
        price,
        false,
        block.timestamp,
        block.timestamp,
        false
      );
    }

    ERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
    NFTAuction(auctionContract).deleteAuctionItem(tokenId);

    createUserHistory(msg.sender, tokenId, block.timestamp, "createMarket");
    createTokenHistory(tokenId, msg.sender, block.timestamp, price,  "sell");

    return itemId;
  }

  function buyMarketItem(address nftContract, uint256 itemId) public payable nonReentrant {
    uint price = idToMarketItem[itemId].price;
    uint tokenId = idToMarketItem[itemId].tokenId;
    require(msg.value == price, "Please submit the asking price in order to complete the purchase");

    uit.transferFrom(
      msg.sender,
      idToMarketItem[itemId].seller,
      msg.value
    );

    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
    idToMarketItem[itemId].owner = payable(msg.sender);
    idToMarketItem[itemId].sold = true;
    idToMarketItem[itemId].updatedDate = block.timestamp;
    _itemsSold.increment();
    uint itemSold = _itemsSold.current();

    createUserHistory(msg.sender, tokenId, block.timestamp, "buyToken");
    createUserHistory(idToMarketItem[itemId].seller, tokenId, block.timestamp, "sellToken");

    sellCount[itemSold] = UserCount(idToMarketItem[itemId].seller, price);
    boughtCount[itemSold] = UserCount(msg.sender, price);

    createTokenHistory(tokenId, msg.sender, block.timestamp, price,  "buy");
    
    uit.transferFrom(
      msg.sender,
      contractOwner,
      listingPrice
    );
  }

  function getTokenDetail(uint256 tokenId) public view returns (MarketItem memory) { 
    uint itemCount = _itemIds.current();

    MarketItem memory item;
    for (uint i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].tokenId == tokenId) {
        uint currentId = i + 1;
        item = idToMarketItem[currentId];
      }
    }
    return item;
  }

  function getTopSeller() public view returns (UserCount[] memory) {
    uint soldAmount = _itemsSold.current();

    UserCount[] memory addresses = new UserCount[](soldAmount);
    for (uint i = 0; i < soldAmount; i++) {
      uint currentId = i + 1;
      addresses[i] = sellCount[currentId];
    }
    return addresses;
  }

  function getTopBuyer() public view returns (UserCount[] memory) {
    uint soldAmount = _itemsSold.current();

    UserCount[] memory addresses = new UserCount[](soldAmount);
    for (uint i = 0; i < soldAmount; i++) {
      uint currentId = i + 1;
      addresses[i] = boughtCount[currentId];
    }
    return addresses;
  } 

  function fetchMarketItems() public view returns (MarketItem[] memory) {
    uint itemCount = _itemIds.current();
    uint unsoldItemCount = 0;

    for (uint i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].sold == false) {
        unsoldItemCount += 1;
      }
    }

    uint currentIndex = 0;
    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    for (uint i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].sold == false) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  function fetchMyNFTs(address userAddress) public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == userAddress) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == userAddress) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  function fetchItemsCreated(address userAddress) public view returns (MarketItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].creator == userAddress) {
        itemCount += 1;
      }
    }

    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].creator == userAddress) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  function getMarketHistory(uint256 tokenId) public view returns (MarketHistory[] memory) {
    uint _historyCount = _marketHistoryCount.current();
    uint _historyOfTokenCount = historyCount[tokenId];

    MarketHistory[] memory items = new MarketHistory[](_historyOfTokenCount);
    for (uint i = 0; i < _historyCount; i++) {
      if (marketHistory[tokenId][i + 1].tokenId == tokenId) {
        MarketHistory storage currentItem = marketHistory[tokenId][i + 1];
        items[i] = currentItem;
      }
    }
    
    return items;
  }
}