package volatility

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math"
	"net/http"
	"time"

	"github.com/ZacxDev/zach.finance/api-gateway/internal/model"
)

type YahooResponse struct {
	Chart struct {
		Result []struct {
			Timestamp  []int64
			Indicators struct {
				Quote []struct {
					Close []float64
				}
			}
		}
	}
}

func getHistoricalData(ticker string, startDate time.Time, endDate time.Time, interval string) (*YahooResponse, error) {
	start := startDate.Unix()
	end := endDate.Unix()

	url := fmt.Sprintf("https://query1.finance.yahoo.com/v8/finance/chart/%s?period1=%d&period2=%d&interval=%s", ticker, start, end, interval)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var data YahooResponse
	err = json.Unmarshal(body, &data)
	if err != nil {
		return nil, err
	}

	return &data, nil
}

func calculateVolatility(prices []float64, timestamps []int64) []model.VolatilityForInterval {
	volatilityData := make([]model.VolatilityForInterval, len(prices)-1)

	for i := 1; i < len(prices); i++ {
		volatility := math.Abs(prices[i]-prices[i-1]) / prices[i-1]
		volatilityData[i-1] = model.VolatilityForInterval{
			StartTimestamp: time.Unix(timestamps[i-1], 0),
			EndTimestamp:   time.Unix(timestamps[i], 0),
			Value:          volatility,
		}
	}

	return volatilityData
}

func calculateStandardDeviation(values []float64) float64 {
	var sum, mean, stdDev float64

	for _, v := range values {
		sum += v
	}
	mean = sum / float64(len(values))

	for _, v := range values {
		stdDev += math.Pow(v-mean, 2)
	}
	stdDev /= float64(len(values) - 1)

	return math.Sqrt(stdDev)
}

func GetVolatility(ticker string, startDate time.Time, endDate time.Time, interval string) (float64, []model.VolatilityForInterval, error) {
	data, err := getHistoricalData(ticker, startDate, endDate, interval)
	if err != nil {
		return 0, nil, err
	}

	prices := data.Chart.Result[0].Indicators.Quote[0].Close
	timestamps := data.Chart.Result[0].Timestamp
	volatilityData := calculateVolatility(prices, timestamps)
	var volatilityValues []float64
	for _, v := range volatilityData {
		volatilityValues = append(volatilityValues, v.Value)
	}
	standardDeviation := calculateStandardDeviation(volatilityValues)

	return standardDeviation, volatilityData, nil
}

/*
func main() {
	startDate := time.Date(2021, time.January, 1, 0, 0, 0, 0, time.UTC)
	endDate := time.Date(2021, time.December, 31, 0, 0, 0, 0, time.UTC)
	ticker := "AAPL"
	interval := "1d" // Change this to "1wk" for weekly volatility or "1mo" for monthly volatility

	sd, volatility, err := GetVolatility(ticker, startDate, endDate, interval)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Printf("The standard deviation for %s between %v and %v with interval %s is: %.4f\n", ticker, startDate, endDate, interval, sd)
	fmt.Printf("The volatility for %s between %v and %v with interval %s is: %+v\n", ticker, startDate, endDate, interval, volatility)
}
*/
