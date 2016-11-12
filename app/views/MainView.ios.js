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
  ActivityIndicator,
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
      instagram: '',
      loading: false,
    };
  },

  render: function() {
    var button = <Button buttonText='Submit' onPress={this._onSubmit} />;
    if (this.state.loading) {
      button =  <ActivityIndicator
        animating={true}
        style={{height: 80}}
        size="large"
      />;
    }
    return (
      <View style={styles.container}>
      <Image source={require('../images/background.png')} style={styles.image}>

      <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center', width: 800}}>
        <Text style={{fontFamily: "Avenir-Book", fontSize: 35, marginTop: 25}}> Connect </Text>
      </View>
      <View style={{flex: 0.9, width: 375}} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flex: 1, marginLeft: 15, marginTop: 30, width: 350, alignItems: 'center', justifyContent: 'center'}}>
      <SocialRegister image={require("../images/facebook-i.png")} onChange={(facebook) => this.setState({facebook})}/>
      <SocialRegister image={require("../images/venmo-i.png")} onChange={(spotify) => this.setState({spotify})}/>
      <SocialRegister image={require("../images/snapchat-i.png")} onChange={(snapchat) => this.setState({snapchat})}/>
      <SocialRegister image={require("../images/twitter-i.png")} onChange={(twitter) => this.setState({twitter})}/>
      <SocialRegister image={require("../images/linkedin-i.png")} onChange={(linkedin) => this.setState({linkedin})}/>
      <SocialRegister image={require("../images/instagram-i.png")} onChange={(instagram) => this.setState({instagram})}/>
      </View>
      <View style={{width: 375, justifyContent: 'center', alignItems: 'center'}}>
    {button}
    </View>
      </View>
      </Image>

      </View>
    );
  },

  _onSubmit: function() {
    this.setState({loading: true});
    api.post('api/connect/' + this.props.user_id + '/', {
      facebook: this.state.facebook,
      spotify: this.state.spotify,
      snapchat: this.state.snapchat,
      twitter: this.state.twitter,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
    }, this.props.username, this.props.password)
      .then((responseData) => {
        if (responseData.id) {
          this.props.navigator.push({
            id: 'QR',
          });
        } else {
          this.setState({errors: responseData.errors});
        }
        this.setState({loading: false});
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
