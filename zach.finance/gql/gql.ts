/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetAssets($tickers: [String!]!, $fromDate: Int!, $toDate: Int!) {\n  getAssets(tickers: $tickers) {\n    ticker\n    name\n    trailingPERatio\n    pbRatio\n    roe\n    debtToEquityRatio\n    operatingMargin\n    earningsYield\n    freeCashFlowYield\n    marketCap\n    currentPrice\n    dividendYield\n    lastDividendDate\n    historicalPrices(from: $fromDate, to: $toDate) {\n      date\n      close\n    }\n  }\n}": types.GetAssetsDocument,
    "query getVolatility($tickers: [String!]!, $start: Int!, $end: Int!, $interval: String!) {\n  getVolatility(tickers: $tickers, start: $start, end: $end, interval: $interval) {\n    volatilityByInterval {\n      value\n      startTimestamp\n      endTimestamp\n    }\n    standardDeviation\n    ticker\n  }\n}": types.GetVolatilityDocument,
    "query GetPortfolios {\n  getPortfolios {\n    name\n    uid\n    positions {\n      ticker\n      purchases {\n        timestamp\n        shareAmount\n        pricePerShare\n      }\n    }\n  }\n}\n\nmutation UpdatePortfolio($updatePortfolioInput: UpdatePortfolioInput!) {\n  updatePortfolio(updatePortfolioInput: $updatePortfolioInput)\n}\n\nmutation CreatePortfolio($createPortfolioInput: CreatePortfolioInput!) {\n  createPortfolio(createPortfolioInput: $createPortfolioInput)\n}": types.GetPortfoliosDocument,
    "query GetSession {\n  getSession {\n    startDate\n    endDate\n  }\n}\n\nmutation SetSession($ownerUid: String!, $input: SessionInput!) {\n  setSession(ownerUid: $ownerUid, session: $input)\n}": types.GetSessionDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAssets($tickers: [String!]!, $fromDate: Int!, $toDate: Int!) {\n  getAssets(tickers: $tickers) {\n    ticker\n    name\n    trailingPERatio\n    pbRatio\n    roe\n    debtToEquityRatio\n    operatingMargin\n    earningsYield\n    freeCashFlowYield\n    marketCap\n    currentPrice\n    dividendYield\n    lastDividendDate\n    historicalPrices(from: $fromDate, to: $toDate) {\n      date\n      close\n    }\n  }\n}"): (typeof documents)["query GetAssets($tickers: [String!]!, $fromDate: Int!, $toDate: Int!) {\n  getAssets(tickers: $tickers) {\n    ticker\n    name\n    trailingPERatio\n    pbRatio\n    roe\n    debtToEquityRatio\n    operatingMargin\n    earningsYield\n    freeCashFlowYield\n    marketCap\n    currentPrice\n    dividendYield\n    lastDividendDate\n    historicalPrices(from: $fromDate, to: $toDate) {\n      date\n      close\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getVolatility($tickers: [String!]!, $start: Int!, $end: Int!, $interval: String!) {\n  getVolatility(tickers: $tickers, start: $start, end: $end, interval: $interval) {\n    volatilityByInterval {\n      value\n      startTimestamp\n      endTimestamp\n    }\n    standardDeviation\n    ticker\n  }\n}"): (typeof documents)["query getVolatility($tickers: [String!]!, $start: Int!, $end: Int!, $interval: String!) {\n  getVolatility(tickers: $tickers, start: $start, end: $end, interval: $interval) {\n    volatilityByInterval {\n      value\n      startTimestamp\n      endTimestamp\n    }\n    standardDeviation\n    ticker\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPortfolios {\n  getPortfolios {\n    name\n    uid\n    positions {\n      ticker\n      purchases {\n        timestamp\n        shareAmount\n        pricePerShare\n      }\n    }\n  }\n}\n\nmutation UpdatePortfolio($updatePortfolioInput: UpdatePortfolioInput!) {\n  updatePortfolio(updatePortfolioInput: $updatePortfolioInput)\n}\n\nmutation CreatePortfolio($createPortfolioInput: CreatePortfolioInput!) {\n  createPortfolio(createPortfolioInput: $createPortfolioInput)\n}"): (typeof documents)["query GetPortfolios {\n  getPortfolios {\n    name\n    uid\n    positions {\n      ticker\n      purchases {\n        timestamp\n        shareAmount\n        pricePerShare\n      }\n    }\n  }\n}\n\nmutation UpdatePortfolio($updatePortfolioInput: UpdatePortfolioInput!) {\n  updatePortfolio(updatePortfolioInput: $updatePortfolioInput)\n}\n\nmutation CreatePortfolio($createPortfolioInput: CreatePortfolioInput!) {\n  createPortfolio(createPortfolioInput: $createPortfolioInput)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetSession {\n  getSession {\n    startDate\n    endDate\n  }\n}\n\nmutation SetSession($ownerUid: String!, $input: SessionInput!) {\n  setSession(ownerUid: $ownerUid, session: $input)\n}"): (typeof documents)["query GetSession {\n  getSession {\n    startDate\n    endDate\n  }\n}\n\nmutation SetSession($ownerUid: String!, $input: SessionInput!) {\n  setSession(ownerUid: $ownerUid, session: $input)\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;