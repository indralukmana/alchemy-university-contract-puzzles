const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    const threshold = ethers.BigNumber.from(
      "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf"
    );

    // good luck

    let found = false;
    let foundWallet = null;

    while (!found) {
      const wallet = ethers.Wallet.createRandom();
      const address = wallet.address;
      if (threshold.gt(ethers.BigNumber.from(address))) {
        found = true;
        foundAddress = address;
        foundWallet = wallet;
      }
    }

    const provider = ethers.provider;
    const connectedWallet = foundWallet.connect(provider);

    const [deployer] = await ethers.getSigners();

    await deployer.sendTransaction({
      to: foundWallet.address,
      value: ethers.utils.parseEther("0.1"),
    });

    await game.connect(connectedWallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
