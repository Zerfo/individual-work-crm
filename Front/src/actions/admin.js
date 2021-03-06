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
  FAIL_GET_USER_CLAIMS
} from '../constants/claims';
import {
  SUCCESS_GET_USER_COMPUTERS,
  FAIL_GET_USER_COMPUTERS
} from '../constants/computer';


export const getAdminInfo = () => {
  const URL = '/api/v1/admin/info';
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
    } catch (err) {
      dispatch({
        type: FAIL_GET_USER_INFO,
        error: err
      });
      dispatch({
        type: FAIL_GET_USER_CLAIMS,
        error: err
      });
    }
  };
};

export const editAdmin = data => {
  const URL = 'api/v1/admin/edit';
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
  const URL = 'api/v1/admin/claims';
  return async dispatch => {
    try {
      const response = await axios.get(URL, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
      });
      dispatch({
        type: SUCCESS_GET_USER_CLAIMS,
        payload: response.data.attributes.claim
      });
    } catch (err) {
      dispatch({
        type: FAIL_GET_USER_CLAIMS,
        error: err
      });
    }
  };
};

export const getComputers = () => {
  const URL = 'api/v1/admin/computers';
  return async dispatch => {
    try {
      const response = await axios.get(URL, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
      });
      dispatch({
        type: SUCCESS_GET_USER_COMPUTERS,
        payload: response.data.attributes.computers
      });
    } catch (err) {
      dispatch({
        type: FAIL_GET_USER_COMPUTERS,
        error: err
      });
    }
  };
};

export default {
  getAdminInfo,
  editAdmin,
  getClaims,
  getComputers
};
