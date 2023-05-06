<template>
  <FinancialData :tickers="['AAPL', 'SCHD']" :from-date="1675550661" :to-date="currentTime" />
</template>

<script setup lang="ts">
const roundedNow = new Date(Math.round(new Date().getTime() / 60000) * 60000)
const unixTimeRounded = Math.floor(roundedNow.getTime() / 1000)
const currentTime = unixTimeRounded
</script>
