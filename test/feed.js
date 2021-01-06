const assert = require('assert');

const Feed = require('../lib/feed.js');
const Wallet = require('../lib/wallet.js');

// nb uses mocha steps to ensure tests are sequential

const gateway = 'http://localhost:1633'; // run ethersphere/bee
let w1;
let feed;

describe('Feed', () => {
  before(async () => {
    w1 = await new Wallet().generate('test-pw-1');
    feed = new Feed(w1.wallet.privateKey, gateway);
  });

  step('should set a value', async () => {
    feed.set('bumbaraas', 'battyclart');
  });

  step('should get a value', async () => {
    const p = await feed.get('bumbaraas');
    assert.equal(p, 'battyclart');
  });
});
