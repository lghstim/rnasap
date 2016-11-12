var API_URL = 'https://asapserver.herokuapp.com/';
var base64 = require('base-64');
var utf8 = require('utf8');

var post = async function(endpoint, body, username='', password='') {
  var headers = {'Content-Type': 'application/json'};
  if (username !== '') {
    var text = username + ':' + password;
    console.log(text);
    var bytes = utf8.encode(text);
    console.log(bytes);
    var encoded = base64.encode(text);
    console.log(encoded);
    headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + encoded,
    };
  }
  return await fetch(API_URL + endpoint,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response;
      }
    });
};

var get = async function(endpoint) {
  return await fetch(API_URL + endpoint,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + this.access_token,
      },
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response;
      }
    });
}

exports.post = post;
exports.get = get;
