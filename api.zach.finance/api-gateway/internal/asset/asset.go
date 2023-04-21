package asset

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/ZacxDev/zach.finance/api-gateway/internal/model"
)

func GetStockInfo(ticker string) (*model.Asset, error) {
	url := fmt.Sprintf("https://query1.finance.yahoo.com/v10/finance/quoteSummary/%s?modules=assetProfile,financialData,defaultKeyStatistics,summaryProfile,price,summaryDetail", ticker)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var data map[string]interface{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		return nil, err
	}

	quoteSummary := data["quoteSummary"].(map[string]interface{})
	result := quoteSummary["result"].([]interface{})
	stockInfo := result[0].(map[string]interface{})

	// Extract FinancialData and SummaryProfile
	financialData := stockInfo["financialData"].(map[string]interface{})
	//summaryProfile := stockInfo["summaryProfile"].(map[string]interface{})
	price := stockInfo["price"].(map[string]interface{})
	defaultKeyStatistics := stockInfo["defaultKeyStatistics"].(map[string]interface{})
	summaryDetail := stockInfo["summaryDetail"].(map[string]interface{})

	// Calculate marketCap
	regularMarketPrice := price["regularMarketPrice"].(map[string]interface{})["raw"].(float64)
	sharesOutstanding := defaultKeyStatistics["sharesOutstanding"].(map[string]interface{})["raw"].(float64)
	marketCap := regularMarketPrice * sharesOutstanding

	// Calculate freeCashFlowYield
	freeCashFlow := financialData["freeCashflow"].(map[string]interface{})["raw"].(float64)
	freeCashFlowYield := freeCashFlow / marketCap

	// Extract the necessary fields and create a YahooFinanceResponse instance
	response := &YahooFinanceResponse{
		Symbol:          price["symbol"].(string),
		ShortName:       price["shortName"].(string),
		TrailingPE:      summaryDetail["trailingPE"].(map[string]interface{})["raw"].(float64),
		PriceToBook:     defaultKeyStatistics["priceToBook"].(map[string]interface{})["raw"].(float64),
		ReturnOnEquity:  financialData["returnOnEquity"].(map[string]interface{})["raw"].(float64),
		DebtToEquity:    financialData["debtToEquity"].(map[string]interface{})["raw"].(float64),
		OperatingMargin: financialData["operatingMargins"].(map[string]interface{})["raw"].(float64),
		//EarningsYield:     stockInfo["earningsYield"].(float64),
		FreeCashFlowYield: freeCashFlowYield,
		MarketCap:         marketCap,
	}

	a := mapYahooFinanceResponseToAsset(response)

	return a, nil
}

func mapYahooFinanceResponseToAsset(response *YahooFinanceResponse) *model.Asset {
	// In this example, we assign default values to the fields not available from Yahoo Finance API
	asset := &model.Asset{
		Ticker:                    response.Symbol,
		Name:                      response.ShortName,
		TrailingPERatio:           response.TrailingPE,
		PBRatio:                   response.PriceToBook,
		ROE:                       response.ReturnOnEquity,
		DebtToEquityRatio:         response.DebtToEquity,
		OperatingMargin:           response.OperatingMargin,
		EarningsYield:             response.EarningsYield,
		FreeCashFlowYield:         response.FreeCashFlowYield,
		MarketCap:                 response.MarketCap,
		BusinessModelScore:        model.FAIR,     // Default value, update with actual data
		CompetitiveAdvantageScore: model.GOOD,     // Default value, update with actual data
		ManagementQualityScore:    model.FAIR,     // Default value, update with actual data
		GrowthProspectsScore:      model.GOOD,     // Default value, update with actual data
		RiskScore:                 model.MODERATE, // Default value, update with actual data
		ValuationScore:            model.FAIR,     // Default value, update with actual data
		Risks:                     []model.Risk{}, // Default value, update with actual data
	}

	return asset
}
