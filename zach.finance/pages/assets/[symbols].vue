<template>
  <FinancialData :tickers="symbols" :from-date="1675550661" :to-date="currentTime" />
</template>

<script setup lang="ts">
const roundedNow = new Date(Math.round(new Date().getTime() / 60000) * 60000)
const unixTimeRounded = Math.floor(roundedNow.getTime() / 1000)
const currentTime = unixTimeRounded
const route = useRoute()
const { symbols: symbolsCsv } = route.params
const symbols = (symbolsCsv as string).split(',')
</script>
