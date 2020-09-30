import {httpClient} from './httpClient';
//import {addUserToLocalStorage} from '../utils/security';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * @description get all records of given domain
 * @param domain
 * @returns {AxiosPromise<any>}
 */
export const getAll = (domain, payload, options) => {
  return httpClient.get(domain, payload, options);
};
/**
 * Updates a record in a domain
 * @param domain
 * @param payload
 * @returns {AxiosPromise<any> | IDBRequest<IDBValidKey> | Promise<void> | void}
 */
export const edit = (domain, payload, options) => {
  return httpClient.patch(domain, payload, options);
};

/**
 * Updates a record in a domain
 * @param domain
 * @param payload
 * @returns {AxiosPromise<any> | IDBRequest<IDBValidKey> | Promise<void> | void}
 */
export const editPut = (domain, payload) => {
  return httpClient.put(domain, payload);
};
/**
 * Adds a record to a domain
 * @param domain
 * @param payload
 * @returns {*}
 */
export const add = (domain, payload, options) => {
  return httpClient.post(domain, payload, options);
};
/**
 * Removes a record from a domain
 * @param domain
 * @param payload
 * @returns {*}
 */
export const remove = (domain, payload) => {
  return httpClient.delete(domain, payload);
};

export const httpAuth = (domain, payload, options) => {
  return httpClient
    .post(domain, payload, options)
    .then((response) => {
      console.log('http response', JSON.stringify(response));
      if (response?.data?.result?.token) {
        //addUserToLocalStorage(response?.data?.result?.user);
        AsyncStorage.setItem('token', response?.data?.result?.token);
      }
      return Promise.resolve(response);
    })
    .catch((error) => {
      console.log('http error', JSON.stringify(error));

      return Promise.reject(error);
    });
};
