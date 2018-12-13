import {
  combineReducers
} from 'redux';

import auth from './auth';
import claims from './claims';

export default combineReducers({
  auth,
  claims
});
