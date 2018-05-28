var AvilaToken = artifacts.require("./AvilaToken.sol");

module.exports = function(deployer) {
  deployer.deploy(AvilaToken);
};
