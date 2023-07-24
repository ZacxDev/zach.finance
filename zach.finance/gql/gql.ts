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
    "query getETF($ticker: String!) {\n  getETF(ticker: $ticker) {\n    ETFGeneral {\n      name\n      type\n      exchange\n      currencyCode\n    }\n    ETFData {\n      netExpenseRatio\n      yield\n      top10Holdings {\n        holding {\n          name\n          code\n          assetsPercent\n        }\n      }\n      holdings {\n        holding {\n          name\n          code\n          assetsPercent\n        }\n      }\n    }\n  }\n}": types.GetEtfDocument,
    "query getStock($ticker: String!) {\n  getStock(ticker: $ticker) {\n    General {\n      Code\n      Type\n      Name\n      Exchange\n      CurrencyCode\n    }\n    Highlights {\n      MarketCapitalization\n      DividendYield\n    }\n    Valuation {\n      ForwardPE\n      TrailingPE\n    }\n  }\n}": types.GetStockDocument,
    "query getVolatility($tickers: [String!]!, $start: Int!, $end: Int!, $interval: String!) {\n  getVolatility(tickers: $tickers, start: $start, end: $end, interval: $interval) {\n    volatilityByInterval {\n      value\n      startTimestamp\n      endTimestamp\n    }\n    standardDeviation\n    ticker\n  }\n}": types.GetVolatilityDocument,
    "query GetPortfolios {\n  getPortfolios {\n    name\n    uid\n    positions {\n      ticker\n      purchases {\n        timestamp\n        shareAmount\n        pricePerShare\n      }\n    }\n  }\n}\n\nmutation UpdatePortfolio($updatePortfolioInput: UpdatePortfolioInput!) {\n  updatePortfolio(updatePortfolioInput: $updatePortfolioInput)\n}\n\nmutation CreatePortfolio($createPortfolioInput: CreatePortfolioInput!) {\n  createPortfolio(createPortfolioInput: $createPortfolioInput)\n}": types.GetPortfoliosDocument,
    "query GetStocks($text: String!) {\n  search(text: $text) {\n    Code\n    Name\n    PreviousClose\n    Type\n  }\n}": types.GetStocksDocument,
    "query GetSession {\n  getSession {\n    startDate\n    endDate\n  }\n}\n\nmutation SetSession($input: SessionInput!) {\n  setSession(session: $input)\n}": types.GetSessionDocument,
    "mutation Signin($idToken: String!) {\n  signin(idToken: $idToken)\n}\n\nmutation Signout {\n  signout\n}": types.SigninDocument,
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
export function graphql(source: "query getETF($ticker: String!) {\n  getETF(ticker: $ticker) {\n    ETFGeneral {\n      name\n      type\n      exchange\n      currencyCode\n    }\n    ETFData {\n      netExpenseRatio\n      yield\n      top10Holdings {\n        holding {\n          name\n          code\n          assetsPercent\n        }\n      }\n      holdings {\n        holding {\n          name\n          code\n          assetsPercent\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query getETF($ticker: String!) {\n  getETF(ticker: $ticker) {\n    ETFGeneral {\n      name\n      type\n      exchange\n      currencyCode\n    }\n    ETFData {\n      netExpenseRatio\n      yield\n      top10Holdings {\n        holding {\n          name\n          code\n          assetsPercent\n        }\n      }\n      holdings {\n        holding {\n          name\n          code\n          assetsPercent\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getStock($ticker: String!) {\n  getStock(ticker: $ticker) {\n    General {\n      Code\n      Type\n      Name\n      Exchange\n      CurrencyCode\n    }\n    Highlights {\n      MarketCapitalization\n      DividendYield\n    }\n    Valuation {\n      ForwardPE\n      TrailingPE\n    }\n  }\n}"): (typeof documents)["query getStock($ticker: String!) {\n  getStock(ticker: $ticker) {\n    General {\n      Code\n      Type\n      Name\n      Exchange\n      CurrencyCode\n    }\n    Highlights {\n      MarketCapitalization\n      DividendYield\n    }\n    Valuation {\n      ForwardPE\n      TrailingPE\n    }\n  }\n}"];
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
export function graphql(source: "query GetStocks($text: String!) {\n  search(text: $text) {\n    Code\n    Name\n    PreviousClose\n    Type\n  }\n}"): (typeof documents)["query GetStocks($text: String!) {\n  search(text: $text) {\n    Code\n    Name\n    PreviousClose\n    Type\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetSession {\n  getSession {\n    startDate\n    endDate\n  }\n}\n\nmutation SetSession($input: SessionInput!) {\n  setSession(session: $input)\n}"): (typeof documents)["query GetSession {\n  getSession {\n    startDate\n    endDate\n  }\n}\n\nmutation SetSession($input: SessionInput!) {\n  setSession(session: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Signin($idToken: String!) {\n  signin(idToken: $idToken)\n}\n\nmutation Signout {\n  signout\n}"): (typeof documents)["mutation Signin($idToken: String!) {\n  signin(idToken: $idToken)\n}\n\nmutation Signout {\n  signout\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;