<template>
  <div>
    <div v-if="route.path !== '/' && route.path !== '/signin'" class="flex justify-center mt-4">
      <div class="w-11/12 card max-w-none p-8">
        <div v-if="user">
          <PortfolioForm v-if="route.path !== '/'" />
        </div>
        <div v-if="!user">
          <span>
            <nuxt-link :to="`${'/signin'}?returnTo=${route.path}`" class="text-blue-600">
              Sign-in
            </nuxt-link> to save your portfolio :)
          </span>
        </div>
      </div>
    </div>

    <FinancialData :tickers="tickers" :from-date="fromDate" :to-date="toDate" />
  </div>
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
const tickers = p?.positions.length ? p.positions.map(p => p.ticker) : ['TSLA']
const fromDate = session.value?.startDate || oneMonthAgo
const toDate = session.value?.endDate || currentTime

const route = useRoute()
const user = useCurrentUser()
</script>
