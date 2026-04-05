const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ballot", function () {
  it("test vote and winner", async function () {
    const candidates = [
      ethers.encodeBytes32String("candidate_0"),
      ethers.encodeBytes32String("candidate_1")
    ];
    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy(candidates);
    await ballot.waitForDeployment();
    const [, acc1] = await ethers.getSigners();
    await ballot.giveRightToVote(acc1.address);
    await ballot.connect(acc1).vote(1);
    expect(await ballot.winningProposal()).to.equal(1);
  });

  it("test delegate", async function () {
    const candidates = [
      ethers.encodeBytes32String("candidate_0"),
      ethers.encodeBytes32String("candidate_1")
    ];
    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy(candidates);
    await ballot.waitForDeployment();
    const [, acc1, acc2] = await ethers.getSigners();
    await ballot.giveRightToVote(acc1.address);
    await ballot.giveRightToVote(acc2.address);
    await ballot.connect(acc1).delegate(acc2.address);
    await ballot.connect(acc2).vote(1);
    expect(await ballot.winningProposal()).to.equal(1);
  });
});
