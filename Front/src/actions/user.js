import axios from 'axios';
import qs from 'qs';

import {
  SUCCESS_GET_USER_INFO,
  SUCCESS_PUT_USER_INFO,
  FAIL_GET_USER_INFO,
  FAIL_PUT_USER_INFO
} from '../constants/user';
import {
  SUCCESS_GET_USER_CLAIMS,
  SUCCESS_CREATE_USER_CLAIMS,
  FAIL_GET_USER_CLAIMS,
  FAIL_CREATE_USER_CLAIMS
} from '../constants/claims';
import {
  SUCCESS_GET_USER_COMPUTER,
  FAIL_GET_USER_COMPUTER
} from '../constants/computer';


export const getUserInfo = () => {
  const URL = '/api/v1/user/info';
  return async dispatch => {
    try {
      const response = await axios.get(URL, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
      });
      dispatch({
        type: SUCCESS_GET_USER_INFO,
        payload: response.data.attributes
      });
      dispatch({
        type: SUCCESS_GET_USER_CLAIMS,
        payload: response.data.userClaims
      });
      dispatch({
        type: SUCCESS_GET_USER_COMPUTER,
        payload: response.data.computer
      });
    } catch (err) {
      dispatch({
        type: FAIL_GET_USER_INFO,
        error: err
      });
      dispatch({
        type: FAIL_GET_USER_CLAIMS,
        error: err
      });
      dispatch({
        type: FAIL_GET_USER_COMPUTER,
        error: err
      });
    }
  };
};

export const editUser = data => {
  const URL = 'api/v1/user/edit';
  return async dispatch => {
    try {
      const response = await axios.put(URL, qs.stringify({ ...data }), {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
      });
      dispatch({
        type: SUCCESS_PUT_USER_INFO,
        payload: response.data.attributes
      });
    } catch (err) {
      dispatch({
        type: FAIL_PUT_USER_INFO,
        error: err
      });
    }
  };
};

export const getClaims = () => {
  const URL = 'api/v1/user/claims';
  return async dispatch => {
    try {
      const response = await axios.get(URL, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
      });
      dispatch({
        type: SUCCESS_GET_USER_CLAIMS,
        payload: response.data.data.claims
      });
    } catch (err) {
      dispatch({
        type: FAIL_GET_USER_CLAIMS,
        error: err
      });
    }
  };
};

export const createClaim = data => {
  const URL = 'api/v1/user/claims/add';
  return async dispatch => {
    try {
      const response = await axios.post(URL, qs.stringify({ ...data }), {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
      });
      dispatch({
        type: SUCCESS_CREATE_USER_CLAIMS,
        payload: response.data.data.claims
      });
    } catch (err) {
      dispatch({
        type: FAIL_CREATE_USER_CLAIMS,
        error: err
      });
    }
  };
};

export const closeClaim = async data => {
  const URL = 'api/v1/user/claim/close';
  try {
    await axios.post(URL, qs.stringify({ ...data }), {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
    });
  } catch (err) {
    console.log(err);
  }
};

export default {
  closeClaim,
  getUserInfo,
  editUser,
  getClaims,
  createClaim
};
