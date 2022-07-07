const { assert, expect } = require("chai");
const { getNamedAccounts, deployments, ethers } = require("hardhat");
const { INITIAL_SUPPLY } = require("../../helper-hardhat-config");

describe("My Unit Test", () => {
  const multiplier = 10 ** 18;
  let deployer, user1, myToken;
  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer;
    user1 = (await getNamedAccounts()).user1;
    await deployments.fixture(["all"]);
    myToken = await ethers.getContract("MyToken", deployer);
  });

  //   it("was deployed", async () => {
  //     assert(myToken.address);
  //   });

  describe("constructor", () => {
    it("should have correct initial supply", async () => {
      const totalSupply = await myToken.totalSupply();
      assert.equal(totalSupply.toString(), INITIAL_SUPPLY);
    });

    it("initializes the token with the correct name", async () => {
      const TokenName = (await myToken.name()).toString();
      assert.equal(TokenName, "MyToken");

      const tokenSymbol = (await myToken.symbol()).toString();
      assert.equal(tokenSymbol, "MC");
    });
  });

  describe("transfers", () => {
    it("should be able to transfer tokens successfully to an address", async () => {
      const amountToTransfer = ethers.utils.parseEther("10");
      const balanceReceiveBeforeTransfer = await myToken.balanceOf(user1);
      await myToken.transfer(user1, amountToTransfer);
      const balanceReceiveAfterTransfer = await myToken.balanceOf(user1);
      const difference = balanceReceiveAfterTransfer.sub(
        balanceReceiveBeforeTransfer
      );
      assert.equal(amountToTransfer.toString(), difference.toString());
    });

    it("emits an transfer event, when a transfer occurs", async () => {
      await expect(
        myToken.transfer(user1, (10 * multiplier).toString())
      ).to.emit(myToken, "Transfer");
    });

    describe("allowance", () => {
      const amount = (20 * multiplier).toString();
      beforeEach(async () => {
        playerToken = await ethers.getContract("MyToken", user1);
      });
      it("should approve other address to spend", async () => {
        const tokenToSpend = ethers.utils.parseEther("5");
        await myToken.approve(user1, tokenToSpend);
        const ourToken1 = await ethers.getContract("MyToken", user1);
        await ourToken1.transferFrom(deployer, user1, tokenToSpend);
        expect(await ourToken1.balanceOf(user1)).to.equal(tokenToSpend);
      });

      it("doesnt allow an unapproved member to so transfers", async () => {
        await expect(
          playerToken.transferFrom(deployer, user1, amount)
        ).to.be.revertedWith("ERC20: insufficient allowance");
      });

      it("emits an approval event, when an approval occurs", async () => {
        await expect(myToken.approve(user1, amount)).to.emit(
          myToken,
          "Approval"
        );
      });

      it("the allowance being set is accurate", async () => {
        await myToken.approve(user1, amount);
        const allowance = await myToken.allowance(deployer, user1);
        assert.equal(allowance.toString(), amount);
      });
      it("would not allow a user to go over the allowance", async () => {
        await myToken.approve(user1, amount);
        await expect(
          playerToken.transferFrom(
            deployer,
            user1,
            (40 * multiplier).toString()
          )
        ).to.be.revertedWith("ERC20: insufficient allowance");
      });
    });
  });
});
