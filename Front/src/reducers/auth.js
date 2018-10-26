import {} from '../constants/auth';

const defaultAuthStore = {
  profile: null,
  loggedIn: !!localStorage.getItem('authToken'),
  error: null
};

export default function presentsState (store = defaultAuthStore, action) {
  switch (action.type) {
  default:
    return store;
  }
}
