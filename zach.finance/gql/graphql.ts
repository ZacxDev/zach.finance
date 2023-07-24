/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddressBalance = {
  __typename?: 'AddressBalance';
  address: Scalars['String'];
  balance: Scalars['Float'];
};

export type AddressData = {
  __typename?: 'AddressData';
  City: Scalars['String'];
  Country: Scalars['String'];
  State: Scalars['String'];
  Street: Scalars['String'];
  ZIP: Scalars['String'];
};

export type Asset = {
  __typename?: 'Asset';
  businessModelScore: QualitativeValue;
  changePercent: Scalars['Float'];
  competitiveAdvantageScore: QualitativeValue;
  currentPrice: Scalars['Float'];
  debtToEquityRatio: Scalars['Float'];
  dividendYield: Scalars['Float'];
  earningsYield: Scalars['Float'];
  eps: Scalars['Float'];
  freeCashFlowYield: Scalars['Float'];
  growthProspectsScore: QualitativeValue;
  historicalEarnings: Array<Earnings>;
  historicalPrices: Array<HistoricalPrice>;
  lastDividendDate: Scalars['Int'];
  managementQualityScore: QualitativeValue;
  marketCap: Scalars['Float'];
  name: Scalars['String'];
  operatingMargin: Scalars['Float'];
  pbRatio: Scalars['Float'];
  peRatio: Scalars['Float'];
  pegRatio: Scalars['Float'];
  riskScore: QualitativeValue;
  risks: Array<Risk>;
  roe: Scalars['Float'];
  ticker: Scalars['String'];
  trailingPERatio: Scalars['Float'];
  valuationScore: QualitativeValue;
};


export type AssetHistoricalPricesArgs = {
  from: Scalars['Int'];
  to: Scalars['Int'];
};

export type AssetQuote = {
  __typename?: 'AssetQuote';
  close: Scalars['Float'];
  ticker: Scalars['String'];
};

export type AuditLink = {
  __typename?: 'AuditLink';
  auditor: Scalars['String'];
  date: Scalars['Int'];
  url: Scalars['String'];
};

export enum Benchmark {
  Btc = 'BTC',
  Cmc = 'CMC',
  Spy = 'SPY'
}

export type Country = {
  __typename?: 'Country';
  assets: Scalars['Float'];
  country: Scalars['String'];
};

export type CreatePortfolioInput = {
  name: Scalars['String'];
  positions: Array<PositionInput>;
};

export type CryptoAsset = {
  __typename?: 'CryptoAsset';
  addressWithMoreThenOnePercentOfCirculatingSupply: Array<AddressBalance>;
  auditLinks: Array<AuditLink>;
  circulatingSupply: Scalars['Int'];
  contractAddress: Scalars['String'];
  createdAt: Scalars['Int'];
  currentBeta: Scalars['Float'];
  description: Scalars['String'];
  historicalBeta: Array<ValueAtTime>;
  historicalPrices: Array<HistoricalPrice>;
  historicalSharpeRatio: Array<ValueAtTime>;
  historicalVolume: Array<HistoricalVolume>;
  marketCap: Scalars['Int'];
  name: Scalars['String'];
  priceCorrelation: PriceCorrelation;
  sharpeRatio: Scalars['Float'];
  symbol: Scalars['String'];
  totalSupply: Scalars['Int'];
  valueAtRisk: Scalars['Float'];
  volatility: Volatility;
  website?: Maybe<Scalars['String']>;
};


export type CryptoAssetCurrentBetaArgs = {
  benchmark: Benchmark;
};


export type CryptoAssetHistoricalBetaArgs = {
  benchmark: Benchmark;
  end: Scalars['Int'];
  period?: InputMaybe<TimePeriod>;
  start: Scalars['Int'];
};


export type CryptoAssetHistoricalPricesArgs = {
  from: Scalars['Int'];
  period: TimePeriod;
  to: Scalars['Int'];
};


export type CryptoAssetHistoricalSharpeRatioArgs = {
  end: Scalars['Int'];
  period?: InputMaybe<TimePeriod>;
  start: Scalars['Int'];
};


export type CryptoAssetHistoricalVolumeArgs = {
  from: Scalars['Int'];
  period: TimePeriod;
  to: Scalars['Int'];
};


export type CryptoAssetPriceCorrelationArgs = {
  compare: PriceCorrelationComparisonTarget;
  from: Scalars['Int'];
  to: Scalars['Int'];
};


