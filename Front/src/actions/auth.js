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

const logout = data => {
  const URL = '/api/v1/logout';
  return async dispatch => {
    try {
      await axios.post(URL, qs.stringify({ data }), {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
      });
      localStorage.removeItem('token');
      dispatch({ type: authConstants.SUCCESS_LOGOUT });
    } catch (err) {
      console.error(err);
    }
  };
};

export default {
  login,
  logout
};
