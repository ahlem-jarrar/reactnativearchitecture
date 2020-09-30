import {SET_ERROR, CLEAR_ERROR} from './types';
/**
 * @param  {} {error
 * @param  {} code}
 * @param  {SET_ERROR} =>({type
 * @param  {} error
 * @param  {} code
 * @param  {} }
 */
export const loadErrors = ({error, code}) => ({
  type: SET_ERROR,
  error,
  code,
});
/**
 * @param  {CLEAR_ERROR} =>({type
 * @param  {} }
 */
export const clearError = () => ({
  type: CLEAR_ERROR,
});
