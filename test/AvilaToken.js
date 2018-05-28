var AvilaToken = artifacts.require("./AvilaToken.sol");

contract("AvilaToken", function(accounts){
  it('sets the total supply upon deplyment', function(){
    return AvilaToken.deployed().then(function(instance){
      tokenInstance = instance;
      return tokenInstance.totalSupply();
    }).then(function(totalSupply){
      assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1.000.000');
    });
  });
})
