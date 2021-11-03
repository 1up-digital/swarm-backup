const Web3 = require("web3");
const Crypto = require("./crypto.js");

const web3 = new Web3();

class WalletClass {
  constructor(attrs) {
    this.address = attrs.address || null;
    this.publicKey = attrs.publicKey || null;
    this.privateKey = attrs.privateKey || null;
  }
}

class Wallet {
  /**
   * Generate new wallet
   * @param {string} password to use when generating wallet
   * @returns {Wallet} new wallet
   */
  generate(password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const account = web3.eth.accounts.create();
        const wallet = new WalletClass({
          address: account.address.toLowerCase(),
          publicKey: Crypto.privateToPublicKey(account.privateKey),
          privateKey: account.privateKey,
        });
        this.wallet = wallet;
        this.walletV3 = web3.eth.accounts.encrypt(account.privateKey, password);
        resolve(this);
      });
    });
  }

  /**
   * Create wallet from json string
   * @param {string} walletJSON string
   * @param {string} password to use
   * @returns {Wallet} wallet
   */
  fromJSON(walletJSON, password) {
    return new Promise((resolve, reject) => {
      try {
        const account = web3.eth.accounts.decrypt(walletJSON, password);
        const wallet = new WalletClass({
          address: account.address.toLowerCase(),
          publicKey: Crypto.privateToPublicKey(account.privateKey),
          privateKey: account.privateKey,
        });
        resolve(wallet);
      } catch (err) {
        if (
          err.message === "Key derivation failed - possibly wrong passphrase"
        ) {
          reject(false);
        } else {
          throw new Error(err);
        }
      }
    });
  }

  /**
   * Restores wallet from private key
   * @param {string} privateKey private key string, no 0x
   * @param {string} password to use
   * @returns {Wallet} wallet
   */
  encrypt(privateKey, password) {
    return new Promise((resolve) => {
      try {
        const walletV3 = web3.eth.accounts.encrypt(privateKey, password);
        const walletJSON = JSON.stringify(walletV3);
        resolve(walletJSON);
      } catch (err) {
        throw new Error(err);
      }
    });
  }
}

module.exports = Wallet;
