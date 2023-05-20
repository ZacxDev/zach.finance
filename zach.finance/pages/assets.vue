<template>
  <FinancialData :tickers="tickers" :from-date="fromDate" :to-date="toDate" />
</template>

<script setup lang="ts">
import { usePortfolios } from '~/store/portfolio'
import { useSession } from '~/store/session'

const { portfolios } = usePortfolios()
const { session } = useSession()

const roundedNow = new Date(Math.round(new Date().getTime() / 60000) * 60000)
const unixTimeRounded = Math.floor(roundedNow.getTime() / 1000)
const currentTime = unixTimeRounded
const oneMonthAgo = unixTimeRounded - 2592000

const p = portfolios.value?.getPortfolios[0]
const tickers = p ? p.positions.map(p => p.ticker) : ['TSLA']
const fromDate = session.value?.startDate || oneMonthAgo
const toDate = session.value?.endDate || currentTime
</script>
