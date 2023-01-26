import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from "redux";
import { loadingBarReducer } from 'react-redux-loading-bar'

import { authReducer } from "./auth/auth.reducer";
import { userReducer } from "./user/user.reducer";
import { assetsReducer } from "./assets/assets.reducer";
import { rafflesReducer } from "./raffles/raffles.reducer";
import { ethPriceReducer } from "./ethPrice/ethPrice.reducer";

const rootReducer = combineReducers({
  loadingBar: loadingBarReducer,
  authModule: authReducer,
  userModule: userReducer,
  assetsModule: assetsReducer,
  rafflesModule: rafflesReducer,
  ethPriceModule: ethPriceReducer
});

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
  )
);

export default store;
