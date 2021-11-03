const assert = require("assert");

const gateway = "https://bee-gateway.duckdns.org";

const SwarmBackup = require("../lib/index.js");

let sb;

const Wallet = require("../lib/wallet.js");
require("../lib/feed.js");

let w1;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

describe("Swarm Backup", () => {
  describe("backup and restore in same SwarmBackup session", () => {
    before(async () => {
      w1 = await new Wallet().generate("test-pw-1");
      sb = new SwarmBackup(gateway, w1.wallet.privateKey);
    });

    step("fails with no dataKey", async () => {
      const result = await sb.backup();
      assert.equal(result, "Error: dataKey must be defined");
    });

    step("fails with no value", async () => {
      const result = await sb.backup("test-dataKey");
      assert.equal(result, "Error: value must be defined");
    });

    step("completes backup successfully", async () => {
      const result = await sb.backup("test-dataKey", "battyraas");
      assert.equal(result, true);
    });

    step("returns correct value", async () => {
      const result = await sb.restore("test-dataKey");
      assert.equal(result, "battyraas");
    });
  });

  describe("backup and restore in different SwarmBackup sessions", () => {
    step("completes backup successfully", async () => {
      let sb2 = new SwarmBackup(
        gateway,
        "0xd3cc03cbdfb5fe21a6c1560d96f12b75dca491d3dfc7b4f0bf3e956c22ad5f83"
      );
      const result = await sb.backup("test-dataKey2", "bambafire");
      assert.equal(result, true);
    });

    step("returns battyraas", async () => {
      let sb2 = new SwarmBackup(
        gateway,
        "0xd3cc03cbdfb5fe21a6c1560d96f12b75dca491d3dfc7b4f0bf3e956c22ad5f83"
      );
      const result = await sb.restore("test-dataKey2");
      assert.equal(result, "bambafire");
    });
  });

  describe("backup and restore in same SwarmBackup session", () => {
    before(async () => {
      w1 = await new Wallet().generate("test-pw-1");
      sb = new SwarmBackup(gateway, w1.wallet.privateKey);
    });

    step("updates once successfully", async () => {
      const result = await sb.backup("one for the", "money");
      assert.equal(result, true);
    });

    step("updates once returns correct value", async () => {
      const result = await sb.restore("one for the");
      assert.equal(result, "money");
    });

    step("updates twice successfully", async () => {
      const result = await sb.backup("two for the", "show");
      assert.equal(result, true);
    });

    step("updates twice returns correct value", async () => {
      const result = await sb.restore("two for the");
      assert.equal(result, "show");
    });

    step("updates thrice successfully", async () => {
      const result = await sb.backup("three to get", "ready");
      assert.equal(result, true);
    });

    step("updates thrice returns correct value", async () => {
      const result = await sb.restore("three to get");
      assert.equal(result, "ready");
    });

    step("updates frice successfully", async () => {
      const result = await sb.backup("now", "go cat go");
      assert.equal(result, true);
    });

    step("updates frice returns correct value", async () => {
      const result = await sb.restore("now");
      assert.equal(result, "go cat go");
    });
  });
});
