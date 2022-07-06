// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Admin {

    address adminAddress;
    constructor(address _adminAddress) {
        adminAddress = _adminAddress;
    }

    function checkIsAdmin() public view returns (bool) {
        if (msg.sender == adminAddress) return true;
        return false;
    }
}