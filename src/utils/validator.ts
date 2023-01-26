export type AccuityValidationType = "ABARTN" | "IBAN" | "BIC" | "ACCN";

// ABARTN: ABA Routing Number
// IBAN: International Bank Account Number
// BIC: Bank Information Code (Swift Code)
// ACCN: Account Number

export interface IAccuityIBANValidationRequest {
  token?: string;
  countryCode?: string;
  nationalId?: string;
  accountNumber: string;
  noBranch?: string;
  errorComment?: string;
};

export interface IAccuityAccountNumberValidationRequest {
};

export interface IAccuityValidationRequest {
  type: AccuityValidationType;
  data: any;
} ;