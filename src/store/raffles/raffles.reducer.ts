import { Action, Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { GRaffles, GOwnedNft } from '../../types';
import { RAFFLES_GET_ALL, RAFFLES_GET_BY_ID, NFT_GET_BY_ID } from '../action-types';
import { ASSET, RAFFLE} from '../../utils'
export interface RafflesState {
  raffles: GRaffles[],
  raffle: GRaffles,
  nft: GOwnedNft
}

export interface RafflesByIdState {
  raffles: GRaffles,
}

interface RafflesAction extends Action {
  payload: {
    raffles: GRaffles[],
    raffle: GRaffles,
    nft: GOwnedNft
  }
}

const initialState: RafflesState = {
  raffles: [],
  raffle: RAFFLE,
  nft: ASSET
}

export const rafflesReducer: Reducer<RafflesState, RafflesAction> = handleActions(
  {
    [RAFFLES_GET_ALL]: (state: RafflesState, { payload: { raffles }}: RafflesAction) => ({
      ...state,
      raffles
    }),

    [RAFFLES_GET_BY_ID]: (state: RafflesState, { payload: { raffle }}: RafflesAction) => ({
      ...state,
      raffle
    }),

    [NFT_GET_BY_ID]: (state: RafflesState, { payload: { nft }}: RafflesAction) => ({
      ...state,
      nft
    })
  },

  initialState,
);


