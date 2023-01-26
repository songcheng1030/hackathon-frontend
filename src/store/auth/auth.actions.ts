import { Dispatch } from 'redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { AUTH_LOGIN, AUTH_LOGOUT } from '../action-types';
import errorHandler from '../error-handler';
import { authService, userService } from '../../services';
import { IUser } from '../../types';
import { showNotification } from "../../utils/helpers";
import { USER_UPDATE } from '../action-types';

const setLocalStorageForAUth = (user: IUser) => {
  localStorage.setItem('user_id', user._id);
  localStorage.setItem('avatar', user.avatar);
  localStorage.setItem('name', user.name);
  localStorage.setItem('bio', user.bio);
  localStorage.setItem('account', user.account);
  localStorage.setItem('created', String(user.created));
  localStorage.setItem('updated', String(user.updated));
}

export const login = (address: string) => async (dispatch: Dispatch) => {
  try {
    localStorage.clear();
    dispatch(showLoading());
    const user = await authService.login(address);
    setLocalStorageForAUth(user);
    showNotification('Success Login', 'success');
    window.location.href = '/buy/raffles';
    dispatch(hideLoading());  

  } catch (error: any) {
    dispatch(hideLoading());
    showNotification('Login Error.', 'error');
    errorHandler(error, AUTH_LOGIN)
  }
}

export const logout = (dispatch: Dispatch) => {
    localStorage.clear();

    dispatch({ type: AUTH_LOGOUT })
};

export const updateUser = (address: string, payload: IUser) => async (dispatch: Dispatch) => {
  try {
    dispatch(showLoading());
    const user = await userService.updateUser(address, payload);
    localStorage.clear();
    setLocalStorageForAUth(user);
    showNotification('Success Profile Update', 'success');
    // window.location.href = '/buy/raffles';
    dispatch(hideLoading());  
    dispatch({
      type: USER_UPDATE,
      payload: {
          user: user
      },
    });
  } catch (error: any) {
    dispatch(hideLoading());
    showNotification('Login Error.', 'error');
    errorHandler(error, AUTH_LOGIN)
  }
}


