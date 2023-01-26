export type CollectorDataType = "LIVERATES_EXCHANGE_RATES";

export interface ILiveRatesExchangeRatesRequest {
  from: string;
  to: string;
};

export interface ICollectorDataRequest {
  type: CollectorDataType;
  data: any;
} ;