// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./History.sol";

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
    uint256 createdDate
  );

  function createHistory(
    address userAddress, 
    uint date,
    string memory title, 
    string memory description
  ) public {
    History(historyAddress).createHistory(userAddress, date, title, description);
  }

  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }

  function createMarketItem(
    address nftContract,
    uint256 tokenId,
    uint256 price,
    uint256 oldItemId
  ) public payable nonReentrant returns (uint256) {
    require(price > 0, "Price must be at least 1 wei");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    uint256 itemId;
    if (oldItemId == 0) {
      _itemIds.increment();
      itemId = _itemIds.current();
      idToMarketItem[itemId] = MarketItem(
        itemId,
        nftContract,
        tokenId,
        payable(msg.sender),
        payable(msg.sender),
        payable(msg.sender),
        price,
        false,
        block.timestamp
      );
    } else {
      itemId = _itemIds.current();
      address _creator = idToMarketItem[itemId].creator;
      uint256 _tokenId = idToMarketItem[itemId].tokenId;
      idToMarketItem[itemId] = MarketItem(
        itemId,
        nftContract,
        _tokenId,
        payable(msg.sender),
        payable(msg.sender),
        _creator,
        price,
        false,
        block.timestamp
      );
    }

    ERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    createHistory(msg.sender, block.timestamp, "Put token for sale!", "User put token for sale!");

    _marketHistoryCount.increment();
    historyCount[tokenId]++;
    marketHistory[tokenId][historyCount[tokenId]] = MarketHistory(
      tokenId,
      msg.sender,
      block.timestamp,
      price,
      "sell"
    );
    
    emit MarketItemCreated(
      itemId,
      nftContract,
      tokenId,
      msg.sender,
      msg.sender,
      payable(msg.sender),
      price,
      false,
      block.timestamp
    );

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
    _itemsSold.increment();
    uint itemSold = _itemsSold.current();

    createHistory(msg.sender, block.timestamp, "Buy a token!", "User buy a token!");
    createHistory(idToMarketItem[itemId].seller, block.timestamp, "Buy a token!", "User buy a token!");

    sellCount[itemSold] = UserCount(
      idToMarketItem[itemId].seller,
      price
    );

    boughtCount[itemSold] = UserCount(
      msg.sender,
      price
    );

    _marketHistoryCount.increment();
    historyCount[tokenId]++;
    marketHistory[tokenId][historyCount[tokenId]] = MarketHistory(
      tokenId,
      msg.sender,
      block.timestamp,
      price,
      "buy"
    );
    
    uit.transferFrom(
      msg.sender,
      contractOwner,
      listingPrice
    );
  }

  function getTokenDetail(uint256 tokenId) public view returns (MarketItem memory) { 
    return idToMarketItem[tokenId];
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

    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    for (uint i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].sold == false) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[i] = currentItem;
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
      if (idToMarketItem[i + 1].seller == userAddress) {
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