// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "./History.sol";

contract NFTAuction is ReentrancyGuard {
    bytes32 public constant CREATED = keccak256("CREATED");
    bytes32 public constant BIDDING = keccak256("BIDDING");
    bytes32 public constant FINISHED = keccak256("FINISHED");

    using Counters for Counters.Counter;
    Counters.Counter private _auctionIds;
    Counters.Counter private _bidIds;
    Counters.Counter private _auctionHistoryCount;
    Counters.Counter private _auctionEnded;

    IERC20 uit;
    address contractOwner;
    address historyAddress;
    uint256 listingPrice = 100;
    
    constructor(address _uit, address _contractOwner, address _historyAddress) {
        uit = IERC20(_uit);
        contractOwner = _contractOwner;
        historyAddress = _historyAddress;
    }

    enum Status {
        active,
        finished
    }

    struct Auction {
        uint256 auctionId;
        address nftContract;
        uint256 tokenId;
        address owner;
        address creator;
        uint256 startTime;
        uint256 startingPrice;
        uint256 biddingStep;
        uint256 duration;
        uint256 highestBidAmount;
        address highestBidder;
        bytes32 status;
        uint256 createdDate;
        bool ended;
    }

    struct BidInfo {
        uint256 auctionId;
        address bidder;
        uint256 bidDate;
        uint256 price;
        string description;
    }

    struct AuctionHistory {
        uint256 tokenId;
        address user;
        uint256 createdDate;
        uint256 price;
        string description;
    }

    struct UserCount {
        address user;
        uint count;
    }

    event AuctionCreated(
        uint256 auctionId,
        address nftContract,
        uint256 tokenId,
        address owner,
        uint256 startingPrice,
        uint256 startTime,
        uint256 duration,
        uint256 biddingStep,
        uint256 createdDate,
        bool ended
    );
    event AuctionBid(uint256 auctionId, address bidder, uint256 price);
    event Withdraw(address indexed bidder, uint amount);
    event GetBanlance(address caller, uint amout);
    event Claim(uint256 auctionId, address winner);

    mapping(uint256 => Auction) public idToAuction;
    mapping(address => uint) public bids;
    mapping(uint256 => BidInfo) public bidHistory;
    mapping(uint256 => uint) public bidHistoryCount;
    mapping(address => uint256) public userAuctionCount;
    mapping(uint256 => mapping(uint => AuctionHistory)) public auctionHistory;
    mapping(uint256 => uint256) public historyCount;
    mapping(uint256 => UserCount) public sellCount;
    mapping(uint256 => UserCount) public boughtCount;

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

    function startAuction(
        address nftContract,
        uint256 tokenId,
        uint256 startingPrice,
        uint256 startTime,
        uint256 duration,
        uint256 biddingStep,
        uint256 oldAuctionId
    ) public payable nonReentrant returns (uint256) {
        require(biddingStep > 0, "Bidding step must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        uint256 auctionId;
        // if (oldAuctionId == 0) {
            _auctionIds.increment();
            auctionId = _auctionIds.current();
    
            idToAuction[auctionId] = Auction(
                auctionId,
                nftContract,
                tokenId,
                msg.sender,
                msg.sender,
                startTime,
                startingPrice,
                biddingStep,
                duration,
                startingPrice,
                address(0),
                CREATED,
                block.timestamp,
                false
            );
        // } else {
        //     auctionId = _auctionIds.current();
        //     address _creator = idToAuction[auctionId].creator;
          
        //     idToAuction[auctionId] = Auction(
        //         auctionId,
        //         nftContract,
        //         tokenId,
        //         msg.sender,
        //         _creator,
        //         startTime,
        //         startingPrice,
        //         biddingStep,
        //         duration,
        //         startingPrice,
        //         address(0),
        //         CREATED,
        //         block.timestamp,
        //         false
        //     );
        // }

        ERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        userAuctionCount[msg.sender] += 1;

        _auctionHistoryCount.increment();
        historyCount[tokenId]++;
        auctionHistory[tokenId][historyCount[tokenId]] = AuctionHistory(
            tokenId,
            msg.sender,
            block.timestamp,
            startingPrice,
            "sell"
        );

        createUserHistory(msg.sender, tokenId, block.timestamp, "startAuction");
        createTokenHistory(tokenId, msg.sender, block.timestamp, startingPrice,  "startAuction");

        emit AuctionCreated(
            auctionId,
            nftContract,
            tokenId,
            msg.sender,
            startingPrice,
            startTime,
            duration,
            biddingStep,
            block.timestamp,
            false
        );
        return auctionId;
    }

    function bid(uint256 auctionId) public payable nonReentrant returns (bool) {
        uint256 startDate = idToAuction[auctionId].startTime;
        uint256 endDate = idToAuction[auctionId].startTime + idToAuction[auctionId].duration;
        uint256 price = msg.value;

        _bidIds.increment();
        uint256 bidId = _bidIds.current();

        require(block.timestamp >= startDate && block.timestamp < endDate,  
            "Auction is finished or not started yet"
        );

        if (idToAuction[auctionId].status == CREATED) {
            require(price >= idToAuction[auctionId].startingPrice, 
                "Must bid equal or higher than current starting price"
            );
            require((price - idToAuction[auctionId].startingPrice) % idToAuction[auctionId].biddingStep == 0, 
                "Bid price must be divisible by bidding step"
            );

            uit.transferFrom(msg.sender, address(this), price);
            idToAuction[auctionId].highestBidAmount = price;
            idToAuction[auctionId].highestBidder = msg.sender;
            idToAuction[auctionId].status = BIDDING;

            bidHistory[bidId] = BidInfo(
                auctionId,
                msg.sender,
                block.timestamp,
                price,
                "bid"
            );
            bidHistoryCount[auctionId] += 1;

            createUserHistory(msg.sender, idToAuction[auctionId].tokenId, block.timestamp, "bid");
            emit AuctionBid(auctionId, msg.sender, price);
            return true;
        }

        if (idToAuction[auctionId].status == BIDDING) {
            require(price >= idToAuction[auctionId].highestBidAmount + idToAuction[auctionId].biddingStep,
                "Must bid higher than current highest bid"
            );
            require(
                (price - idToAuction[auctionId].highestBidAmount) % idToAuction[auctionId].biddingStep == 0,
                "Bid price must be divisible by bidding step"
            );

            uit.transferFrom(msg.sender, address(this), price);
            if (idToAuction[auctionId].highestBidder != address(0)) {
                // return uit to the previuos bidder
                uit.transfer(
                    idToAuction[auctionId].highestBidder,
                    idToAuction[auctionId].highestBidAmount
                );
            } 

            // register new bidder
            idToAuction[auctionId].highestBidder = msg.sender;
            idToAuction[auctionId].highestBidAmount = price;

            bidHistory[bidId] = BidInfo(
                auctionId,
                msg.sender,
                block.timestamp,
                price,
                "bid"
            );
            bidHistoryCount[auctionId] += 1;

            createUserHistory(msg.sender, idToAuction[auctionId].tokenId, block.timestamp, "bid");
            emit AuctionBid(auctionId, msg.sender, price);
            return true;
        }
        return false;
    }

    function getAuctionHistory(uint256 auctionId) public view returns (BidInfo[] memory) {
        uint bidCount = _bidIds.current();
        uint currentIndex = 0;
        uint _historyCount = bidHistoryCount[auctionId];

        BidInfo[] memory items = new BidInfo[](_historyCount);
        for (uint i = 0; i < bidCount; i++) {
            if (bidHistory[i + 1].auctionId == auctionId) {
                uint currentId = i + 1;
                BidInfo storage currentItem = bidHistory[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function getCurrentBidOwner(uint256 auctionId) public view returns (address) {
        return idToAuction[auctionId].highestBidder;
    }

    function getCurrentBidAmount(uint256 auctionId) public view returns (uint256) {
        return idToAuction[auctionId].highestBidAmount;
    }

    function isFinished(uint256 auctionId) public view returns (bool) {
        return getStatus(auctionId) == Status.finished;
    }

    function getWinner(uint256 auctionId) public view returns (address) {
        require(isFinished(auctionId), "Auction is not finished");
        return idToAuction[auctionId].highestBidder;
    }

    function getStatus(uint256 auctionId) public view returns (Status) {
        uint256 expiry = idToAuction[auctionId].startTime +
            idToAuction[auctionId].duration;
        if (block.timestamp >= expiry) {
            return Status.finished;
        } else {
            return Status.active;
        }
    }

    function claimItem(uint256 auctionId) private {
        address winner = getWinner(auctionId);
        require(winner != address(0), "There is no winner");
        address nftContract = idToAuction[auctionId].nftContract;

        IERC721(nftContract).safeTransferFrom(
            address(this),
            winner,
            idToAuction[auctionId].tokenId
        );
        emit Claim(auctionId, winner);
    }

    function endAuction(uint256 auctionId) public nonReentrant {
        require(isFinished(auctionId),
            "Auction is not finished"
        );
        require(idToAuction[auctionId].status != FINISHED,
            "Auction is already finalized"
        );

        address owner = idToAuction[auctionId].owner;

        if (idToAuction[auctionId].highestBidder == address(0)) {
            IERC721(idToAuction[auctionId].nftContract).safeTransferFrom(
                address(this),
                owner,
                idToAuction[auctionId].tokenId
            );
        } else {
            uit.transfer(owner, idToAuction[auctionId].highestBidAmount);
            claimItem(auctionId);
            uit.transferFrom(
                msg.sender,
                contractOwner,
                listingPrice
            );
            idToAuction[auctionId].owner = idToAuction[auctionId].highestBidder;
        }


        idToAuction[auctionId].status == FINISHED;
        idToAuction[auctionId].ended = true;

        userAuctionCount[msg.sender] -= 1;
        userAuctionCount[idToAuction[auctionId].highestBidder] += 1;

        _auctionEnded.increment();
        uint auctionEnded = _auctionEnded.current();
        sellCount[auctionEnded] = UserCount(msg.sender, idToAuction[auctionId].highestBidAmount);
        boughtCount[auctionEnded] = UserCount(idToAuction[auctionId].highestBidder, idToAuction[auctionId].highestBidAmount);

        createUserHistory(msg.sender, idToAuction[auctionId].tokenId, block.timestamp, "endAuction");
        createTokenHistory(idToAuction[auctionId].tokenId, msg.sender, block.timestamp, idToAuction[auctionId].highestBidAmount,  "endAuction");
    }

    function getTopSeller() public view returns (UserCount[] memory) {
        uint endedAmount = _auctionEnded.current();

        UserCount[] memory addresses = new UserCount[](endedAmount);
            for (uint i = 0; i < endedAmount; i++) {
            uint currentId = i + 1;
            addresses[i] = sellCount[currentId];
        }
        return addresses;
    }

    function getTopBuyer() public view returns (UserCount[] memory) {
        uint endedAmount = _auctionEnded.current();

        UserCount[] memory addresses = new UserCount[](endedAmount);
            for (uint i = 0; i < endedAmount; i++) {
            uint currentId = i + 1;
            addresses[i] = boughtCount[currentId];
        }
        return addresses;
    } 

    function fetchAuctionItems() public view returns (Auction[] memory) {
        uint itemCount = _auctionIds.current();
        uint currentItemCount = _auctionIds.current() - _auctionEnded.current();
        uint currentIndex = 0;

        Auction[] memory items = new Auction[](currentItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToAuction[i + 1].ended == false) {
                uint currentId = i + 1;
                Auction storage currentItem = idToAuction[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyAuctionItems(address userAddress) public view returns (Auction[] memory) {
        uint itemCount = _auctionIds.current();
        uint _userAuctionCount = userAuctionCount[userAddress];
        uint currentIndex = 0;

        Auction[] memory items = new Auction[](_userAuctionCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToAuction[i + 1].owner == userAddress) {
                uint currentId = i + 1;
                Auction storage currentItem = idToAuction[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchAuctionItemsCreated(address userAddress) public view returns (Auction[] memory) {
        uint totalItemCount = _auctionIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToAuction[i + 1].creator == userAddress) {
                itemCount += 1;
            }
        }

        Auction[] memory items = new Auction[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToAuction[i + 1].creator == userAddress) {
                uint currentId = i + 1;
                Auction storage currentItem = idToAuction[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function getAuctionDetail(uint256 tokenId) public view returns (Auction memory) { 
        uint itemCount = _auctionIds.current();

        Auction memory item;
        for (uint i = 0; i < itemCount; i++) {
            if (idToAuction[i + 1].tokenId == tokenId) {
                uint currentId = i + 1;
                item = idToAuction[currentId];
            }
        }
        return item;
    } 
}

