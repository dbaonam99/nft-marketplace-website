//"SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTAuction is ReentrancyGuard {
    bytes32 public constant CREATED = keccak256("CREATED");
    bytes32 public constant BIDDING = keccak256("BIDDING");
    bytes32 public constant FINISHED = keccak256("FINISHED");

    using Counters for Counters.Counter;
    Counters.Counter private _auctionIds;

    IERC20 ngl;
    constructor(address _ngl) {
        ngl = IERC20(_ngl);
    }

    event AuctionCreated(
        uint256 auctionId,
        address nftContract,
        uint256 tokenId,
        address owner,
        uint256 startingPrice,
        uint256 startTime,
        uint256 duration,
        uint256 biddingStep
    );
    event AuctionBid(uint256 auctionId, address bidder, uint256 price);
    event Withdraw(address indexed bidder, uint amount);

    mapping(uint256 => Auction) public idToAuction;
    mapping(address => uint) public bids;

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
    }

    function startAuction(
        address nftContract,
        uint256 tokenId,
        uint256 startingPrice,
        uint256 startTime,
        uint256 duration,
        uint256 biddingStep
    ) public nonReentrant returns (uint256) {
        require(
            biddingStep > 0,
            "Bidding step must be at least 1 wei"
        );

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
            CREATED
        );

        ERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        
        emit AuctionCreated(
            auctionId,
            nftContract,
            tokenId,
            msg.sender,
            startingPrice,
            startTime,
            duration,
            biddingStep
        );

        return auctionId;
    }

    function bid(uint256 auctionId) public payable nonReentrant returns (bool) {
        uint256 startDate = idToAuction[auctionId].startTime;
        uint256 endDate = idToAuction[auctionId].startTime + idToAuction[auctionId].duration;
        uint256 price = msg.value;

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

            payable(address(0)).transfer(price);
            if (idToAuction[auctionId].highestBidder != address(0)) {
                bids[idToAuction[auctionId].highestBidder] += price;
            }

            idToAuction[auctionId].highestBidAmount = price;
            idToAuction[auctionId].highestBidder = msg.sender;
            idToAuction[auctionId].status = BIDDING;
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

            payable(address(0)).transfer(price);
            if (idToAuction[auctionId].highestBidder != address(0)) {
                bids[idToAuction[auctionId].highestBidder] += idToAuction[auctionId].highestBidAmount;
            }

            // register new bidder
            idToAuction[auctionId].highestBidAmount = price;
            idToAuction[auctionId].highestBidder = msg.sender;

            emit AuctionBid(auctionId, msg.sender, bids[idToAuction[auctionId].highestBidder]);
            return true;
        }
        return false;
    }

    function withdraw() external payable {
        uint bal = bids[msg.sender];
        bids[msg.sender] = 0;
        (bool sent, bytes memory data) = payable(msg.sender).call{value: bal}("");
        require(sent, "Could not withdraw");

        emit Withdraw(msg.sender, bal);
    }
}

