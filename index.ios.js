import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';

import init from './src/utils/configuration';
init();

import React from 'react';
import {AppRegistry} from 'react-native';

var request = new XMLHttpRequest();

request.open('GET', 'https://private-cef4b-corporatecare.apiary-mock.com/services');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();

const KNCorporate = React.createClass({

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
});

AppRegistry.registerComponent('KNCorporate', () => KNCorporate);
