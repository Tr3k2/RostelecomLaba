const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Storage", function () {
  it("test initial value", async function () {
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy();
    await storage.waitForDeployment();
    expect(await storage.retrieve()).to.equal(0);
  });

  it("test updating and retrieving updated value", async function () {
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy();
    await storage.waitForDeployment();
    await storage.store(56);
    expect(await storage.retrieve()).to.equal(56);
  });
});
