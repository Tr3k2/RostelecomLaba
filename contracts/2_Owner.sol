// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

contract Owner {
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function changeOwner(address newOwner) public {
        require(msg.sender == owner, "Only owner can change owner");
        require(newOwner != address(0), "Zero address");
        owner = newOwner;
    }
}
