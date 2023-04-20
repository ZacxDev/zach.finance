package asset

type YahooFinanceResponse struct {
	Symbol            string
	ShortName         string
	TrailingPE        float64
	PriceToBook       float64
	ReturnOnEquity    float64
	DebtToEquity      float64
	OperatingMargin   float64
	EarningsYield     float64
	FreeCashFlowYield float64
	MarketCap         float64
}

type FinancialData struct {
	FreeCashFlow float64 `json:"freeCashFlow"`
}

type SummaryProfile struct {
	Symbol    string `json:"symbol"`
	ShortName string `json:"shortName"`
}
