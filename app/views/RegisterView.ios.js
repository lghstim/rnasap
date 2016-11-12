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

var RegisterView = React.createClass({
  componentWillMount: function() {
  },

  getInitialState: function() {
    return {
      name: '',
      email: '',
      phone: '',
      loading: false,
    };
  },

  render: function() {
    var button = <Button buttonText='NEXT' onPress={this._onSubmit} style={{tintColor: '#FCEE9D'}}/>;
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
        <Text style={{fontFamily: "Avenir-Book", fontSize: 35, marginTop: 25}}> Register </Text>
      </View>
      <View style={{flex: 0.9, width: 375}} contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
      <View style={{height: 250, marginLeft: 15, marginTop: 30, width: 350, alignItems: 'center', justifyContent: 'center'}}>
      <SocialRegister image={require("../images/profile.png")} onChange={(name) => this.setState({name})} placeholder="Name"/>
      <SocialRegister image={require("../images/mail.png")} onChange={(email) => this.setState({email})} placeholder="Email"/>
      <SocialRegister image={require("../images/phone.png")} onChange={(phone) => this.setState({phone})} placeholder="Phone Number"/>

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
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone
    }, this.props.username, this.props.password)
      .then((responseData) => {
        if (responseData.id) {
          this.props.navigator.push({
            id: 'Main',
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

module.exports = RegisterView;