export type CryptoAssetSharpeRatioArgs = {
  period: SupportedPeriod;
};


export type CryptoAssetValueAtRiskArgs = {
  confidenceInterval: Scalars['Int'];
  end: Scalars['Int'];
  period: TimePeriod;
  start: Scalars['Int'];
};


export type CryptoAssetVolatilityArgs = {
  end: Scalars['Int'];
  period: TimePeriod;
  start: Scalars['Int'];
};

export type CryptoAssetAmount = {
  __typename?: 'CryptoAssetAmount';
  amount: Scalars['Float'];
  cryptoAsset: CryptoAsset;
};

export type DeFiInstrument = {
  __typename?: 'DeFiInstrument';
  apyBasisPoints: Scalars['Int'];
  contractAddress: Scalars['String'];
  depositTokens: Array<DepositToken>;
  expiresAt: Scalars['Int'];
  fees: Array<Fee>;
  hedgepieLabel: Scalars['String'];
  label: Scalars['String'];
  protocol: Scalars['String'];
  rewardTokens: Array<CryptoAsset>;
  totalAmountsLocked: Array<CryptoAssetAmount>;
  totalValueLockedUsd: Scalars['Int'];
  type: DeFiType;
  yieldSources: Array<YieldSource>;
};

export enum DeFiType {
  Farm = 'FARM',
  LendingPosition = 'LENDING_POSITION',
  LiquidityPool = 'LIQUIDITY_POOL',
  Vault = 'VAULT'
}

export type DepositToken = {
  __typename?: 'DepositToken';
  cryptoAsset: CryptoAsset;
  weight: Scalars['Float'];
};

export type EodhdetfData = {
  __typename?: 'EODHDETFData';
  ETFData: EtfData;
  ETFGeneral: EtfGeneral;
  ETFTechnicals: Technicals;
};

export type EtfData = {
  __typename?: 'ETFData';
  annualHoldingsTurnover: Scalars['String'];
  companyName: Scalars['String'];
  companyUrl: Scalars['String'];
  domicile: Scalars['String'];
  etfUrl: Scalars['String'];
  holdings: Array<HoldingEntry>;
  inceptionDate: Scalars['String'];
  indexName?: Maybe<Scalars['String']>;
  isin: Scalars['String'];
  marketCapitalisation: MarketCapitalisation;
  netExpenseRatio: Scalars['String'];
  sectorWeights: SectorWeights;
  top10Holdings: Array<HoldingEntry>;
  totalAssets: Scalars['String'];
  yield: Scalars['String'];
};

