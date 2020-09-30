import axios from 'axios';
import store from '../store';
import {loadErrors, clearError} from '../store/errors/actions';
import {isEmpty} from '../helpers/isEmpty';
import {TOAST_TYPE} from '../constants/constants';
import {isValidToken} from '../utils/isAuthenticated';
import {logOut} from '../features/login/actions';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';

export const httpClient = axios.create({
  baseURL: 'http://172.16.100.20/api/v1',
  timeout: 60000,
});

httpClient.interceptors.request.use((config) => {
  const currentLanguage = AsyncStorage.getItem('lang').toLowerCase() || 'en';
  const token = AsyncStorage.getItem('token');

  if (AsyncStorage.getItem('user') && token) {
    if (!isValidToken(token)) {
      Toast.show(
        TOAST_TYPE.WARNING,
        'You token has expired, you will be disconnected in 5 sec please login again !',
      );
      // logout user after 5 sec
      setTimeout(() => logOut(), 5000);
      return;
    }
    // add header for Authorization
    config.headers.Authorization = `Bearer ${token}`;
    // set language header
    config.headers['Accept-Language'] = config.headers['no-lang']
      ? '*'
      : currentLanguage;
    // delete no-lang header in case we used it
    if (config.headers['no-lang']) {
      delete config.headers['no-lang'];
    }

    config.headers['Content-Type'] = 'application/json';
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    const error = store.getState().error;
    // if any error, reset error state because it's a valid response
    if (!isEmpty(error.error)) {
      store.dispatch(clearError());
    }
    return response;
  },
  (error) => {
    // handle errors globaly
    if (!isEmpty(error)) {
      store.dispatch(
        loadErrors({
          error: error?.response?.data?.header?.message,
          code: error?.response?.data?.header?.code,
        }),
      );
      // display toast for any http error
      Toast.show(TOAST_TYPE.ERROR, error?.response?.data?.header?.message);
      return Promise.reject(error);
    }
  },
);
