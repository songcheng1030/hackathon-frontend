import { createSelector } from 'reselect';

import { AppState } from '..';
import { RafflesState } from './raffles.reducer';
import { GRaffles, GOwnedNft } from '../../types';

export const selectRaffles = createSelector<AppState, RafflesState, GRaffles[]>(
  (state) => state.rafflesModule,
  (rafflesModule) => rafflesModule.raffles,
);


export const selectRaffleById = createSelector<AppState, RafflesState, GRaffles>(
  (state) => state.rafflesModule,
  (rafflesModule) => rafflesModule.raffle,
);

export const selectNftByTokenId = createSelector<AppState, RafflesState, GOwnedNft>(
  (state) => state.rafflesModule,
  (rafflesModule) => rafflesModule.nft,
);
