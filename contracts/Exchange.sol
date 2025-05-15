// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./EnerZ.sol";
import "./Groth16Verifier.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Exchange is ReentrancyGuard {
    EnerZ public token;
    Groth16Verifier public verifier;

    mapping(address => uint256) public balances;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    constructor(address tokenAddress, address verifierAddress) {
        token = EnerZ(tokenAddress);
        verifier = Groth16Verifier(verifierAddress);
    }

    function deposit(uint256 amount) external nonReentrant {
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        balances[msg.sender] += amount;
        emit Deposit(msg.sender, amount);
    }

    function withdraw(uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        require(token.transfer(msg.sender, amount), "Transfer failed");
        emit Withdraw(msg.sender, amount);
    }

    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }

    // 🔐 Verifica prova de que saldo é >= a certo limite sem revelar o saldo real
    function verifyBalanceProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory input // public input = threshold
    ) public view returns (bool) {
        return verifier.verifyProof(a, b, c, input);
    }
}
