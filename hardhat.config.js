require("hardhat-deploy");
require("@nomiclabs/hardhat-waffle");
// require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.7",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
    user1: {
      default: 1,
    },
  },

  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};
