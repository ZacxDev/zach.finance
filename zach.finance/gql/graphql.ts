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

export type CreatePortfolioInput = {
  name: Scalars['String'];
  positions: Array<PositionInput>;
};

export type CryptoAsset = {
  __typename?: 'CryptoAsset';
  circulatingSupply: Scalars['Float'];
  contractAddress: Scalars['String'];
  historicalPrices: Array<HistoricalPrice>;
  liquidity: Scalars['Float'];
  marketCap: Scalars['Float'];
  name: Scalars['String'];
  priceCorrelation: Array<Maybe<PriceCorrelation>>;
  priceVolatility: Scalars['Float'];
  symbol: Scalars['String'];
  tokenAge: Scalars['Float'];
  tokenDistribution: Array<Maybe<TokenDistribution>>;
  totalSupply: Scalars['Float'];
  tradingVolume: Scalars['Float'];
  transactionCount: Scalars['Int'];
  transactionValue: Scalars['Float'];
  volatility: Volatility;
};


export type CryptoAssetHistoricalPricesArgs = {
  from: Scalars['Int'];
  to: Scalars['Int'];
};


export type CryptoAssetPriceCorrelationArgs = {
  contractAddress: Array<Scalars['String']>;
  from: Scalars['Int'];
  to: Scalars['Int'];
};

export type DeFiInstrument = {
  __typename?: 'DeFiInstrument';
  collateralizationRatio: Scalars['Float'];
  defaultRisk: Scalars['Float'];
  gasFees: Scalars['Float'];
  impermanentLoss: Scalars['Float'];
  interestRate: Scalars['Float'];
  lendingBorrowingLimits: Scalars['Float'];
  liquidity: Scalars['Float'];
  poolShareOfTotalVolume: Scalars['Float'];
  providerFees: Scalars['Float'];
  slippage: Scalars['Float'];
  smartContractRisk: Scalars['Float'];
  tokenPrice: Scalars['Float'];
  totalValueLocked: Scalars['Float'];
  type: DeFiType;
  utilizationRate: Scalars['Float'];
  withdrawalFees: Scalars['Float'];
  yield: Scalars['Float'];
};

export enum DeFiType {
  Farm = 'FARM',
  LendingPosition = 'LENDING_POSITION',
  LiquidityPool = 'LIQUIDITY_POOL',
  Vault = 'VAULT'
}

export type Earnings = {
  __typename?: 'Earnings';
  epsActual: Scalars['Float'];
  epsEstimate: Scalars['Float'];
  quarter: Scalars['Int'];
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
  getAssets: Array<Asset>;
  getCryptoAssets?: Maybe<CryptoAsset>;
  getDeFiInstruments?: Maybe<DeFiInstrument>;
  getPortfolios: Array<Portfolio>;
  getSession: Session;
  getVolatility: Array<Volatility>;
};


export type QueryGetAssetsArgs = {
  tickers: Array<Scalars['String']>;
};


export type QueryGetCryptoAssetsArgs = {
  symbols: Array<Scalars['String']>;
};


export type QueryGetDeFiInstrumentsArgs = {
  contractAddresses: Array<Scalars['String']>;
};


export type QueryGetVolatilityArgs = {
  end: Scalars['Int'];
  interval: Scalars['String'];
  start: Scalars['Int'];
  tickers: Array<Scalars['String']>;
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

export type TokenDistribution = {
  __typename?: 'TokenDistribution';
  address: Scalars['String'];
  balance: Scalars['Float'];
};

export type UpdatePortfolioInput = {
  name: Scalars['String'];
  positions: Array<PositionInput>;
  uid: Scalars['String'];
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

export type GetAssetsQueryVariables = Exact<{
  tickers: Array<Scalars['String']> | Scalars['String'];
  fromDate: Scalars['Int'];
  toDate: Scalars['Int'];
}>;


export type GetAssetsQuery = { __typename?: 'Query', getAssets: Array<{ __typename?: 'Asset', ticker: string, name: string, trailingPERatio: number, pbRatio: number, roe: number, debtToEquityRatio: number, operatingMargin: number, earningsYield: number, freeCashFlowYield: number, marketCap: number, currentPrice: number, dividendYield: number, lastDividendDate: number, historicalPrices: Array<{ __typename?: 'HistoricalPrice', date: string, close: number }> }> };

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
export const GetVolatilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVolatility"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tickers"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interval"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVolatility"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tickers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tickers"}}},{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}},{"kind":"Argument","name":{"kind":"Name","value":"interval"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interval"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"volatilityByInterval"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"startTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"endTimestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"standardDeviation"}},{"kind":"Field","name":{"kind":"Name","value":"ticker"}}]}}]}}]} as unknown as DocumentNode<GetVolatilityQuery, GetVolatilityQueryVariables>;
export const GetPortfoliosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPortfolios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPortfolios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ticker"}},{"kind":"Field","name":{"kind":"Name","value":"purchases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"shareAmount"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerShare"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPortfoliosQuery, GetPortfoliosQueryVariables>;
export const UpdatePortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePortfolioInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePortfolioInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePortfolio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePortfolioInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePortfolioInput"}}}]}]}}]} as unknown as DocumentNode<UpdatePortfolioMutation, UpdatePortfolioMutationVariables>;
export const CreatePortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPortfolioInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePortfolioInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPortfolio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPortfolioInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPortfolioInput"}}}]}]}}]} as unknown as DocumentNode<CreatePortfolioMutation, CreatePortfolioMutationVariables>;
export const GetSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<GetSessionQuery, GetSessionQueryVariables>;
export const SetSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SessionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"session"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<SetSessionMutation, SetSessionMutationVariables>;
export const SigninDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"idToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idToken"}}}]}]}}]} as unknown as DocumentNode<SigninMutation, SigninMutationVariables>;
export const SignoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signout"}}]}}]} as unknown as DocumentNode<SignoutMutation, SignoutMutationVariables>;