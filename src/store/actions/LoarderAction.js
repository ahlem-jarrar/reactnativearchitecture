import * as types from './LoaderActionType';

export const getRequestPercent = (percentCompleted) => (dispatch) => {
  dispatch({
    type: types.GET_PERCENT,
    percentCompleted,
  });
};

export const showLoader = () => (dispatch) => {
  dispatch({
    type: types.SHOW_LOADER,
  });
};

export const hideLoader = () => (dispatch) => {
  dispatch({
    type: types.HIDE_LOADER,
  });
};
