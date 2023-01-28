import { Dispatch } from '@reduxjs/toolkit';
import { uiActions } from 'src/store/ui/slice';

export const cleanNotification = () => (dispatch: Dispatch) => {
  return dispatch(uiActions.clearNotification());
};
