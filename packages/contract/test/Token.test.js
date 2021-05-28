const { accounts, contract } = require('@openzeppelin/test-environment');
const { expect } = require('chai');
const { expectRevert } = require('@openzeppelin/test-helpers');

const Token2021 = contract.fromArtifact('Token2021Mock');

describe('Token2021', function () {
  const [owner, user] = accounts;
  let contract;

  beforeEach(async function () {
    contract = await Token2021.new({ from: owner });
  });

  it('claim', async function () {
    await contract.claim(10, { from: owner });
    await contract.claim(100, { from: user });

    expect((await contract.balanceOf(owner)).toNumber()).to.equal(10);
    expect((await contract.balanceOf(user)).toNumber()).to.equal(100);

    await expectRevert(
      contract.claim(2022, { from: owner }),
      'Token supply exceeded'
    );
  });
});
