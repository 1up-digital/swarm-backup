const assert = require("assert");

const Feed = require("../lib/feed.js");
const Wallet = require("../lib/wallet.js");

// nb uses mocha steps to ensure tests are sequential

const gateway = "https://bee-9.gateway.ethswarm.org";

let w1;
let feed;

describe("Feed", () => {
  before(async () => {
    feed = new Feed(
      "0xd3cc03cbdfb5fe21a6c1560d96f12b75dca491d3dfc7b4f0bf3e956c22ad5f83",
      "0000000000000000000000000000000000000000000000000000000000000000",
      gateway,
      1000000
    );
  });

  step("should set a value", async () => {
    feed.set("bumbaraas", "battyclart");
  });

  step("should get a value", async () => {
    const p = await feed.get("bumbaraas");
    assert.equal(p, "battyclart");
  });
});
