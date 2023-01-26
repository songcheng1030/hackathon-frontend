import { IFiat, InitialData, ITransaction } from "./index";
import BigNumber from "bignumber.js";

export function serializeRecord(record: any): any {
  return {
    ...record,
    created: new Date(record.created),
    updated: new Date(record.updated),
  };
}

export function serializeTransaction(tx: any): ITransaction {
  return {
    ...serializeRecord(tx),
    amountToken: new BigNumber(tx.amountToken),
    amountCurrency: new BigNumber(tx.amountCurrency),
  };
}

export function serializeFiatOption(fiatOption: any): IFiat {
  return {
    ...fiatOption,
    fee: new BigNumber(fiatOption),
  };
}

export function serializeDataItem(key: keyof InitialData, data: any) {
  let serialized: any = {};
  let func: any = (data: any) => data;
  switch (key) {
    case "transactions":
      func = serializeTransaction;
      break;
    case "fiatOptions":
      func = serializeFiatOption;
      break;
    default:
      return data;
  }

  Object.entries(data).forEach(([key, item]) => (serialized[key] = func(item)));

  return serialized;
}

export function serializeData(rawData: any): Partial<InitialData> {
  let serialized: Partial<InitialData> = {};

  Object.entries(rawData).forEach(([key, data]: any) => {
    serialized[key as keyof InitialData] = serializeDataItem(key, data);
  });

  return serialized;
}
