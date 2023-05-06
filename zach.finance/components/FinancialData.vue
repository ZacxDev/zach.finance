<template>
  <div v-if="loading">
    Loading...
  </div>
  <div v-if="error">
    Error: {{ error.message }}
  </div>
  <div v-if="result" class="flex justify-center my-4">
    <div class="card w-11/12 max-w-none">
      <div class="card-body">
        <div>
          <PriceChart :assets="result.getAsset" :start="fromDate * 1000" :end="toDate * 1000" />
        </div>
        <div class="flex flex-wrap gap-6">
          <div v-for="asset in result.getAsset" :key="asset.ticker" class="card shadow-gray-900 shadow-lg max-w-none w-1/4 min-w-1/6 flex-shrink basis-0">
            <div class="card-body">
              <h3 class="text-4xl font-bold">
                {{ asset.ticker }}
              </h3>
              <h3 class="text-md font-bold mb-2">
                {{ asset.name }}
              </h3>
              <div class="text-2xl font-bold flex gap-2 mb-4">
                {{ formatCurrency(asset.currentPrice) }}
                <div v-for="([display, className], index) in getPercentChangeDisplay(asset)" :key="index">
                  <span :class="className">{{ display }}</span>
                </div>
              </div>
              <div>
                <div class="text-lg space-y-2">
                  <div>
                    Trailing P/E Ratio: <span class="font-semibold">{{ formatNumber(asset.trailingPERatio) }}</span>
                  </div>
                  <div v-if="asset.pbRatio !== 0">
                    P/B Ratio: <span class="font-semibold">{{ formatNumber(asset.pbRatio) }}</span>
                  </div>
                  <div v-if="asset.roe !== 0">
                    ROE: <span class="font-semibold">{{ formatNumber(asset.roe) }}</span>
                  </div>
                  <div>
                    Dividend Yield: <span class="font-semibold">{{ formatPercentage(asset.dividendYield) }}</span>
                  </div>
                  <div v-if="asset.lastDividendDate > 0">
                    <div>
                      Previous Dividend Date: <span class="font-semibold">{{ formatDate(asset.lastDividendDate * 1000) }}</span>
                    </div>
                    <div>
                      Est. Next Dividend Date: <span class="font-semibold">{{ formatDate((asset.lastDividendDate + 7776000) * 1000) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GetAssetsDocument, GetAssetsQuery } from '~/gql/graphql'

type asset = GetAssetsQuery['getAsset'][number]

export default {
  props: {
    tickers: {
      type: Array as PropType<string[]>,
      required: true
    },
    fromDate: {
      type: Number,
      required: true
    },
    toDate: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { result, loading, error } = useQuery(GetAssetsDocument, {
      tickers: props.tickers,
      fromDate: props.fromDate,
      toDate: props.toDate
    })

    function formatNumber(number: number): string {
      return new Intl.NumberFormat().format(number)
    }

    function formatCurrency(number: number): string {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)
    }

    function formatPercentage(number: number): string {
      return (number * 100).toFixed(2) + '%'
    }

    function formatDate(dateUnix: number): string {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(new Date(dateUnix))
    }

    function getLastPrice(prices: asset['historicalPrices']): number {
      const sorted = [...prices].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      const prev = sorted[sorted.length - 2]
      return prev.close
    }

    function percentageDifference(num1: number, num2: number) {
      const difference = Math.abs(num1 - num2)
      const avg = (num1 + num2) / 2
      const percentage = (difference / avg) * 100
      return percentage.toPrecision(3)
    }

    function getPercentChangeDisplay(asset: asset): [[string, string]] {
      const isDown = getLastPrice(asset.historicalPrices) > asset.currentPrice
      const symbol = isDown ? '-' : '+'
      const className = isDown ? 'text-red-500' : 'text-green-500'
      const diff = percentageDifference(asset.currentPrice, getLastPrice(asset.historicalPrices))

      return [[`${symbol}${diff}%`, className]]
    }

    return {
      result,
      loading,
      error,
      formatNumber,
      formatCurrency,
      formatPercentage,
      formatDate,
      getPercentChangeDisplay
    }
  }
}
</script>
