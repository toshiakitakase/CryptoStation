const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "pause license age vicious orchard melt cushion impose frown crack devote morning";
const accessToken = "7d7333c8d45e42ae82eb3f44526a0f84";
 
module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          "https://ropsten.infura.io/" + accessToken
        );
      },
      network_id: "*",
      gas: 4600000
    }   
  }
};