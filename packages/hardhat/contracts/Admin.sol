// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Admin {
    address adminAddress;
    constructor(address _adminAddress) {
        adminAddress = _adminAddress;
    }

    function checkIsAdmin(address userAddress) public view returns (bool) {
        if (userAddress == adminAddress) return true;
        return false;
    }
}