import axios from 'axios';

import { SUCCESS_GET_USER_INFO, FAIL_GET_USER_INFO } from '../constants/user';
import { SUCCESS_GET_USER_CLAIMS, FAIL_GET_USER_CLAIMS } from '../constants/claims';


export const getUserInfo = () => {
  const URL = '/api/v1/user/info';
  return async dispatch => {
    try {
      const response = await axios.get(URL, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
      });
      console.log(response);
      dispatch({
        type: SUCCESS_GET_USER_INFO,
        payload: response.data.attributes
      });
      dispatch({
        type: SUCCESS_GET_USER_CLAIMS,
        payload: response.data.userClaims
      });
    } catch (err) {
      dispatch({
        type: FAIL_GET_USER_INFO,
        error: err.response.data.message
      });
      dispatch({
        type: FAIL_GET_USER_CLAIMS,
        error: err.response.data.message
      });
    }
  };
};

export default {
  getUserInfo
};
