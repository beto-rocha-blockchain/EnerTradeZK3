// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./EnerZ.sol";

contract Exchange {
    EnerZ public token;
    mapping(address => uint256) public balances;

    constructor(address tokenAddress) {
        token = EnerZ(tokenAddress);
    }

    function deposit(uint256 amount) external {
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        require(token.transfer(msg.sender, amount), "Transfer failed");
    }

    // função usada para validar saldo via zk
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
}
