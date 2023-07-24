<template>
  <div>
    <div v-if="assetData">
      <div class="flex flex-col">
        <h2 class="text-3xl font-bold">
          {{ stockData.General.Name }}
        </h2>
        <span class="text-2xl">
          ${{ assetData.currentPrice }}
        </span>
        <span>
          {{ changeInPricePercentFormatted }}%
          ({{ changeInPriceFormatted }} {{ timeRangeLabel }})
        </span>
      </div>
      <TimePeriodButton @change="updateFromTimestamp" />
      <PriceChart :assets="[assetData]" :start="fromTimestamp" :end="1690225741193" />
    </div>
    <div v-if="stockData" class="flex flex-col items-center space-y-8">
      <div class="card shadow rounded w-11/12 max-w-none p-4">
        <h2 class="text-2xl font-bold">
          {{ stockData.General.Name }}
        </h2>
        <p class="">
          Code: {{ stockData.General.Code }}
        </p>
        <p class="">
          Type: {{ stockData.General.Type }}
        </p>
        <p class="">
          Exchange: {{ stockData.General.Exchange }}
        </p>
        <p class="">
          Currency Code: {{ stockData.General.CurrencyCode }}
        </p>
        <!-- ...more fields can be added here -->
      </div>

      <div class="card shadow rounded w-11/12 max-w-none p-4">
        <h3 class="text-xl font-semibold ">
          Highlights:
        </h3>
        <p class="">
          Market Cap. (MM): ${{ (stockData.Highlights.MarketCapitalization / 100000000).toFixed(3) }}
        </p>
        <p class="">
          Dividend Yield: {{ (stockData.Highlights.DividendYield * 100).toFixed(3) }}%
        </p>
        <!-- ...more fields can be added here -->
      </div>

      <div class="card shadow rounded w-11/12 max-w-none p-4">
        <h3 class="text-xl font-semibold ">
          Valuation:
        </h3>
        <p class="">
          Forward P/E: {{ stockData.Valuation.ForwardPE }}
        </p>
        <p class="">
          Trailing P/E: {{ stockData.Valuation.TrailingPE }}
        </p>
        <!-- ...more fields can be added here -->
      </div>

      <!-- Add additional cards for the remaining categories -->
    </div>

    <div v-else class="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { format } from 'date-fns'
import { GetStockDocument, GetAssetsDocument } from '~/gql/graphql'

const ytd = Math.floor(new Date((new Date()).getFullYear(), 0, 1).getTime())

const route = useRoute()
const stockData = ref(null)
const assetData = ref(null)
const changeInPriceFormatted = ref(null)
const changeInPricePercentFormatted = ref(null)
const fromTimestamp = ref(ytd)
const timeRangeLabel = ref('YTD')
const period = ref('w')

const { onResult: onGetAssetsResult, load: loadGetAssets } = useLazyQuery(GetAssetsDocument)

const { load, onResult } = useLazyQuery(GetStockDocument)

onResult((result) => {
  stockData.value = result.data?.getStock
})

onGetAssetsResult((result) => {
  if (result.data) {
    const asset = result.data.getAssets[0]
    const sortedPrices = [...asset.historicalPrices].sort((a, b) => a.date - b.date)
    let lastAssetPrice = sortedPrices[0]
    const currentDate = format(new Date(), 'yyyy-MM-dd')
    if (lastAssetPrice.date === currentDate) {
      lastAssetPrice = sortedPrices[sortedPrices.length - 2]
    }
    console.log(lastAssetPrice)

    const changeInPrice = (asset.currentPrice - lastAssetPrice.close).toFixed(3)
    if (changeInPrice > 0) {
      changeInPriceFormatted.value = `+${changeInPrice}`
    } else {
      changeInPriceFormatted.value = `-${Math.abs(changeInPrice)}`
    }

    const changeInPricePercent = ((changeInPrice / lastAssetPrice.close) * 100).toFixed(3)
    if (changeInPricePercent > 0) {
      changeInPricePercentFormatted.value = `+${changeInPricePercent}`
    } else {
      changeInPricePercentFormatted.value = `-${Math.abs(changeInPricePercent)}`
    }

    assetData.value = asset
  }
})

function refetchPrices(fromDate) {
  const { ticker } = route.params

  loadGetAssets(GetAssetsDocument, {
    tickers: [ticker],
    fromDate,
    toDate: 1690225741193,
    period: period.value
  })
}

onMounted(() => {
  const { ticker } = route.params
  load(GetStockDocument, {
    ticker
  })

  refetchPrices(fromTimestamp.value)
})

const updateFromTimestamp = (prettyLabel, labelValue, timeValue) => {
  timeRangeLabel.value = prettyLabel
  fromTimestamp.value = timeValue
  period.value = labelValue

  refetchPrices(timeValue)
}

</script>
