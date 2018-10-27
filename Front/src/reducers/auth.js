import authConstants from '../constants/auth';

const defaultAuthStore = {
  profile: null,
  loggedIn: !!localStorage.getItem('token'),
  profileDataReceived: false,
  error: null
};

export default function presentsState (store = defaultAuthStore, action) {
  switch (action.type) {
  case authConstants.SUCCESS_LOGIN:
    return {
      ...store,
      profile: action.payload.data.attributes,
      profileDataReceived: true,
      loggedIn: true
    };
  case authConstants.FAIL_LOGIN:
    return {
      ...store,
      error: action.error
    };
  default:
    return store;
  }
}
