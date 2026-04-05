// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

contract VendingMachine {
    address public owner;
    uint256 private vendingMachineBalance;
    uint256 public constant PRICE_PER_ITEM = 1 gwei;

    constructor() {
        owner = msg.sender;
        vendingMachineBalance = 100;
    }

    function getVendingMachineBalance() public view returns (uint256) {
        return vendingMachineBalance;
    }

    function refill(uint256 amount) public {
        require(msg.sender == owner, "Only owner can refill");
        vendingMachineBalance += amount;
    }

    function purchase(uint256 amount) public payable {
        require(amount > 0, "Amount must be greater than zero");
        require(vendingMachineBalance >= amount, "Not enough stock");
        require(msg.value >= amount * PRICE_PER_ITEM, "Insufficient payment");
        vendingMachineBalance -= amount;
    }
}
