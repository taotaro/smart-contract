const Escrow_test = artifacts.require("./Escrow_test.sol");

module.exports = function (deployer) {
  deployer.deploy(Escrow_test);
};
