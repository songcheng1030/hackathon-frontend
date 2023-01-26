import { Action, Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { IUser } from '../../types';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ME, USER_UPDATE } from '../action-types';
export interface AuthState {
  user: IUser,
  loggedIn: boolean,
  elapsedTime: number,
}

interface AuthAction extends Action {
  payload: {
    user: IUser,
    loggedIn: boolean,
    elapsedTime: number
  }
}

const initialState: AuthState = {
  user: {
    _id: localStorage.getItem('user_id') || '',
    name: localStorage.getItem('name') || '',
    avatar: localStorage.getItem('avatar') || '',
    bio: localStorage.getItem('bio') || '',
    account: localStorage.getItem('account') || '',
    created: localStorage.getItem('created') || '',
  },
  loggedIn: localStorage.getItem('user_id') ? true : false,
  elapsedTime: 0,
}

export const authReducer: Reducer<AuthState, AuthAction> = handleActions(
  {
    [AUTH_LOGIN]: (state: AuthState, { payload: { user }}: AuthAction) => ({
      ...state,
      user,
      loggedIn: true
    }),

    [USER_UPDATE]: (state: AuthState, { payload: { user }}: AuthAction) => ({
      ...state,
      user
    }),
  
    [AUTH_LOGOUT]: () => ({
      user: {
        _id: '',
        name: '',
        avatar: '',
        bio: '',
        account: '',
        created: ''
      },
      loggedIn: false,
      elapsedTime: 0,
    }),
   
    [AUTH_ME]: (state: AuthState, { payload: { user }}: AuthAction) => ({
      ...state
    }),
  },
  initialState,
);
