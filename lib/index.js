// SPDX-License-Identifier: MIT

const Feed = require('./feed.js');

class SwarmBackup {
  constructor(gateway, privateKey) {
    this.gateway = gateway;
    this.privateKey = privateKey;
    this.feed = new Feed(privateKey, this.gateway);
  }

  /**
   * Collects the data from swarm using dataKey and returns it
   * specified localstorage key
   * @restore
   * @param {string} dataKey, a string to identify the data
   * @returns {boolean}, true if successful
   */
  async restore(dataKey) {
    try {
      if (typeof dataKey === 'undefined') throw new Error('dataKey must be defined');

      const data = await this.feed.get(dataKey);
      return data;
    } catch (err) {
      return err;
    }
  }

  /**
   * Backs up the data value to swarm
   * @backup
   * @param {string} dataKey, a string to identify the data
   * @param {string} value, the value to store
   * @returns {boolean} true if successful
   */
  async backup(dataKey, value) {
    try {
      if (typeof dataKey === 'undefined') throw new Error('dataKey must be defined');
      if (typeof value === 'undefined') throw new Error('value must be defined');

      await this.feed.set(dataKey, value);
      return true;
    } catch (err) {
      return err;
    }
  }
}

module.exports = SwarmBackup;