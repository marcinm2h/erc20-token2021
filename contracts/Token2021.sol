// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Utils {
    uint256 private randNonce = 0;
    event GenerateRandomNumber(uint256 randomNumber);

    function randomNumber(uint256 range) public returns (uint256) {
        randNonce++;
        uint256 result = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) %
            range + 1;
        emit GenerateRandomNumber(result); // FIXME: for testing purposes only. Learn good practices.

        return result;
    }
}

contract Token2021 is ERC20, Ownable {
    uint256 private _totalSupply;
    uint256 private _maxSupply = 2021;
    Utils utils = new Utils();

    constructor() ERC20("Token2021", "T21") {}

    function decimals() public pure override returns (uint8) {
        return 2;
    }

    function claim() external {
        uint256 randomNumber = utils.randomNumber(10); // TODO: random number from oracle
        mint(msg.sender, randomNumber);
    }

    function mint(address to, uint256 amount) internal {
        require(_totalSupply + amount <= _maxSupply, "Token supply exceeded");

        _totalSupply += amount;
        _mint(to, amount);
    }
}
