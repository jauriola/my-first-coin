var AvilaTokenSale = artifacts.require("./AvilaTokenSale.sol");

contract("AvilaToken", function(accounts){
  var tokenInstance;
  var tokenPrice = 1000000000000000; // in wei 0,001 ether

  it('initilizes the contract with the correct values', function(){
    return AvilaTokenSale.deployed().then(function(instance){
      tokenSaleInstance = instance;
      return tokenSaleInstance.address;
    }).then(function(address){
      assert.notEqual(address, 0x0, 'has a contract address');
      return tokenSaleInstance.tokenContract();
    }).then(function(address){
      assert.notEqual(address, 0x0, 'has a tokenContract address');
      return tokenSaleInstance.tokenPrice();
    }).then(function(price){
      assert.equal(price, tokenPrice, 'token price is correct');
    });
  });
});
