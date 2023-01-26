import { Action, Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { IUser } from '../../types';
import { USER_LOAD_ALL, USER_UPDATE } from '../action-types';

export interface UserState {
  users: IUser[],
}

interface UserAction extends Action {
  payload: {
    users: IUser[],
    updateUser: {
      user: IUser,
    },
  }
}

const initialState: UserState = {
  users: [],
}

export const userReducer: Reducer<UserState, UserAction> = handleActions(
  {
    [USER_LOAD_ALL]: (state: UserState, { payload: { users }}: UserAction) => ({
      ...state,
      users,
    }),
    // [USER_UPDATE]: (state: UserState, { payload: { updateUser }}: UserAction) => {
    //   return updateUser
    // }
  },
  initialState,
);
