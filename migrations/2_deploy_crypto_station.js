const MyToken = artifacts.require('../contracts/CryptoStation.sol')

module.exports = (deployer) => {
  deployer.deploy(MyToken)
}