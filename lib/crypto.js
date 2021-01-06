const nc = require('crypto');
const elliptic = require('elliptic');

class Crypto {
  privateToPublicKey(privateKey) {
    const secp256k1 = new elliptic.ec('secp256k1'); // eslint-disable-line
    const buffer = Buffer.from(privateKey.slice(2), 'hex');
    const ecKey = secp256k1.keyFromPrivate(buffer);
    const publicKey = `0x${ecKey.getPublic(false, 'hex').slice(2)}`;
    return publicKey;
  }

  /**
   * Calculates shared secret
   * @calculateSharedSecret
   * @param {any} privateKey private key
   * @param {any} recipientPublicKey recipient public key
   * @returns {string} secret
   */
  calculateSharedSecret(privateKey, recipientPublicKey) {
    const pk = privateKey.substring(2, 66);
    const pub = recipientPublicKey.substring(2, 130);
    if (pk.length !== 64) {
      throw new Error(`private key must be a 32 byte hex string ${privateKey}`);
    }
    if (pub.length !== 128) {
      throw new Error(`public key must be a 64 byte hex string ${recipientPublicKey}`);
    }
    const sender = nc.createECDH('secp256k1');
    sender.setPrivateKey(pk, 'hex');
    return sender.computeSecret(`04${pub}`, 'hex').toString('hex');
  }
}

module.exports = new Crypto();
