'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput
} = ReactNative;


var SocialRegister = React.createClass({
  render: function() {
    var darkStyle = this.props.dark ? styles.dark : null;
    return (
      <View style={styles.container}>
      <Image source={this.props.image} style={styles.image}>
     </Image>

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Username"
          onChangeText={this.props.onChange}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  bottomContainer: {
    height: 100,
  },
  errors: {
    backgroundColor: 'rgba(256,0,0,0.5)',
    padding: 10,
    color:'rgba(256,256,256,0.9)',
    width: 300,
    height: 40,
    borderRadius: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    backgroundColor:'rgba(256,256,256,0.8)',
    height: 40,
    marginLeft: 15,
    marginRight: 10,
    borderRadius: 4,
    marginBottom: 15,
    padding: 4,
  },
});

module.exports = SocialRegister;
