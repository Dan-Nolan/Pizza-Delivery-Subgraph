require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.7.3",
  networks: {
    localhost: {
      url: "http://localhost:8545/",
      accounts: [
        // TODO: add key here
      ]
    }
  }
};
