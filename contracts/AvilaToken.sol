pragma solidity ^0.4.23;

contract AvilaToken {
  // Constructor
  // Set the number of tokens
  // Read the number of tokens

  uint256 public totalSupply;

  constructor () public {
    totalSupply = 1000000; // State variable (If we change this variable we are writting on the blockchain)
    
  }
}
