const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VendingMachine", function () {
  it("test payable method", async function () {
    const VendingMachine = await ethers.getContractFactory("VendingMachine");
    const vending = await VendingMachine.deploy();
    await vending.waitForDeployment();
    const [, acc1] = await ethers.getSigners();
    expect(await vending.getVendingMachineBalance()).to.equal(100);
    await vending.connect(acc1).purchase(1, { value: 1_000_000_000n });
    expect(await vending.getVendingMachineBalance()).to.equal(99);
  });

  it("test refill", async function () {
    const VendingMachine = await ethers.getContractFactory("VendingMachine");
    const vending = await VendingMachine.deploy();
    await vending.waitForDeployment();
    const [, acc1] = await ethers.getSigners();
    expect(await vending.getVendingMachineBalance()).to.equal(100);
    await vending.connect(acc1).purchase(1, { value: 1_000_000_000n });
    expect(await vending.getVendingMachineBalance()).to.equal(99);
    await vending.refill(1);
    expect(await vending.getVendingMachineBalance()).to.equal(100);
  });
});
