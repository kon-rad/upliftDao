// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  // const Market = await hre.ethers.getContractFactory('DLMarket');
  // const market = await Market.deploy();
  // await market.deployed();
  // console.log('DLMarket deployed to: ', market.address);

  // const NFT = await hre.ethers.getContractFactory('DLNFT');
  // const nft = await NFT.deploy(market.address);
  // await nft.deployed();
  // console.log('DLNFT deployed to: ', nft.address);


  const nftBaseUrl = "https://ipfs.infura.io/ipfs/QmcSPtiT3vVQ7mgL1iWcnK3kcwjMmvxHec2qKxJXRvdyzE";
  const UpliftDAO = await hre.ethers.getContractFactory("UpliftDAO");
  const upliftDAO = await UpliftDAO.deploy(nftBaseUrl);

  await upliftDAO.deployed();

  console.log("upliftDAO deployed to:", upliftDAO.address);

  // const UpliftNFT = await hre.ethers.getContractFactory("UpliftNFT");
  // const upliftNFT = await UpliftNFT.deploy("Hello, Hardhat!");

  // await upliftNFT.deployed();

  // console.log("UpliftNFT deployed to:", upliftNFT.address);

  // const UpliftToken = await hre.ethers.getContractFactory("UpliftToken");
  // const upliftToken = await UpliftToken.deploy("Hello, Hardhat!");

  // await upliftToken.deployed();

  // console.log("upliftToken deployed to:", upliftToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
