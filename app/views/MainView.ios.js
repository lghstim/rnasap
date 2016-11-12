'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
  TabBarIOS,
  ScrollView,
} = ReactNative;
var SocialRegister = require('./components/SocialRegister.ios.js');
var Button = require('../global/Button.ios.js');
var api = require('../global/api.js');

var MainView = React.createClass({
  componentWillMount: function() {
  },

  getInitialState: function() {
    return {
      facebook: '',
      spotify: '',
      snapchat: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
      <View style={{backgroundColor: '#AAAAAA', flex: 0.15, justifyContent: 'center', alignItems: 'center', width: 800}}>
        <Text> Let's Get Social </Text>
      </View>
      <View style={{flex: 0.85, width: 375}} contentContainerStyle={{alignItems: 'center'}}>
      <Image source={require('../images/background.jpg')} style={styles.image}>
      <View style={{flex: 1, marginTop: 30, width: 350}}>
      <SocialRegister image={require("../images/facebook.png")} onChange={(facebook) => this.setState({facebook})}/>
      <SocialRegister image={require("../images/spotify.jpg")} onChange={(spotify) => this.setState({spotify})}/>
      <SocialRegister image={require("../images/snapchat.jpg")} onChange={(snapchat) => this.setState({snapchat})}/>
      <SocialRegister image={require("../images/twitter.png")} onChange={(twitter) => this.setState({twitter})}/>
      <SocialRegister image={require("../images/linkedin.png")} onChange={(linkedin) => this.setState({linkedin})}/>
      <SocialRegister image={require("../images/instagram.png")} onChange={(instagram) => this.setState({instagram})}/>
      </View>
      <View style={{width: 100}}>
      <Button buttonText='Submit' onPress={this._onSubmit} />
      </View>
      </Image>
      </View>
      </View>
    );
  },

  _onSubmit: function() {
    api.post('api/connect/' + this.props.user_id + '/', {
      facebook: this.state.facebook,
      spotify: this.state.spotify,
      snapchat: this.state.snapchat,
      twitter: this.state.twitter,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
    }, this.props.username, this.props.password)
      .then((responseData) => {
        console.log(responseData);
        if (responseData.id) {
          this.props.navigator.push({
            id: 'QR',
          });
        } else {
          this.setState({errors: responseData.errors});
        }
      })
      .done();
  }
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
    width: 400,
    height: 600,
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

module.exports = MainView;
