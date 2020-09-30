import jwtDecode from 'jwt-decode';
import moment from 'moment';
import {AsyncStorage} from 'react-native';

export const getToken = () => {
  return AsyncStorage.getItem('token');
};

const decode = (token) => jwtDecode(token);

const getExipirationDate = (token) => moment.unix(decode(token).exp);

export const isValidToken = (token) =>
  moment().isBefore(getExipirationDate(token));

export const isAuthenticated = () => {
  const token = getToken();
  // console.log('getExipirationDate(token)====>', getExipirationDate(token))
  return !!(token && isValidToken(token));
};
