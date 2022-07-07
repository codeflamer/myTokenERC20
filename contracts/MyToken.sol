//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    uint256 private TOTAL_SUPPLY;

    constructor(uint256 initialSupply) ERC20("MyToken", "MC") {
        _mint(msg.sender, initialSupply);
    }

    // function getTotalSupply() public view returns (uint256) {
    //     return TOTAL_SUPPLY;
    // }
}
