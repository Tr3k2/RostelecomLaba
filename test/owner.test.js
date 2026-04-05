const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Owner", function () {
  it("test contract owner", async function () {
    const [acc0] = await ethers.getSigners();
    const Owner = await ethers.getContractFactory("Owner");
    const owner = await Owner.deploy();
    await owner.waitForDeployment();
    expect(await owner.getOwner()).to.equal(acc0.address);
  });

  it("test change owner", async function () {
    const [, acc1] = await ethers.getSigners();
    const Owner = await ethers.getContractFactory("Owner");
    const owner = await Owner.deploy();
    await owner.waitForDeployment();
    await owner.changeOwner(acc1.address);
    expect(await owner.getOwner()).to.equal(acc1.address);
  });
});
