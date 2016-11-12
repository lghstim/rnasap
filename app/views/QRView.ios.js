'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TextInput,
  TouchableOpacity,
  ActivityIndicatorIOS,
} = ReactNative;

var QRCode = require('react-native-qrcode');

var LoginView = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      errors: null,
    };
  },

  render: function() {

    return (
        <View style={styles.container}>
        <View style={{height: 200}}/>
        <QRCode
                  value={'https://asapserver.herokuapp.com/api/web/' + this.props.user_id + '/'}
                  size={200}
                  bgColor='black'
                  fgColor='white'/>
        </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: 300,
    marginTop: 100,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor:'rgba(256,256,256,0.6)',
    height: 40,
    borderRadius: 4,
    marginBottom: 10,
    padding: 4,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 200,
    height: 50,
    tintColor: '#3b5998',
    marginBottom: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 20,
  },
  backButtonText: {
    color: 'white'
  }
});

module.exports = LoginView;
