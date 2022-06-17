// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

contract History {
    using Counters for Counters.Counter;
    Counters.Counter private _historyIds;

    struct UserHistory {
        address user;
        uint256 date;
        string title;
        string description;
    }

    mapping(uint256 => UserHistory) public idToHistory;
    mapping(address => uint) public historyCounter;

    event HistoryCreated( address user, uint256 date, string title, string description);

    function createHistory(
        address userAddress,
        uint256 date,
        string memory title,
        string memory description
    ) public returns (uint256) {
        _historyIds.increment();
        uint256 historyId = _historyIds.current();

        idToHistory[historyId] = UserHistory(
            userAddress,
            date,
            title,
            description
        );
        historyCounter[userAddress] += 1;
        
        emit HistoryCreated(
            userAddress,
            date,
            title,
            description
        );
        return historyId;
    }

    function getUserHistory(address userAddress) public view returns (UserHistory[] memory) {
        uint itemCount = _historyIds.current();
        uint userHistoryCounter = historyCounter[userAddress];
        uint currentIndex = 0;

        UserHistory[] memory items = new UserHistory[](userHistoryCounter);
        for (uint i = 0; i < itemCount; i++) {
            if (idToHistory[i + 1].user == userAddress) {
                uint currentId = i + 1;
                UserHistory storage currentItem = idToHistory[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}