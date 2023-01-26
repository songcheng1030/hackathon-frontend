import BigNumber from "bignumber.js";
import {
  FEE_CURRENCY,
  FEE_FLAT,
  FEE_TOKEN,
  NETWORK_MAINNET,
  NETWORK_TESTNET,
  STATUS_ACTIVE,
  STATUS_CONNECTED,
  STATUS_CONNECTING,
  STATUS_ERROR,
  STATUS_INACTIVE,
  STATUS_LOADED,
  STATUS_LOADING,
  STATUS_NOT_CONNECTED,
  STATUS_PENDING_BLOCKCHAIN,
  STATUS_PENDING_WIRE,
  STATUS_SUCCESS,
  STATUS_UNVERIFIED,
  STATUS_VERIFICATION_DENIED,
  STATUS_VERIFIED,
  IDENTITY_INDIVIDUAL,
  IDENTITY_CORPORATE,
  IDENTITY_DAO,
  STATUS_PENDING_VERIFICATION,
  STATUS_WAITING,
  STATUS_UPLOADING,
} from "./constants";

export type FeeSource = typeof FEE_CURRENCY | typeof FEE_TOKEN;

export type InitialData = {
  senderAccounts: { [key: string]: Stored<ISenderAccount> };
  senderIdentities: { [key: string]: Stored<ISenderIdentity> };
  recipientIdentities: { [key: string]: Stored<IRecipientIdentity> };
  recipients: { [key: string]: Stored<IRecipient> };
  wallets: { [key: string]: Stored<IWallet> };
  transactions: { [key: string]: Stored<ITransaction> };
  fiatOptions: { [key: string]: IFiat };
  auth: AuthState;
  admin?: {
    senderAccounts: { [key: string]: Stored<ISenderAccount> };
    senderIdentities: { [key: string]: Stored<ISenderIdentity> };
    transactions: { [key: string]: Stored<ITransaction> };
  };
};

export type AuthState = {
  authenticated: boolean;
  address: string;
};

export type Stored<T> = T & {
  _id: string;
};

export type StatusResult = typeof STATUS_SUCCESS | typeof STATUS_ERROR;

export interface Response {
  status: StatusResult;
  data: any;
}

export interface ISenderAccount {
  displayName: string;
  status: ActivityStatus;
  created: Date;
  updated: Date;
  activated: boolean;
  activationTx: string;
  activationSignature: string;
  activationSignatureTimestamp?: string;
}

export interface IWallet {
  address: string;
  displayName: string;
  senderAccount: string;
  status: SenderWalletStatus;
  created: Date;
  updated: Date;
}

export interface IRecipient {
  senderAccount: string;
  obfcCode: string;
  displayName: string;
  status: ActivityStatus;
  created: Date;
  updated: Date;
  activated: boolean;
  activationTx: string;
  activationSignature: string;
  activationSignatureTimestamp?: string;
}

export interface IAddress {
  address1: string;
  address2: string;
  postalCode: string;
  city: string;
  district: string;
  country: string;
}

export interface ISenderIdentity {
  senderAccount: string;
  type: IdentityType;
  firstName: string;
  lastName: string;
  birthday: Date;
  address: IAddress;
  sendEnabled: boolean;
  status: VerificationStatus;
  identityDocuments: string[];
  verificator: string;
  verificationId: string;
  verificationCheckId?: string;
  verificationData?: IVerification;
  created: Date;
  updated: Date;
}

export interface IRecipientIdentity {
  fullName: string;
  address: IAddress;
  recipient: string;
  accountNumber: string;
  routingNumber: string;
  iban: string;
  swiftCode: string;
  referenceNumber?: string;
  receiveEnabled: boolean;
  status: VerificationStatus;
  bankName: string;
  bankAddress: IAddress;
  currency: string;
  created: Date;
  updated: Date;
}

export interface IVerification {
  appId: string;
  checkId: string;
  sdkToken: string;
  appData: any;
  checkData: any;
  isChecked: boolean;
  isApproved: boolean;
}

export interface ITransaction {
  senderAccount: string;
  senderWallet: string;
  recipient: string;
  txHash: string;
  amountToken: BigNumber;
  tokenAddress: string;
  amountCurrency: BigNumber;
  currency: string;
  amountFee: BigNumber;
  feeToken: string;
  status: TransactionStatus;
  created: Date;
  updated: Date;
  transmitter: string;
  transmitterTxId: string;
}

export interface IToken {
  address: string;
  symbol: string;
  name: string;
  icon: string;
}

export interface ITransmitterContact {
  externalId: string;
  transmitter: string;
  recipient: string;
}

export type FeeType = typeof FEE_FLAT;

export interface IFiat {
  name: string;
  symbol: string;
  icon: string;
  fee: BigNumber;
  feeType: FeeType;
}

export interface INetwork {
  name: string;
  networkToken: string;
  type: typeof NETWORK_MAINNET | typeof NETWORK_TESTNET;
  chainId: number;
  obfcAddress: string;
  tokens: string[];
}

export type UploadStatus =
  | typeof STATUS_WAITING
  | typeof STATUS_UPLOADING
  | typeof STATUS_SUCCESS
  | typeof STATUS_ERROR;

export type LoadingStatus = typeof STATUS_LOADING | typeof STATUS_LOADED;

export type ActivityStatus = typeof STATUS_ACTIVE | typeof STATUS_INACTIVE;

export type SenderWalletStatus =
  | typeof STATUS_ACTIVE
  | typeof STATUS_INACTIVE
  | typeof STATUS_PENDING_BLOCKCHAIN;

export type VerificationStatus =
  | typeof STATUS_VERIFIED
  | typeof STATUS_UNVERIFIED
  | typeof STATUS_PENDING_VERIFICATION
  | typeof STATUS_VERIFICATION_DENIED;

export type WalletStatus =
  | typeof STATUS_LOADING
  | typeof STATUS_CONNECTED
  | typeof STATUS_NOT_CONNECTED
  | typeof STATUS_CONNECTING;

export type TransactionStatus =
  | typeof STATUS_PENDING_BLOCKCHAIN
  | typeof STATUS_PENDING_WIRE
  | typeof STATUS_ERROR
  | typeof STATUS_SUCCESS;

export type IdentityType =
  | typeof IDENTITY_INDIVIDUAL
  | typeof IDENTITY_CORPORATE
  | typeof IDENTITY_DAO;

export type GetterKey<T> = keyof T;
export type Serializer<T> = (data: any) => Partial<T>;
export type ValueOf<T> = T[keyof T];
export type AnyObject = { [key: string]: any };

export * from './validator'
export * from './collector'
export * from './web3'
export * from './numeric'
export * from './init'