export type EtfGeneral = {
  __typename?: 'ETFGeneral';
  category: Scalars['String'];
  code: Scalars['String'];
  countryISO: Scalars['String'];
  countryName: Scalars['String'];
  currencyCode: Scalars['String'];
  currencyName: Scalars['String'];
  currencySymbol: Scalars['String'];
  description: Scalars['String'];
  exchange: Scalars['String'];
  name: Scalars['String'];
  openFigi: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Earnings = {
  __typename?: 'Earnings';
  epsActual: Scalars['Float'];
  epsEstimate: Scalars['Float'];
  quarter: Scalars['Int'];
};

export type Fee = {
  __typename?: 'Fee';
  basisPoints: Scalars['Int'];
  trigger: FeeTriggerType;
};

export enum FeeTriggerType {
  Deposit = 'DEPOSIT',
  Performance = 'PERFORMANCE',
  Withdraw = 'WITHDRAW'
}

export type HedgepieAdapter = {
  __typename?: 'HedgepieAdapter';
  StakingToken: CryptoAsset;
  Status: Scalars['Boolean'];
  address: Scalars['String'];
  apyBasisPoints: Scalars['Int'];
  name: Scalars['String'];
};

export type Highlights = {
  __typename?: 'Highlights';
  DividendYield: Scalars['Float'];
  DividendYieldGroup: Scalars['String'];
  EarningsPerShare: Scalars['Float'];
  MarketCapGroup: Scalars['String'];
  MarketCapitalization: Scalars['Int'];
  MostRecentQuarter: Scalars['String'];
  PEGRatio: Scalars['Float'];
  PERatio: Scalars['Float'];
  PayingDividends: Scalars['Boolean'];
  StockBuyback: Scalars['String'];
};

export type HistoricalPrice = {
  __typename?: 'HistoricalPrice';
  close: Scalars['Float'];
  date: Scalars['String'];
  high?: Maybe<Scalars['Float']>;
  low?: Maybe<Scalars['Float']>;
  open?: Maybe<Scalars['Float']>;
  volume?: Maybe<Scalars['Int']>;
};

export type HistoricalVolume = {
  __typename?: 'HistoricalVolume';
  date: Scalars['Int'];
  value: Scalars['Int'];
};

export type Holding = {
  __typename?: 'Holding';
  assetsPercent: Scalars['Float'];
  code: Scalars['String'];
  country: Scalars['String'];
  exchange: Scalars['String'];
  industry: Scalars['String'];
  name: Scalars['String'];
  region: Scalars['String'];
  sector: Scalars['String'];
};

export type HoldingEntry = {
  __typename?: 'HoldingEntry';
  holding: Holding;
  ticker: Scalars['String'];
};

export type Industry = {
  __typename?: 'Industry';
  assets: Scalars['Float'];
  industry: Scalars['String'];
};

export type MarketCapitalisation = {
  __typename?: 'MarketCapitalisation';
  big: Scalars['String'];
  medium: Scalars['String'];
  mega: Scalars['String'];
  micro: Scalars['String'];
  small: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPortfolio: Scalars['Boolean'];
  setSession: Scalars['Boolean'];
  signin: Scalars['Boolean'];
  signout: Scalars['Boolean'];
  updatePortfolio: Scalars['Boolean'];
};


export type MutationCreatePortfolioArgs = {
  createPortfolioInput: CreatePortfolioInput;
};


export type MutationSetSessionArgs = {
  session: SessionInput;
};


export type MutationSigninArgs = {
  idToken: Scalars['String'];
};


export type MutationUpdatePortfolioArgs = {
  updatePortfolioInput: UpdatePortfolioInput;
};

export type Portfolio = {
  __typename?: 'Portfolio';
  name: Scalars['String'];
  positions: Array<Position>;
  uid: Scalars['String'];
};

export type Position = {
  __typename?: 'Position';
  purchases: Array<Purchase>;
  ticker: Scalars['String'];
};

export type PositionInput = {
  purchases: Array<PurchaseInput>;
  ticker: Scalars['String'];
};

export type PriceCorrelation = {
  __typename?: 'PriceCorrelation';
  correlatedTokenContractAddress: Scalars['String'];
  correlationValue: Scalars['Float'];
};

export type PriceCorrelationComparisonTarget = {
  benchmark?: InputMaybe<Benchmark>;
  contractAddress?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
};

export type Purchase = {
  __typename?: 'Purchase';
  pricePerShare: Scalars['Int'];
  shareAmount: Scalars['Int'];
  timestamp: Scalars['Int'];
};

export type PurchaseInput = {
  pricePerShare: Scalars['Int'];
  shareAmount: Scalars['Int'];
  timestamp: Scalars['Int'];
};

export enum QualitativeValue {
  Fair = 'FAIR',
  Good = 'GOOD',
  High = 'HIGH',
  Low = 'LOW',
  Moderate = 'MODERATE',
  Poor = 'POOR',
  Strong = 'STRONG'
}

export type Query = {
  __typename?: 'Query';
  getAdapterList: Array<HedgepieAdapter>;
  getAssets: Array<Asset>;
  getCryptoAssets?: Maybe<Array<Maybe<CryptoAsset>>>;
  getDeFiInstruments: Array<DeFiInstrument>;
  getETF: EodhdetfData;
  getPortfolios: Array<Portfolio>;
  getQuotes: Array<AssetQuote>;
  getSession: Session;
  getStock: Stock;
  getVolatility: Array<Volatility>;
  search: Array<SearchResult>;
};


export type QueryGetAssetsArgs = {
  tickers: Array<Scalars['String']>;
};


export type QueryGetCryptoAssetsArgs = {
  contractAddresses: Array<Scalars['String']>;
  symbols: Array<Scalars['String']>;
};


export type QueryGetDeFiInstrumentsArgs = {
  contractAddresses: Array<Scalars['String']>;
};


export type QueryGetEtfArgs = {
  ticker: Scalars['String'];
};


export type QueryGetQuotesArgs = {
  tickers: Array<Scalars['String']>;
};


export type QueryGetStockArgs = {
  ticker: Scalars['String'];
};


export type QueryGetVolatilityArgs = {
  end: Scalars['Int'];
  interval: Scalars['String'];
  start: Scalars['Int'];
  tickers: Array<Scalars['String']>;
};


export type QuerySearchArgs = {
  text: Scalars['String'];
};

export type Risk = {
  __typename?: 'Risk';
  parameter: RiskParameter;
  value: Scalars['Float'];
};

export enum RiskParameter {
  CommodityRisk = 'COMMODITY_RISK',
  CountryRisk = 'COUNTRY_RISK',
  CurrencyRisk = 'CURRENCY_RISK',
  InterestRateRisk = 'INTEREST_RATE_RISK',
  LiquidityRisk = 'LIQUIDITY_RISK',
  PoliticalRisk = 'POLITICAL_RISK',
  SystemicRisk = 'SYSTEMIC_RISK',
  VolatilityRisk = 'VOLATILITY_RISK'
}

export type SearchResult = {
  __typename?: 'SearchResult';
  Code: Scalars['String'];
  Country: Scalars['String'];
  Currency: Scalars['String'];
  Exchange: Scalars['String'];
  ISIN: Scalars['String'];
  Name: Scalars['String'];
  PreviousClose: Scalars['Float'];
  PreviousCloseDate: Scalars['String'];
  Type: Scalars['String'];
};

export type Sector = {
  __typename?: 'Sector';
  equityPercent: Scalars['String'];
  relativeToCategory: Scalars['String'];
};

export type SectorWeights = {
  __typename?: 'SectorWeights';
  basicMaterials: Sector;
  communicationServices: Sector;
  consumerCyclicals: Sector;
  consumerDefensive: Sector;
  energy: Sector;
  financialServices: Sector;
  healthcare: Sector;
  industrials: Sector;
  realEstate: Sector;
  technology: Sector;
  utilities: Sector;
};

export type Session = {
  __typename?: 'Session';
  endDate: Scalars['Int'];
  ownerUid: Scalars['String'];
  startDate: Scalars['Int'];
  uid: Scalars['String'];
};

export type SessionInput = {
  endDate: Scalars['Int'];
  startDate: Scalars['Int'];
};

export type SharesStats = {
  __typename?: 'SharesStats';
  PercentInsiders: Scalars['Float'];
  PercentInstitutions: Scalars['Float'];
  SharesFloat: Scalars['Int'];
  SharesOutstanding: Scalars['Int'];
};

export type SplitsDividends = {
  __typename?: 'SplitsDividends';
  DividendDate: Scalars['String'];
  ExDividendDate: Scalars['String'];
  ForwardAnnualDividendRate: Scalars['Float'];
  ForwardAnnualDividendYield: Scalars['Float'];
  LastSplitDate: Scalars['String'];
  LastSplitFactor: Scalars['String'];
  PayoutRatio: Scalars['Float'];
};

export type Stock = {
  __typename?: 'Stock';
  General: StockGeneral;
  Highlights: Highlights;
  Valuation: Valuation;
};

export type StockGeneral = {
  __typename?: 'StockGeneral';
  Address: Scalars['String'];
  AddressData: AddressData;
  CIK: Scalars['String'];
  CUSIP: Scalars['String'];
  Code: Scalars['String'];
  CountryISO: Scalars['String'];
  CountryName: Scalars['String'];
  CurrencyCode: Scalars['String'];
  CurrencyName: Scalars['String'];
  CurrencySymbol: Scalars['String'];
  Description: Scalars['String'];
  EmployerIdNumber: Scalars['String'];
  Exchange: Scalars['String'];
  FiscalYearEnd: Scalars['String'];
  FullTimeEmployees: Scalars['Int'];
  IPODate: Scalars['String'];
  ISIN: Scalars['String'];
  Industry: Scalars['String'];
  LogoURL: Scalars['String'];
  Name: Scalars['String'];
  Phone: Scalars['String'];
  Sector: Scalars['String'];
  Type: Scalars['String'];
  UpdatedAt: Scalars['String'];
  WebURL: Scalars['String'];
};

export enum SupportedPeriod {
  FiveYears = 'FIVE_YEARS',
  OneMonth = 'ONE_MONTH',
  OneYear = 'ONE_YEAR',
  SixMonths = 'SIX_MONTHS',
  TenYears = 'TEN_YEARS',
  ThreeMonths = 'THREE_MONTHS',
  ThreeYears = 'THREE_YEARS'
}

export type Technicals = {
  __typename?: 'Technicals';
  beta: Scalars['Float'];
  day50MA: Scalars['Float'];
  day200MA: Scalars['Float'];
  week52High: Scalars['Float'];
  week52Low: Scalars['Float'];
};

export enum TimePeriod {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

export type UpdatePortfolioInput = {
  name: Scalars['String'];
  positions: Array<PositionInput>;
  uid: Scalars['String'];
};

export type Valuation = {
  __typename?: 'Valuation';
  ForwardPE: Scalars['Float'];
  PriceBookMRQ: Scalars['Float'];
  PriceSalesTTM: Scalars['Float'];
  TrailingPE: Scalars['Float'];
};

export type ValueAtTime = {
  __typename?: 'ValueAtTime';
  timestamp: Scalars['Int'];
  value: Scalars['Float'];
};

export type Volatility = {
  __typename?: 'Volatility';
  standardDeviation: Scalars['Float'];
  ticker: Scalars['String'];
  volatilityByInterval: Array<VolatilityForInterval>;
};

export type VolatilityForInterval = {
  __typename?: 'VolatilityForInterval';
  endTimestamp: Scalars['Int'];
  startTimestamp: Scalars['Int'];
  value: Scalars['Float'];
};

export enum YieldSource {
  Inflation = 'INFLATION',
  Interest = 'INTEREST',
  SwapFees = 'SWAP_FEES'
}

export type GetAssetsQueryVariables = Exact<{
  tickers: Array<Scalars['String']> | Scalars['String'];
  fromDate: Scalars['Int'];
  toDate: Scalars['Int'];
}>;


export type GetAssetsQuery = { __typename?: 'Query', getAssets: Array<{ __typename?: 'Asset', ticker: string, name: string, trailingPERatio: number, pbRatio: number, roe: number, debtToEquityRatio: number, operatingMargin: number, earningsYield: number, freeCashFlowYield: number, marketCap: number, currentPrice: number, dividendYield: number, lastDividendDate: number, historicalPrices: Array<{ __typename?: 'HistoricalPrice', date: string, close: number }> }> };

export type GetEtfQueryVariables = Exact<{
  ticker: Scalars['String'];
}>;


export type GetEtfQuery = { __typename?: 'Query', getETF: { __typename?: 'EODHDETFData', ETFGeneral: { __typename?: 'ETFGeneral', name: string, type: string, exchange: string, currencyCode: string }, ETFData: { __typename?: 'ETFData', netExpenseRatio: string, yield: string, top10Holdings: Array<{ __typename?: 'HoldingEntry', holding: { __typename?: 'Holding', name: string, code: string, assetsPercent: number } }>, holdings: Array<{ __typename?: 'HoldingEntry', holding: { __typename?: 'Holding', name: string, code: string, assetsPercent: number } }> } } };

export type GetStockQueryVariables = Exact<{
  ticker: Scalars['String'];
}>;


export type GetStockQuery = { __typename?: 'Query', getStock: { __typename?: 'Stock', General: { __typename?: 'StockGeneral', Code: string, Type: string, Name: string, Exchange: string, CurrencyCode: string }, Highlights: { __typename?: 'Highlights', MarketCapitalization: number, DividendYield: number }, Valuation: { __typename?: 'Valuation', ForwardPE: number, TrailingPE: number } } };

export type GetVolatilityQueryVariables = Exact<{
  tickers: Array<Scalars['String']> | Scalars['String'];
  start: Scalars['Int'];
  end: Scalars['Int'];
  interval: Scalars['String'];
}>;


export type GetVolatilityQuery = { __typename?: 'Query', getVolatility: Array<{ __typename?: 'Volatility', standardDeviation: number, ticker: string, volatilityByInterval: Array<{ __typename?: 'VolatilityForInterval', value: number, startTimestamp: number, endTimestamp: number }> }> };

export type GetPortfoliosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPortfoliosQuery = { __typename?: 'Query', getPortfolios: Array<{ __typename?: 'Portfolio', name: string, uid: string, positions: Array<{ __typename?: 'Position', ticker: string, purchases: Array<{ __typename?: 'Purchase', timestamp: number, shareAmount: number, pricePerShare: number }> }> }> };

export type UpdatePortfolioMutationVariables = Exact<{
  updatePortfolioInput: UpdatePortfolioInput;
}>;


export type UpdatePortfolioMutation = { __typename?: 'Mutation', updatePortfolio: boolean };

export type CreatePortfolioMutationVariables = Exact<{
  createPortfolioInput: CreatePortfolioInput;
}>;


export type CreatePortfolioMutation = { __typename?: 'Mutation', createPortfolio: boolean };

export type GetStocksQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type GetStocksQuery = { __typename?: 'Query', search: Array<{ __typename?: 'SearchResult', Code: string, Name: string, PreviousClose: number, Type: string }> };

export type GetSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionQuery = { __typename?: 'Query', getSession: { __typename?: 'Session', startDate: number, endDate: number } };

export type SetSessionMutationVariables = Exact<{
  input: SessionInput;
}>;


export type SetSessionMutation = { __typename?: 'Mutation', setSession: boolean };

export type SigninMutationVariables = Exact<{
  idToken: Scalars['String'];
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: boolean };

export type SignoutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignoutMutation = { __typename?: 'Mutation', signout: boolean };


export const GetAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tickers"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fromDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAssets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tickers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tickers"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ticker"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"trailingPERatio"}},{"kind":"Field","name":{"kind":"Name","value":"pbRatio"}},{"kind":"Field","name":{"kind":"Name","value":"roe"}},{"kind":"Field","name":{"kind":"Name","value":"debtToEquityRatio"}},{"kind":"Field","name":{"kind":"Name","value":"operatingMargin"}},{"kind":"Field","name":{"kind":"Name","value":"earningsYield"}},{"kind":"Field","name":{"kind":"Name","value":"freeCashFlowYield"}},{"kind":"Field","name":{"kind":"Name","value":"marketCap"}},{"kind":"Field","name":{"kind":"Name","value":"currentPrice"}},{"kind":"Field","name":{"kind":"Name","value":"dividendYield"}},{"kind":"Field","name":{"kind":"Name","value":"lastDividendDate"}},{"kind":"Field","name":{"kind":"Name","value":"historicalPrices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"close"}}]}}]}}]}}]} as unknown as DocumentNode<GetAssetsQuery, GetAssetsQueryVariables>;
export const GetEtfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getETF"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticker"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getETF"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticker"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticker"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ETFGeneral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"exchange"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ETFData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"netExpenseRatio"}},{"kind":"Field","name":{"kind":"Name","value":"yield"}},{"kind":"Field","name":{"kind":"Name","value":"top10Holdings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"holding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"assetsPercent"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"holdings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"holding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"assetsPercent"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetEtfQuery, GetEtfQueryVariables>;
export const GetStockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getStock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticker"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticker"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticker"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"General"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Code"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Exchange"}},{"kind":"Field","name":{"kind":"Name","value":"CurrencyCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Highlights"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"MarketCapitalization"}},{"kind":"Field","name":{"kind":"Name","value":"DividendYield"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Valuation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ForwardPE"}},{"kind":"Field","name":{"kind":"Name","value":"TrailingPE"}}]}}]}}]}}]} as unknown as DocumentNode<GetStockQuery, GetStockQueryVariables>;
export const GetVolatilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVolatility"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tickers"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interval"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVolatility"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tickers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tickers"}}},{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}},{"kind":"Argument","name":{"kind":"Name","value":"interval"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interval"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"volatilityByInterval"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"startTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"endTimestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"standardDeviation"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}}]} as unknown as DocumentNode<GetVolatilityQuery, GetVolatilityQueryVariables>;
export const GetPortfoliosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPortfolios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPortfolios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ticker"}},{"kind":"Field","name":{"kind":"Name","value":"purchases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"shareAmount"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerShare"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPortfoliosQuery, GetPortfoliosQueryVariables>;
export const UpdatePortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePortfolioInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePortfolioInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePortfolio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePortfolioInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePortfolioInput"}}}]}]}}]} as unknown as DocumentNode<UpdatePortfolioMutation, UpdatePortfolioMutationVariables>;
export const CreatePortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPortfolioInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePortfolioInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPortfolio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPortfolioInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPortfolioInput"}}}]}]}}]} as unknown as DocumentNode<CreatePortfolioMutation, CreatePortfolioMutationVariables>;
export const GetStocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStocks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Code"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"PreviousClose"}},{"kind":"Field","name":{"kind":"Name","value":"Type"}}]}}]}}]} as unknown as DocumentNode<GetStocksQuery, GetStocksQueryVariables>;
export const GetSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<GetSessionQuery, GetSessionQueryVariables>;
export const SetSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SessionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SetSessionMutation, SetSessionMutationVariables>;
export const SigninDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"idToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idToken"}}}]}]}}]} as unknown as DocumentNode<SigninMutation, SigninMutationVariables>;
export const SignoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signout"}}]}}]} as unknown as DocumentNode<SignoutMutation, SignoutMutationVariables>;