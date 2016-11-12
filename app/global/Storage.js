'use strict';

var React = require('react-native');
var { AsyncStorage } = React;

var KEYS = {
  'token': '@AsyncStorageToken:key',
};

var Storage = {
  async loadStorage() {
    try {
      var token = await AsyncStorage.getItem(KEYS['token']);
      return {token: token};
    } catch (error) {
      return null;
    }
  },

  async onValueChange(key, value) {
    await AsyncStorage.setItem(KEYS[key], value);
  },

  async removeStorage(key) {
    try {
      await AsyncStorage.removeItem(KEYS[key]);
      return true;
    } catch (error) {
      return false;
    }
  }
};

module.exports = Storage;
