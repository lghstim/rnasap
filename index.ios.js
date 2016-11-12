'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  Text,
  View,
  Image,
  Navigator,
} = ReactNative;

var LoginView = require('./app/views/LoginView.ios.js');
var MainView = require('./app/views/MainView.ios.js');
var LoadingView = require('./app/views/LoadingView.ios.js');
var QRView = require('./app/views/QRView.ios.js');
var api = require('./app/global/api.js');
var storage = require('./app/global/Storage.js');

var RNAsap = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      user_id: 0,
    }
  },

  renderScene: function(route, navigator) {
    if (route.id === 'Login') {
      return (
        <LoginView navigator={navigator} setCredentials={this._setCredentials} />
      );
    }
    if (route.id === 'Main') {
      return (
        <MainView navigator={navigator} username={this.state.username} password={this.state.password} user_id={this.state.user_id}/>
      );
    }
    if (route.id === 'QR') {
      return (
        <QRView navigator={navigator} user_id={this.state.user_id} />
      );
    }
  },

  _setCredentials: function(username, password, id) {
    this.setState({
      username: username,
      password: password,
      user_id: id,
    });
  },

  render: function() {
    return (
        <Navigator
          initialRoute={{id: 'Login', index: 0}}
          configureScene={() => Navigator.SceneConfigs.PushFromRight}
          renderScene={this.renderScene}
        />
    );
  }
});

AppRegistry.registerComponent('RNAsap', () => RNAsap);
