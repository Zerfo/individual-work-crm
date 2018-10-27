import axios from 'axios';
import qs from 'qs';

import authConstants from '../constants/auth';

const login = data => {
  const URL = '/api/v1/login';
  return async dispatch => {
    try {
      const response = await axios.post(URL, qs.stringify({ data }));
      localStorage.setItem('token', response.data.data.accessToken);
      dispatch({
        type: authConstants.SUCCESS_LOGIN,
        payload: response.data
      });
    } catch (err) {
      dispatch({
        type: authConstants.FAIL_LOGIN,
        error: err.response.data.message
      });
    }
  };
};

const logout = () => {
  localStorage.removeItem('token');
  return dispatch => dispatch({ type: authConstants.SUCCESS_LOGOUT });
};

export default {
  login,
  logout
};
