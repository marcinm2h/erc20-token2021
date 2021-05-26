const Token2021 = artifacts.require("Token2021");

module.exports = async function (deployer) {
  await deployer.deploy(Token2021);
};
