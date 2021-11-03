const sll = require("swarm-lowlevel");
var BeeJs = require("@ethersphere/bee-js");
const Web3Utils = require("web3-utils");

class Feed {
  constructor(privateKey, gateway, timeout) {
    this.privateKey = privateKey;
    this.bee = new BeeJs.Bee(gateway);
    const pk = Buffer.from(privateKey.slice(-64), "hex");
    this.wallet = new sll.unsafeWallet(pk);
  }

  async set(topicName, data) {
    let t = Web3Utils.padLeft(Web3Utils.toHex(topicName), 64, "0");
    let w = this.bee.makeFeedWriter("sequence", t, this.privateKey);
    let m = await this.bee.createFeedManifest(
      "sequence",
      t,
      this.wallet.address
    );
    let p = new TextEncoder().encode(data);
    let dr = await this.bee.uploadData(p);
    let r = await w.upload(dr);
    return dr;
  }

  async get(topicName, responseType = "text", withAddress = false) {
    let t = Web3Utils.padLeft(Web3Utils.toHex(topicName), 64, "0");

    let r = this.bee.makeFeedReader("sequence", t, this.wallet.address);
    let d = await r.download();
    let p = await this.bee.downloadData(d.reference);

    if (responseType === "text") {
      let pp = new TextDecoder().decode(p);
      if (withAddress) {
        return {
          value: pp,
          address: d.reference,
        };
      } else {
        return pp;
      }
    }

    if (responseType === "arraybuffer") {
      if (withAddress) {
        return {
          value: p,
          address: d.reference,
        };
      } else {
        return p;
      }
    }
  }
}

module.exports = Feed;
