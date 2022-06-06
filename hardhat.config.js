require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require('hardhat-deploy');
require("@nomiclabs/hardhat-ethers")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    // mumbai: {
    //   url: "https://rpc-mumbai.maticvigil.com",
    //   accounts: [process.env.PRIVATE_KEY || '']
    // },
    // matic: {
    //   url: process.env.ALCHEMY_URL,
    //   accounts: [process.env.PRIVATE_KEY || ''],
    // },
    // alfajores: {
    //   url: "https://alfajores-forno.celo-testnet.org",
    //   accounts: [process.env.PRIVATE_KEY],
    //   chainId: 44787
    // },
    celo: {
      url: "https://forno.celo.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 42220
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      celo: "0xD333b1E7D31702458c818963f21a731fE830EA19",
      alfajores: "0xD333b1E7D31702458c818963f21a731fE830EA19"
      // alfajores: "0xE1050a18435e64456B6Af57eB93721Ff22858Ef9"
    }
  }
};
