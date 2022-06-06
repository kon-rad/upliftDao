module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const nftBaseUrl = "https://ipfs.infura.io/ipfs/QmcSPtiT3vVQ7mgL1iWcnK3kcwjMmvxHec2qKxJXRvdyzE";
    await deploy('UpliftDAO', {
      from: deployer,
      args: [nftBaseUrl],
      log: true,
    });
  };
  module.exports.tags = ['UpliftDAO'];