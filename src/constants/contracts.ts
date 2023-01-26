import RaffleMarketPlace from './ABI/RaffleMarketPlace.json';
import { envVars } from './env';
export const RAFFLEMARKETPLACE_ADDRESS = envVars.RAFFLEMARKETPLACE_ADDRESS;

export const ETHCOIN_DECIMALS = 18;
export const DIYTOKEN_DECIMALS = 18;
export const PEDINGDATE = 7;

export type Asset = 'ETH' | 'DIY';

export const ASSET_LIST: {
  [key in Asset]: {
    address: string;
    abi: any;
    decimals: number;
  };
} = {
  DIY: {
    abi: RaffleMarketPlace,
    address: RAFFLEMARKETPLACE_ADDRESS,
    decimals: DIYTOKEN_DECIMALS,
  },
  ETH: {
    abi: null,
    address: '',
    decimals: ETHCOIN_DECIMALS,
  },
};
