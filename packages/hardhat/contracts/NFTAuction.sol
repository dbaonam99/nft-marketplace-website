// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract NFTAuction is ReentrancyGuard {
    bytes32 public constant CREATED = keccak256("CREATED");
    bytes32 public constant BIDDING = keccak256("BIDDING");
    bytes32 public constant FINISHED = keccak256("FINISHED");

    using Counters for Counters.Counter;
    Counters.Counter private _auctionIds;
    Counters.Counter private _bidIds;

    IERC20 uit;
    address contractOwner;
    uint256 listingPrice = 100;
    
    constructor(address _uit, address _contractOwner) {
        uit = IERC20(_uit);
        contractOwner = _contractOwner;
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
        uint256 startTime;
        uint256 startingPrice;
        uint256 biddingStep;
        uint256 duration;
        uint256 highestBidAmount;
        address highestBidder;
        bytes32 status;
        uint256 createdDate;
    }

    struct BidInfo {
        uint256 auctionId;
        address bidder;
        uint256 bidDate;
        uint256 price;
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
        uint256 createdDate
    );
    event AuctionBid(uint256 auctionId, address bidder, uint256 price);
    event Withdraw(address indexed bidder, uint amount);
    event GetBanlance(address caller, uint amout);
    event Claim(uint256 auctionId, address winner);

    mapping(uint256 => Auction) public idToAuction;
    mapping(address => uint) public bids;
    mapping(uint256 => BidInfo) public bidHistory;

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function startAuction(
        address nftContract,
        uint256 tokenId,
        uint256 startingPrice,
        uint256 startTime,
        uint256 duration,
        uint256 biddingStep
    ) public payable nonReentrant returns (uint256) {
        require(biddingStep > 0, "Bidding step must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        _auctionIds.increment();
        uint256 auctionId = _auctionIds.current();

        idToAuction[auctionId] = Auction(
            auctionId,
            nftContract,
            tokenId,
            msg.sender,
            startTime,
            startingPrice,
            biddingStep,
            duration,
            startingPrice,
            address(0),
            CREATED,
            block.timestamp
        );

        ERC721(nftContract).transferFrom(msg.sender, contractOwner, tokenId);
        
        emit AuctionCreated(
            auctionId,
            nftContract,
            tokenId,
            msg.sender,
            startingPrice,
            startTime,
            duration,
            biddingStep,
            block.timestamp
        );
        return auctionId;
    }

    function bid(uint256 auctionId) public payable nonReentrant returns (bool) {
        // uint256 startDate = idToAuction[auctionId].startTime;
        // uint256 endDate = idToAuction[auctionId].startTime + idToAuction[auctionId].duration;
        uint256 price = msg.value;

        _bidIds.increment();
        uint256 bidId = _bidIds.current();

        // require(block.timestamp >= startDate && block.timestamp < endDate,  
        //     "Auction is finished or not started yet"
        // );

        if (idToAuction[auctionId].status == CREATED) {
            require(price >= idToAuction[auctionId].startingPrice, 
                "Must bid equal or higher than current starting price"
            );
            require((price - idToAuction[auctionId].startingPrice) % idToAuction[auctionId].biddingStep == 0, 
                "Bid price must be divisible by bidding step"
            );

            uit.transferFrom(msg.sender, contractOwner, price);
            idToAuction[auctionId].highestBidAmount = price;
            idToAuction[auctionId].highestBidder = msg.sender;
            idToAuction[auctionId].status = BIDDING;

            bidHistory[bidId] = BidInfo(
                auctionId,
                msg.sender,
                block.timestamp,
                price
            );

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

            uit.transferFrom(msg.sender, contractOwner, price);
            if (idToAuction[auctionId].highestBidder != address(0)) {
                // return uit to the previuos bidder
                uit.approve(contractOwner, idToAuction[auctionId].highestBidAmount);
                uit.transferFrom(
                    contractOwner, 
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
                price
            );

            emit AuctionBid(auctionId, msg.sender, price);
            return true;
        }
        return false;
    }

    function getAuctionHistory(uint256 auctionId) public view returns (BidInfo[] memory) {
        uint bidCount = _bidIds.current();
        uint currentIndex = 0;

        BidInfo[] memory items = new BidInfo[](bidCount);
        for (uint i = 0; i < bidCount; i++) {
            if (idToAuction[i + 1].auctionId == auctionId) {
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

    function getCurrentBidAmount(uint256 auctionId)
        public
        view
        returns (uint256)
    {
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
            contractOwner,
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
                contractOwner,
                owner,
                idToAuction[auctionId].tokenId
            );
            idToAuction[auctionId].status == FINISHED;
        } else {
            uit.transferFrom(
                contractOwner, 
                owner, 
                idToAuction[auctionId].highestBidAmount
            );
            claimItem(auctionId);
            uit.transferFrom(
                msg.sender,
                contractOwner,
                listingPrice
            );
            idToAuction[auctionId].status == FINISHED;
        }
    }

    function fetchAuctionItems() public view returns (Auction[] memory) {
        uint itemCount = _auctionIds.current();
        uint unsoldItemCount = _auctionIds.current();
        uint currentIndex = 0;

        Auction[] memory items = new Auction[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToAuction[i + 1].status != FINISHED) {
                uint currentId = i + 1;
                Auction storage currentItem = idToAuction[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function getAuctionDetail(uint256 tokenId) public view returns (Auction memory) { 
        return idToAuction[tokenId];
    } 
}

