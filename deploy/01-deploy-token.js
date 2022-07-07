const { network } = require("hardhat");
const { INITIAL_SUPPLY } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, id } = deployments;
  const { deployer } = await getNamedAccounts();

  const ourToken = await deploy("MyToken", {
    from: deployer,
    args: [INITIAL_SUPPLY],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  //   console.log(`Our Token deployed at ${ourToken.address}`);
};

module.exports.tags = ["all", "token"];
