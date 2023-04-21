package model

import "time"

type VolatilityForInterval struct {
	Value          float64
	StartTimestamp time.Time
	EndTimestamp   time.Time
}

type Volatility struct {
	VolatilityByInterval []VolatilityForInterval
	StandardDeviation    float64
}
