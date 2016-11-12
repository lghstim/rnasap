'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Image,
  ActivityIndicatorIOS,
} = ReactNative;

var LoadingView = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Image source={require('image!intro')} style={styles.image}>
        </Image>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  }
});

module.exports = LoadingView;
