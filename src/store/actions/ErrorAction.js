import * as types from './ErrorActionTypes';
/**
 * Action that will dispatch to show an error
 *
 * @param {string} error
 * @public
 */
export const loadErrors = (error) => ({
  type: types.RESPONSE_ERROR,
  error,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});
