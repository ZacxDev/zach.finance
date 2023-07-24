<template>
  <div class="relative">
    <input
      v-model="search"
      class="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none text-black"
      type="search"
      name="search"
      placeholder="Search"
      @input="onInput"
      @keydown.down.prevent="arrowDown"
      @keydown.up.prevent="arrowUp"
      @keydown.enter.prevent="enter"
      @blur="onBlur"
      @focus="onFocus"
    >
    <ul
      v-if="stocks && isFocused"
      class="absolute z-50 mt-2 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <li
        v-for="(stock, index) in stocks"
        :key="index"
        class="cursor-pointer px-5 py-3 hover:bg-blue-50 text-black"
        :class="{ 'bg-blue-100': selectedIndex === index }"
        @click="navigate(stock.Code, stock.Type)"
      >
        <div class="flex justify-between">
          <span class="font-semibold">{{ stock.Code }} - {{ stock.Name }}}</span>
          <span class="text-gray-500">Previous Close: {{ stock.PreviousClose }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { GetStocksDocument } from '~/gql/graphql'

const search = ref('')
const selectedIndex = ref(-1)
const isFocused = ref(false)

const { result, onResult, loading, onError, error, load } = useLazyQuery(GetStocksDocument)

watch(search, () => {
  selectedIndex.value = -1
  load(GetStocksDocument, {
    text: search.value
  })
})

const stocks = computed(() => (loading.value || error.value) ? [] : result.value?.search)

// const onInput = () => refetch()

const arrowDown = () => {
  if (selectedIndex.value < stocks.value.length - 1) {
    selectedIndex.value++
  }
}

const arrowUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

const enter = () => {
  const s = stocks.value[selectedIndex.value]
  if (s) {
    navigate(s.Code, s.Type)
  }
}

const assetTypeMapping = {
  'Common Stock': 'stock',
  ETF: 'etf',
  Fund: 'fund',
  Bond: 'bond',
  Index: 'index',
  Crypto: 'crypto'
}

const navigate = (ticker, type) => {
  const prefix = assetTypeMapping[type] || 'stock'
  const url = `/${prefix}/${ticker}`
  window.location.href = url
}

const onBlur = () => {
  setTimeout(() => {
    isFocused.value = false
  }, 200)
}

const onFocus = () => {
  isFocused.value = true
}
</script>

<style scoped>
input {
  width: 100%;
}
</style>
