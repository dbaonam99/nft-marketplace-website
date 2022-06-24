// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

contract History {
    using Counters for Counters.Counter;
    Counters.Counter private _userHistoryIds;
    Counters.Counter private _tokenHistoryIds;

    struct TokenHistory {
        uint256 tokenId;
        address user;
        uint256 createdDate;
        uint256 price;
        string description;
    }

    struct UserHistory {
        address user;
        uint256 tokenId;
        uint256 date;
        string actionType;
    }

    mapping(uint256 => UserHistory) public idToUserHistory;
    mapping(uint256 => mapping(uint => TokenHistory)) public idToTokenHistory;
    mapping(address => uint) public userHistoryCounter;
    mapping(uint256 => uint) public tokenHistoryCounter;

    event userHistoryCreated(address user, uint256 tokenId, uint256 date, string actionType);
    event tokenHistoryCreated(uint256 tokenId, address user, uint256 createdDate, uint256 price, string description);

    function createUserHistory(
        address userAddress,
        uint256 tokenId,
        uint256 date,
        string memory actionType
    ) public returns (uint256) {
        _userHistoryIds.increment();
        uint256 historyId = _userHistoryIds.current();

        idToUserHistory[historyId] = UserHistory(
            userAddress,
            tokenId,
            date,
            actionType
        );
        userHistoryCounter[userAddress] += 1;
        
        emit userHistoryCreated(
            userAddress,
            tokenId,
            date,
            actionType
        );
        return historyId;
    }

    function getUserHistory(address userAddress) public view returns (UserHistory[] memory) {
        uint itemCount = _userHistoryIds.current();
        uint useruserHistoryCounter = userHistoryCounter[userAddress];
        uint currentIndex = 0;

        UserHistory[] memory items = new UserHistory[](useruserHistoryCounter);
        for (uint i = 0; i < itemCount; i++) {
            if (idToUserHistory[i + 1].user == userAddress) {
                uint currentId = i + 1;
                UserHistory storage currentItem = idToUserHistory[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function createTokenHistory(
        uint256 tokenId,
        address userAddressate,
        uint date,
        uint256 price,
        string memory description
    ) public returns (uint256) {
        _tokenHistoryIds.increment();
        tokenHistoryCounter[tokenId]++;
        idToTokenHistory[tokenId][tokenHistoryCounter[tokenId]] = TokenHistory(
            tokenId,
            userAddressate,
            date,
            price,
            description
        );
        
        emit tokenHistoryCreated(
            tokenId,  
            userAddressate,  
            date,  
            price, 
            description
        );
        return tokenId;
    }

    function getTokenHistory(uint256 tokenId) public view returns (TokenHistory[] memory) {
        uint _historyCount = _tokenHistoryIds.current();
        uint _historyOfTokenCount = tokenHistoryCounter[tokenId];

        TokenHistory[] memory items = new TokenHistory[](_historyOfTokenCount);
        for (uint i = 0; i < _historyCount; i++) {
            if (idToTokenHistory[tokenId][i + 1].tokenId == tokenId) {
                TokenHistory storage currentItem = idToTokenHistory[tokenId][i + 1];
                items[i] = currentItem;
            }
        }
        return items;
    }
}