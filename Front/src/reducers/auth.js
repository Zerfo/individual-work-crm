import authConstants from '../constants/auth';
import userConstants from '../constants/user';

const defaultAuthStore = {
  profile: null,
  loggedIn: !!localStorage.getItem('token'),
  profileDataReceived: false,
  error: null
};

export default function authStore (store = defaultAuthStore, action) {
  switch (action.type) {
  case authConstants.SUCCESS_LOGIN:
    return {
      ...store,
      profile: action.payload.data.attributes,
      profileDataReceived: true,
      loggedIn: true
    };
  case userConstants.SUCCESS_GET_USER_INFO:
    return {
      ...store,
      profile: action.payload
    };
  case userConstants.FAIL_GET_USER_INFO:
    return {
      ...store,
      error: action.error
    };
  case authConstants.FAIL_LOGIN:
    return {
      ...store,
      error: action.error
    };
  case authConstants.SUCCESS_LOGOUT:
    return {
      ...store,
      loggedIn: !!localStorage.getItem('token')
    };
  case userConstants.SUCCESS_PUT_USER_INFO:
    return {
      ...store,
      profile: action.payload
    };
  case userConstants.FAIL_PUT_USER_INFO:
    return {
      ...store,
      error: action.error
    };
  default:
    return store;
  }
}
