import { createSelector } from 'reselect';

import { AppState } from '..';
import { AssetsState } from './assets.reducer';
import { GNftData, GOwnedNft } from '../../types';

export const selectAssets = createSelector<AppState, AssetsState, GNftData>(
  (state) => state.assetsModule,
  (assetsModule) => assetsModule.assets,
);

export const selectAssetById = createSelector<AppState, AssetsState, GOwnedNft>(
  (state) => state.assetsModule,
  (assetsModule) => assetsModule.asset,
);
