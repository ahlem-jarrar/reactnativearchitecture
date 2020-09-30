import {httpAuth} from '../../services/utils';
import {SET_CURRENT_USER} from '../login/types';
import axios from 'axios';
import {showLoader, hideLoader} from '../../store/loader/actions';

export const loginUser = (payload) => async (dispatch) => {
  dispatch(showLoader());
  var data = JSON.stringify({
    email: 'noura.p@yopmail.com',
    password: 'Test@123',
  });

  var config = {
    method: 'post',
    url: 'http://stg-nep.proxym-group.net/api/v1/auth/signin',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      dispatch(setCurrentUser(response?.data?.result?.user));
      dispatch(hideLoader());
    })
    .catch(function (error) {
      console.log(error);
    });

  /*
  console.log('login request', JSON.stringify(payload));
  const options = {
    headers: {
      'no-lang': 'N/A',
    },
  };
  // set loading indicator
  dispatch(setLoading());
  const response = await httpAuth('/auth/signin', payload, options);
  console.log('login signin', JSON.stringify(response));
  dispatch(setCurrentUser(response?.data?.result?.user));
  console.log('login dispatch', JSON.stringify(response?.data?.result?.user));*/
};

export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});
