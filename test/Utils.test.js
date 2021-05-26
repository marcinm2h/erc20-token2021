const { accounts, contract } = require("@openzeppelin/test-environment");
const { expectEvent } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

const Utils = contract.fromArtifact("Utils");

describe("Utils", function () {
  const [owner, user] = accounts;
  let contract;

  beforeEach(async function () {
    contract = await Utils.new({ from: owner });
  });

  it("randomNumber", async function () {
    const receipt = await contract.randomNumber(10);
    expectEvent(receipt, 'GenerateRandomNumber');
    expect(receipt.logs[0].args[0].toNumber()).to.be.lessThan(11); // FIXME: mocking randomness / testing args
  });
});
