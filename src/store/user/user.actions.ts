import { Dispatch } from 'redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { USER_LOAD_ALL, USER_UPDATE } from '../action-types';
import errorHandler from '../error-handler';
import { userService } from '../../services';
import { IUser } from '../../types';

const setLocalStorageForAUth = (user: IUser) => {
    localStorage.setItem('user_id', user._id);
    localStorage.setItem('avatar', user.avatar);
    localStorage.setItem('name', user.name);
    localStorage.setItem('bio', user.bio);
    localStorage.setItem('account', user.account);
    localStorage.setItem('created', String(user.created));
    localStorage.setItem('updated', String(user.updated));
  }

  
export const getUsers = () => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoading());
        const users = await userService.getAll();
        dispatch(hideLoading());

        dispatch({
            type: USER_LOAD_ALL,
            payload: {
                users
            },
        });
    } catch (error: any) {
        dispatch(hideLoading());
        errorHandler(error, USER_LOAD_ALL)
    }
}

export const updateUser = (address: string, payload: IUser) => async (dispatch: Dispatch) => {
    try {
        dispatch(showLoading());
        const res = await userService.updateUser(address, payload);
        dispatch(hideLoading());
        localStorage.clear();
        setLocalStorageForAUth(res);
        dispatch({
            type: USER_UPDATE,
            payload: {
                updateUser: {
                    user: res
                }
            },
        });
    } catch (error: any) {
        dispatch(hideLoading());
        errorHandler(error, USER_UPDATE)
    }
}
