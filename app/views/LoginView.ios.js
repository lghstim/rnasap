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

var api = require('../global/api.js');
var storage = require('../global/Storage.js');
var Button = require('../global/Button.ios.js');

var LoginView = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      errors: null,
    };
  },

  render: function() {
    var errorBox = null;
    var loginButtons =
        <View>
          <Button buttonText='Login' onPress={this._onLogin} />
          <Button buttonText='Create Account' onPress={this._onCreate} />
        </View>;

    if (this.state.errors !== null) {
      errorBox = <Text style={styles.errors}>{this.state.errors}</Text>;
    }

    return (
        <View style={styles.container}>
          <Image source={require('image!intro')} style={styles.image}>
            <View style={styles.topContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  placeholder="Username"
                  onChangeText={(username) => this.setState({username})}
                />
                <TextInput
                  secureTextEntry={true}
                  autoCapitalize="none"
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={(password) => this.setState({password})}
                />
              </View>
              {loginButtons}
              {errorBox}
            </View>
          </Image>
        </View>
    );
  },

  _onLogin: function() {
    this.setState({spinner: true})
    api.post('api/login/', {
        username: this.state.username,
        password: this.state.password
      })
      .then((responseData) => {
        if (responseData.token) {
          this.props.setCredentials(this.state.username, this.state.password, responseData.id);
          this.props.navigator.push({
            id: 'Main',
          });
        } else {
          this.setState({errors: responseData.errors})
        }
      })
      .done();
  },

  _onCreate: function() {
    api.post('api/register/', {
        username: this.state.username,
        password: this.state.password
      })
      .then((responseData) => {
        if (responseData.token) {
          this.props.setCredentials(this.state.username, this.state.password, responseData.id);
          this.props.navigator.push({
            id: 'Main',
          });
        } else {
          console.log(responseData);
          this.setState({errors: responseData.errors});
        }
      })
      .done();
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
