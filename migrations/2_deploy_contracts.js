var AvilaToken = artifacts.require("./AvilaToken.sol");
var AvilaTokenSale = artifacts.require("./AvilaTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(AvilaToken, 1000000).then(function(){
    var tokenPrice = 1000000000000000;
    return deployer.deploy(AvilaTokenSale, AvilaToken.address, tokenPrice);
  });

};
