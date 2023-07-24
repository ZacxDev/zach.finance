<template>
  <div v-if="etfData" class="flex flex-col items-center justify-center">
    <div class="card shadow rounded w-11/12 max-w-none">
      <div class="card-body">
        <h2 class="text-2xl font-extrabold">
          {{ etfData.ETFGeneral.name }}
        </h2>
        <p>
          Type: {{ etfData.ETFGeneral.type }}
        </p>
        <p>
          Dividend Yield: {{ parseFloat(etfData.ETFData.yield).toFixed(3) }}%
        </p>
        <p>
          Exchange: {{ etfData.ETFGeneral.exchange }}
        </p>
        <p>
          Currency: {{ etfData.ETFGeneral.currencyCode }}
        </p>
        <!-- ...more fields can be added here -->

        <h3 class="text-xl font-semibold mt-6">
          Fees:
        </h3>
        <p>
          Expense Ratio: {{ (etfData.ETFData.netExpenseRatio || 0) * 100 }}%
        </p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-8">
      <div class="card shadow rounded w-11/12 max-w-none">
        <div class="card-body">
          <h3 class="text-xl font-semibold">
            Top 10 Holdings:
          </h3>
          <ul class="list-disc list-inside space-y-2 mt-2">
            <li v-for="(holding, index) in [...etfData.ETFData.top10Holdings].sort((a, b) => b.holding.assetsPercent - a.holding.assetsPercent)" :key="index" class="">
              {{ holding.holding.name }} ({{ holding.holding.code }}) - {{ holding.holding.assetsPercent.toFixed(3) }}%
            </li>
          </ul>
        </div>
      </div>

      <div class="card shadow rounded w-11/12 max-w-none">
        <div class="card-body">
          <h3 class="text-xl font-semibold">
            All Holdings:
          </h3>
          <ul class="list-disc list-inside space-y-2 mt-2">
            <li v-for="(holding, index) in [...etfData.ETFData.holdings].sort((a, b) => b.holding.assetsPercent - a.holding.assetsPercent)" :key="index" class="">
              {{ holding.holding.name }} ({{ holding.holding.code }}) - {{ holding.holding.assetsPercent.toFixed(3) }}%
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="flex justify-center items-center h-screen">
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { GetEtfDocument } from '~/gql/graphql'

const route = useRoute()
const etfData = ref(null)

const { load, onResult } = useLazyQuery(GetEtfDocument)

onResult((result) => {
  etfData.value = result.data.getETF
})

onMounted(() => {
  if (route.params.ticker) {
    load(GetEtfDocument, {
      ticker: route.params.ticker
    })
  }
})
</script>
