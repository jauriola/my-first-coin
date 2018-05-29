pragma solidity ^0.4.23;


/** @title AvilaToken contract*/
contract AvilaToken {

  string public name = "Avila Token";
  string public symbol = "AVL";
  string public standard = "Avila Token v1.0"; // It is not part of the ERC20 standard
  uint256 public totalSupply;

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner,address indexed _spender, uint256 _value);

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  constructor (uint _initialSupply) public {
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply; // State variable (If we change this variable we are writting on the blockchain)
  }

  // Transfer function
  function transfer(address _to, uint256 _value) public returns (bool success) {
    // Exception if account doesnt have enough
    require(balanceOf[msg.sender] >= _value);

    // Transfer the balanceOf
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    // Transfer event
    Transfer(msg.sender, _to, _value);
    // Return a boolean
    return true;
  }

  // Approve function
  function approve(address _spender, uint256 _value) public returns (bool success){
    // Allowance
    allowance[msg.sender][_spender] = _value;
    // Aprove event
    Approval(msg.sender, _spender, _value);
    return true;
  }

  // Transferfrom function
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){

    // Transfer event
    Transfer(msg.sender, _to, _value);

    return true;
  }

}
