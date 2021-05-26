module.exports = async function main(callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const Token2021 = artifacts.require("Token2021");
    const token2021 = await Token2021.deployed();
    console.log((await token2021.balanceOf(accounts[0])).toNumber());
    await token2021.claim();
    console.log((await token2021.balanceOf(accounts[0])).toNumber());

    callback(0);
  } catch (error) {
    console.error(error);
    callback(1);
  }
}