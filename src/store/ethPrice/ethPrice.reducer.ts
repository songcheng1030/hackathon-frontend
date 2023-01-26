import { Action, Reducer } from 'redux';
import { handleActions } from 'redux-actions';
import { ETH_PRICE } from '../action-types';

interface EthPriceAction extends Action {
  payload: {
    price: number
  }
}
export interface EthPriceState {
  price: number,
}

const initialState: EthPriceState = {
  price: 0,
};

export const ethPriceReducer: Reducer<EthPriceState, EthPriceAction> = handleActions(
  {
    [ETH_PRICE]: (state: EthPriceState, { payload: { price }}: EthPriceAction) => ({
      ...state,
      price: price
    })
  },
  initialState,
);


