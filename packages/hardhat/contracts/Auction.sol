//"SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Auction {
    event Start();
    event End(address highestBidder, uint highestBid);
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed bidder, uint amount);

    address payable public seller;

    bool public started;
    bool public ended;
    uint public endAt;

    address public nftContract;
    uint public tokenId;

    uint public highestBid;
    address public highestBidder;
    mapping(address => uint) public bids;

    constructor () {
        seller = payable(msg.sender);
    }

    struct Auction {
        uint256 auctionId;
        address nftContract;
        uint256 nftId;
        address owner;
        uint256 startTime;
        uint256 startingPrice;
        uint256 biddingStep;
        uint256 duration;
        uint256 highestBidAmount;
        address highestBidder;
        bytes32 status;
        uint256 limitType;
        uint256 generalLimitType;
    }

    function startAuction(address _nftContract, uint _tokenId, uint startingBid) external {
        require(!started, "Already started!");
        require(msg.sender == seller, "You did not start the auction!");
        highestBid = startingBid;

        nftContract = _nftContract;
        tokenId = _tokenId;

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        started = true;
        endAt = block.timestamp + 2 days;

        emit Start();
    }

    function bid() external payable {
        require(started, "Not started.");
        require(block.timestamp < endAt, "Ended!");
        require(msg.value > highestBid);

        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }

        highestBid = msg.value;
        highestBidder = msg.sender;

        emit Bid(highestBidder, highestBid);
    }

    function withdraw() external payable {
        uint bal = bids[msg.sender];
        bids[msg.sender] = 0;
        (bool sent, bytes memory data) = payable(msg.sender).call{value: bal}("");
        require(sent, "Could not withdraw");

        emit Withdraw(msg.sender, bal);
    }

    function endAuction() external {
        // require(started, "You need to start first!");
        // require(block.timestamp >= endAt, "Auction is still ongoing!");
        // require(!ended, "Auction already ended!");

        // if (highestBidder != address(0)) {
        //     nftContract.transfer(highestBidder, tokenId);
        //     (bool sent, bytes memory data) = seller.call{value: highestBid}("");
        //     require(sent, "Could not pay seller!");
        // } else {
        //     nftContract.transfer(seller, tokenId);
        // }

        // ended = true;
        // emit End(highestBidder, highestBid);
    }
}
