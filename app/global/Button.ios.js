'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text
} = ReactNative;


var Button = React.createClass({
  render: function() {

    var darkStyle = this.props.dark ? styles.dark : null;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('image!white')}
          style={[styles.button, darkStyle]}>
          <Text style={styles.buttonText}>{this.props.buttonText}</Text>
        </Image>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  dark: {
    tintColor: 'rgba(128, 128, 128, 0.1)'
  },
  buttonText: {
    color: '#007AFF',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  },
});

module.exports = Button;
