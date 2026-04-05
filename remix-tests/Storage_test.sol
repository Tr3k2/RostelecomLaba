// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;
import "remix_tests.sol";
import "../contracts/1_Storage.sol";

contract StorageTest {
    Storage storageToTest;

    function beforeAll() public {
        storageToTest = new Storage();
    }

    function checkWriteRead() public {
        storageToTest.store(42);
        Assert.equal(storageToTest.retrieve(), uint256(42), "proposal retrieve should be 42");
    }
}
