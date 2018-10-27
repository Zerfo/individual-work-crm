import axios from 'axios';

const login = data => {
  const URL = '/api/v1/login';
  return async dispatch => {
    try {
      const res = await axios.post(URL, data);
      sessionStorage.setItem('token', res.data.accessToken);
    } catch (err) {
      console.log(err);
    }
  };
};

export default { login };
