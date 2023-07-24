<template>
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
        Market Capitalization: {{ stockData.Highlights.MarketCapitalization }}
      </p>
      <p class="">
        Price: {{ stockData.Highlights.Price }}
      </p>
      <p class="">
        Dividend Yield: {{ stockData.Highlights.DividendYield }}
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { GetStockDocument } from '~/gql/graphql'

const route = useRoute()
const stockData = ref(null)

const { load, onResult } = useLazyQuery(GetStockDocument)

onResult((result) => {
  stockData.value = result.data?.getStock
})

onMounted(() => {
  load(GetStockDocument, {
    ticker: route.params.ticker
  })
})
</script>
