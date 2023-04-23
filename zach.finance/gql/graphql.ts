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
  competitiveAdvantageScore: QualitativeValue;
  debtToEquityRatio: Scalars['Float'];
  earningsYield: Scalars['Float'];
  freeCashFlowYield: Scalars['Float'];
  growthProspectsScore: QualitativeValue;
  managementQualityScore: QualitativeValue;
  marketCap: Scalars['Float'];
  name: Scalars['String'];
  operatingMargin: Scalars['Float'];
  pbRatio: Scalars['Float'];
  riskScore: QualitativeValue;
  risks: Array<Risk>;
  roe: Scalars['Float'];
  ticker: Scalars['String'];
  trailingPERatio: Scalars['Float'];
  valuationScore: QualitativeValue;
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
  getAsset: Array<Asset>;
  getVolatility: Array<Volatility>;
};


export type QueryGetAssetArgs = {
  tickers: Array<Scalars['String']>;
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

export type GetVolatilityQueryVariables = Exact<{
  tickers: Array<Scalars['String']> | Scalars['String'];
  start: Scalars['Int'];
  end: Scalars['Int'];
  interval: Scalars['String'];
}>;


export type GetVolatilityQuery = { __typename?: 'Query', getVolatility: Array<{ __typename?: 'Volatility', standardDeviation: number, volatilityByInterval: Array<{ __typename?: 'VolatilityForInterval', value: number, startTimestamp: number, endTimestamp: number }> }> };


export const GetVolatilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVolatility"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tickers"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interval"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVolatility"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tickers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tickers"}}},{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}},{"kind":"Argument","name":{"kind":"Name","value":"interval"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interval"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"volatilityByInterval"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"startTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"endTimestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"standardDeviation"}}]}}]}}]} as unknown as DocumentNode<GetVolatilityQuery, GetVolatilityQueryVariables>;