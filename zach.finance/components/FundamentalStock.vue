<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div v-if="loading" class="p-6 m-2 text-lg font-bold text-blue-600">
      Loading...
    </div>
    <div v-else-if="error" class="p-6 m-2 text-lg font-bold text-red-600">
      An error occurred: {{ error }}
    </div>
    <div v-else-if="data" class="p-6 m-2 bg-white rounded shadow-md">
      <h2 class="mb-4 text-xl font-bold text-gray-800">
        General
      </h2>
      <div class="space-y-2">
        <p>Code: {{ data.getStock.General.Code }}</p>
        <p>Name: {{ data.getStock.General.Name }}</p>
        <p>Country: {{ data.getStock.General.CountryName }}</p>
        <p>Exchange: {{ data.getStock.General.Exchange }}</p>
        <p>Sector: {{ data.getStock.General.Sector }}</p>
        <p>Industry: {{ data.getStock.General.Industry }}</p>
      </div>

      <h2 class="mt-6 mb-4 text-xl font-bold text-gray-800">
        Highlights
      </h2>
      <div class="space-y-2">
        <p>Market Capitalization: {{ data.getStock.Highlights.MarketCapitalization }}</p>
        <p>Market Cap Rank: {{ data.getStock.Highlights.MarketCapGroup }}</p>
      </div>

      <h2 class="mt-6 mb-4 text-xl font-bold text-gray-800">
        Valuation
      </h2>
      <div class="space-y-2">
        <p>PE: {{ data.getStock.Valuation.PE }}</p>
        <p>PB: {{ data.getStock.Valuation.PB }}</p>
        <p>PS: {{ data.getStock.Valuation.PS }}</p>
        <p>DividendYield: {{ data.getStock.Valuation.DividendYield }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'
import { GetStockDocument } from '~/gql/graphql'

export default defineComponent({
  name: 'StockComponent',
  setup() {
    const router = useRouter()
    const { result, loading, error } = useQuery(GetStockDocument, { ticker: router.currentRoute.value.params.code as string })

    return {
      data: result,
      loading,
      error
    }
  }
})
</script>
