package asset

// Calculate P/E Ratio
func calculatePERatio(marketPrice, eps float64) float64 {
	return marketPrice / eps
}

// Calculate P/B Ratio
func calculatePBRatio(marketPrice, bookValuePerShare float64) float64 {
	return marketPrice / bookValuePerShare
}

// Calculate Return on Equity (ROE)
func calculateROE(netIncome, shareholderEquity float64) float64 {
	return netIncome / shareholderEquity
}

// Calculate Debt-to-Equity Ratio
func calculateDebtToEquityRatio(totalDebt, shareholderEquity float64) float64 {
	return totalDebt / shareholderEquity
}

// Calculate Operating Margin
func calculateOperatingMargin(operatingIncome, totalRevenue float64) float64 {
	return operatingIncome / totalRevenue
}

// Calculate Earnings Yield
func calculateEarningsYield(eps, marketPricePerShare float64) float64 {
	return eps / marketPricePerShare
}

// Calculate Free Cash Flow Yield
func calculateFreeCashFlowYield(freeCashFlowPerShare, marketPricePerShare float64) float64 {
	return freeCashFlowPerShare / marketPricePerShare
}

// Calculate Market Capitalization
func calculateMarketCapitalization(marketPricePerShare, outstandingShares float64) float64 {
	return marketPricePerShare * outstandingShares
}
