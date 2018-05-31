pragma solidity ^0.4.23;

import "./AvilaToken.sol";

contract AvilaTokenSale {

  address admin;  // state variable
  AvilaToken public tokenContract;
  uint256 public tokenPrice;

  constructor (AvilaToken _tokenContract, uint256 _tokenPrice) public {
    // assign an admin
    admin = msg.sender;
    // Token contract
    tokenContract = _tokenContract;
    // Token Price
    tokenPrice = _tokenPrice;
  }
}
