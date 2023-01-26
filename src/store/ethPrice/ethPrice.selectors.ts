import { createSelector } from 'reselect';

import { AppState } from '..';
import { EthPriceState } from './ethPrice.reducer';

export const selectEthPrice = createSelector<AppState, EthPriceState, number>(
  (state) => state.ethPriceModule,
  (ethPriceModule) => ethPriceModule.price,
);
