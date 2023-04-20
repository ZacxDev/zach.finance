package model

type Asset struct {
	Ticker                    string
	Name                      string
	TrailingPERatio           float64
	PBRatio                   float64
	ROE                       float64
	DebtToEquityRatio         float64
	OperatingMargin           float64
	EarningsYield             float64
	FreeCashFlowYield         float64
	MarketCap                 float64
	BusinessModelScore        QualitativeValue
	CompetitiveAdvantageScore QualitativeValue
	ManagementQualityScore    QualitativeValue
	GrowthProspectsScore      QualitativeValue
	RiskScore                 QualitativeValue
	ValuationScore            QualitativeValue
	Risks                     []Risk
}

type QualitativeValue string

const (
	POOR     QualitativeValue = "POOR"
	FAIR     QualitativeValue = "FAIR"
	GOOD     QualitativeValue = "GOOD"
	HIGH     QualitativeValue = "HIGH"
	STRONG   QualitativeValue = "STRONG"
	MODERATE QualitativeValue = "MODERATE"
	LOW      QualitativeValue = "LOW"
)

type Risk struct {
	Parameter RiskParameter
	Value     float64
}

type RiskParameter string

const (
	SYSTEMIC_RISK      RiskParameter = "SYSTEMIC_RISK"
	COUNTRY_RISK       RiskParameter = "COUNTRY_RISK"
	INTEREST_RATE_RISK RiskParameter = "INTEREST_RATE_RISK"
	CURRENCY_RISK      RiskParameter = "CURRENCY_RISK"
	COMMODITY_RISK     RiskParameter = "COMMODITY_RISK"
	POLITICAL_RISK     RiskParameter = "POLITICAL_RISK"
	LIQUIDITY_RISK     RiskParameter = "LIQUIDITY_RISK"
	VOLATILITY_RISK    RiskParameter = "VOLATILITY_RISK"
)
