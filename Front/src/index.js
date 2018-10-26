import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Root from './containers/Root';

import { Provider } from 'react-redux';

import store from './store';

const CollectionApp = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

ReactDOM.render(
  <CollectionApp />,
  document.getElementById('root')
);
