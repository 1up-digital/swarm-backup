const sll = require('swarm-lowlevel');
const BeeClient = require('bee-client');

class Feed {
  constructor(privateKey, gateway, timeout) {
    const pk = Buffer.from(privateKey.slice(-64), 'hex');
    this.wallet = new sll.unsafeWallet(pk);

    this.gateway = gateway;
    this.beeClient = new BeeClient.BeeClient(gateway, { timeout: timeout });
  }

  async set(key, value) {
    return this.beeClient.set(this.wallet, key, value);
  }

  async get(key) {
    return this.beeClient.get(this.wallet, key);
  }
}

module.exports = Feed;
