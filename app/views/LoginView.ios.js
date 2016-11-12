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
  ActivityIndicator,
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
      loading: false,
    };
  },

  render: function() {
    var errorBox = null;
    var loginButtons =
        <View>
          <Button buttonText='Login' onPress={this._onLogin} style={{tintColor: '#DDF9C2', height: 30}}/>
          <Button buttonText='Register' onPress={this._onCreate}  style={{tintColor: '#DDF9C2', height: 30 }} />
        </View>;

    if (this.state.loading) {
      loginButtons = <ActivityIndicator
              animating={true}
              style={{height: 80}}
              size="large"
            />;
    }

    if (this.state.errors !== null) {
      errorBox = <Text style={styles.errors}>{this.state.errors}</Text>;
    }

    return (
        <View style={styles.container}>
          <Image source={require('../images/login.png')} style={styles.image}>
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
    this.setState({loading: true})
    api.post('api/login/', {
        username: this.state.username,
        password: this.state.password
      })
      .then((responseData) => {
        if (responseData.token) {
          this.props.setCredentials(this.state.username, this.state.password, responseData.id);
          this.props.navigator.push({
            id: 'Register',
          });
        } else {
          this.setState({errors: responseData.errors})
        }
        this.setState({loading: false});
      })
      .done();
  },

  _onCreate: function() {
    this.setState({loading: true});
    api.post('api/register/', {
        username: this.state.username,
        password: this.state.password
      })
      .then((responseData) => {
        if (responseData.token) {
          this.props.setCredentials(this.state.username, this.state.password, responseData.id);
          this.props.navigator.push({
            id: 'Register',
          });
        } else {
          this.setState({errors: responseData.errors});
        }
        this.setState({loading: false});
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
    backgroundColor:'#B7F4F3',
    textAlign: 'center',
    height: 40,
    borderRadius: 4,
    marginBottom: 10,
    padding: 4,
  },
  image: {
    flex: 1,
    width: 375,
    height: 1200,
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
