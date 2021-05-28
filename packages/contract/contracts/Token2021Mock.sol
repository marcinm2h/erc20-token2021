// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token2021.sol";

contract Token2021Mock is Token2021 {
    function claim(uint256 amount) external {
        mint(msg.sender, amount);
    }
}
