// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./History.sol";

contract NFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  
  address historyAddress;
  constructor(address _historyAddress) ERC721("UIT Tokens", "UIT") {
    historyAddress = _historyAddress;
  }
  
  function createToken(string memory tokenURI) public returns (uint) {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI);
    createUserHistory(msg.sender, newItemId, block.timestamp, "createToken");
    return newItemId;
  }

  function createUserHistory(
    address userAddress, 
    uint256 tokenId,
    uint date,
    string memory actionType
  ) public {
    History(historyAddress).createUserHistory(userAddress, tokenId, date, actionType);
  }
}