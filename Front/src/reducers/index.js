import {
  combineReducers
} from 'redux';

import auth from './auth';
import claims from './claims';
import computer from './computer';

export default combineReducers({
  auth,
  claims,
  computer
});
