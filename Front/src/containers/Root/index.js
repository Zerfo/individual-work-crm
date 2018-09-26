import React, { Component } from 'react';

import { Provider as StateProvider } from 'react-redux';

import store from '../../store';

import App from '../App';


export default class Root extends Component {
  render () {
    return (
      <StateProvider store={store}>
        <App />
      </StateProvider>
    );
  }
}
