const DEV_API_URL = 'http://localhost:3000';
const DEV_APP_URL = 'http://localhost:3001';
const DEV_LANDING_URL = 'http://localhost:3002';

const PROD_API_URL = 'https://api.desobi.org';
const PROD_APP_URL = 'https://app.desobi.org';
const PROD_LANDING_URL = 'https://desobi.org';

const urls = {
  api: {
    development: DEV_API_URL,
    production: PROD_API_URL,
  },
  app: {
    development: DEV_APP_URL,
    production: PROD_APP_URL,
  },
  landing: {
    development: DEV_LANDING_URL,
    production: PROD_LANDING_URL,
  },
};

type Stage = 'production' | 'development';

const stage = (process.env.NODE_ENV as Stage) || 'development';

export const API_URL = urls.api[stage];
export const APP_URL = urls.app[stage];
export const LANDING_PAGE_URL = urls.landing[stage];

export const APP_NAME = 'Goobig';
export const DEFAULT_MAX_TIMESTAMP_AGE = 30000;

export const MAX_NUM =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const STATUS_UNVERIFIED = 'STATUS_UNVERIFIED';
export const STATUS_PENDING_VERIFICATION = 'STATUS_PENDING_VERIFICATION';
export const STATUS_VERIFIED = 'STATUS_VERIFIED';
export const STATUS_VERIFICATION_DENIED = 'STATUS_VERIFICATION_DENIED';
export const STATUS_ACTIVE = 'STATUS_ACTIVE';
export const STATUS_INACTIVE = 'STATUS_INACTIVE';
export const STATUS_PENDING_BLOCKCHAIN = 'STATUS_PENDING_BLOCKCHAIN';
export const STATUS_PENDING_WIRE = 'STATUS_PENDING_WIRE';
export const STATUS_SUCCESS = 'STATUS_SUCCESS';
export const STATUS_ERROR = 'STATUS_ERROR';
export const STATUS_LOADING = 'STATUS_LOADING';
export const STATUS_LOADED = 'STATUS_LOADED';
export const STATUS_CONNECTING = 'STATUS_CONNECTING';
export const STATUS_NOT_CONNECTED = 'STATUS_NOT_CONNECTED';
export const STATUS_CONNECTED = 'STATUS_CONNECTED';
export const STATUS_UPLOADING = 'STATUS_UPLOADING';
export const STATUS_WAITING = 'STATUS_WAITING';
export const FEE_FLAT = 'FEE_FLAT';
export const FEE_TOKEN = 'FEE_TOKEN';
export const FEE_CURRENCY = 'FEE_CURRENCY';

export const IDENTITY_INDIVIDUAL = 'IDENTITY_INDIVIDUAL';
export const IDENTITY_CORPORATE = 'IDENTITY_CORPORATE';
export const IDENTITY_DAO = 'IDENTITY_DAO';

export const MAX_OBFC_DIGITS = 10;

export const SUPPORTED_NETWORKS = {
  42: 'kovan',
  56: 'binance',
  137: 'polygon',
  1: 'main',
};

export const NETWORK_TESTNET = 'NETWORK_TESTNET';
export const NETWORK_MAINNET = 'NETWORK_MAINNET';

export const NETWORKS = {
  // 56: {
  //   name: 'Binance Smart Chain',
  //   type: NETWORK_MAINNET,
  //   networkToken: 'BNB',
  //   chainId: 56,
  //   obfcAddress: '0x690a2aE820B97C23C3828961c33316112570Bf22',
  //   tokens: ['0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'],
  // },
  1: {
    name: 'Ethereum',
    type: NETWORK_MAINNET,
    networkToken: 'ETH',
    chainId: 1,
    obfcAddress: '0x75430bdb76aa537b4587859ed6ce6348cfbcfe28',
    tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
  },
  4: {
    name: 'Ethereum',
    type: NETWORK_MAINNET,
    networkToken: 'ETH',
    chainId: 4,
    obfcAddress: '0x75430bdb76aa537b4587859ed6ce6348cfbcfe28',
    tokens: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
  },
};

export const PREF_PREFIX = `Goobig-PREF-`;

export const PREF = {
  CONNECTED_PREVIOUSLY: 'CONNECTED_PREVIOUSLY',
};

export const events = {
  updated: 'updated',
  deleted: 'deleted',
  connect: 'connect',
  init: 'init',
  ready: 'ready',
};

export const actions = {
  create: 'create',
  retrieve: 'retrieve',
  update: 'update',
  delete: 'delete',
  addRecipient: 'addRecipient',
  addVerification: 'addVerificatin',
  getVerification: 'getVerificatin',
  checkVerification: 'checkVerificatin',
  checkValidation: 'checkValidation',
  getExchangeRates: 'getExchangeRates',
};

export const adminActions = {
  ...actions,
  approveAccount: 'approveAccount',
  rejectAccount: 'rejectAccount',
  addRecipient: 'addRecipient',
};
