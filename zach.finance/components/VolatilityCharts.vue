<template>
  <div class="mb-4">
    <div class="flex justify-center my-4">
      <div class="card w-11/12 max-w-none">
        <div class="card-body">
          <h2 class="text-4xl text-center">
            {{ $t('volatilityByInterval') }}
          </h2>
          <p class="m-2 text-center">
            {{ $t('volatilityDescription') }}
          </p>
          <form class="flex flex-col items-center">
            <div class="flex flex-col w-full md:w-1/2">
              <div class="flex flex-col justify-between items-center gap-2">
                <label for="interval">{{ $t('interval') }}:</label>
                <div class="btn-group btn-group-scrollable shadow-lg shadow-gray-800">
                  <button type="button" :class="{ btn: true, ['btn-active']: interval === '1d' }" @click="interval = '1d'">
                    {{ $t('daily') }}
                  </button>
                  <button type="button" :class="{ btn: true, ['btn-active']: interval === '1wk' }" @click="interval = '1wk'">
                    {{ $t('weekly') }}
                  </button>
                  <button type="button" :class="{ btn: true, ['btn-active']: interval === '1mo' }" @click="interval = '1mo'">
                    {{ $t('monthly') }}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="startFormatted && endFormatted">
      <VolatilityLines :data="result" :start="startFormatted" :end="endFormatted" />
    </div>
    <p v-if="error">
      {{ $t('somethingWentWrong') }}
    </p>

    <VolatilitySummaryBoxWhisker :data="result" />

  </div>
</template>

<script lang="ts" scoped>
import { ref } from 'vue'
import { registerables, Chart } from 'chart.js'
// eslint-disable-nextline
import 'chartjs-adapter-date-fns'
import { GetSessionQuery, GetVolatilityDocument, Portfolio, Volatility } from '~/gql/graphql'
import { useSession } from '~/store/session'
import { usePortfolios } from '~/store/portfolio'

Chart.register(...registerables)

export default {
  setup() {
    const { portfolios, onResult: onPortfoliosResult } = usePortfolios()
    const portfolio = ref<Portfolio | null>(portfolios.value?.getPortfolios[0] || null)
    const { getSession } = useSession()
    const { result: sessionResult } = getSession()
    const start = sessionResult.value?.getSession.startDate
    const end = sessionResult.value?.getSession.endDate

    const startFormatted = start ? new Date(start * 1000).toString() : undefined
    const endFormatted = end ? new Date(end * 1000).toString() : undefined

    const interval = ref('1d')

    const { result, onResult: onGetVolatilityResult, onError, error, load } = useLazyQuery(GetVolatilityDocument)
    const volatility = ref<Volatility[] | undefined>(result.value?.getVolatility)

    const initialize = (newPortfolio: Portfolio, newSession: GetSessionQuery) => {
      const tickers = newPortfolio.positions.map(p => p.ticker)
      const start = newSession.getSession.startDate
      const end = newSession.getSession.endDate

      load(GetVolatilityDocument, {
        tickers,
        start: new Date(start).getTime(),
        end: new Date(end).getTime(),
        interval: interval.value
      })
    }

    onMounted(() => {
      if (!volatility.value && portfolio.value && sessionResult.value) {
        initialize(portfolio.value, sessionResult.value)
      }
    })

    watch([portfolio, sessionResult], ([newPortfolio, newSession]) => {
      if (newPortfolio && newSession) {
        initialize(newPortfolio, newSession)
      }
    })

    onGetVolatilityResult((v) => {
      if (v.data) {
        volatility.value = v.data.getVolatility
      }
    })

    onPortfoliosResult((p) => {
      portfolio.value = p.data.getPortfolios[0]
    })

    onError((error) => {
      console.error('An error occurred:', error)
    })

    watch(interval, () => {
      if (portfolio.value && sessionResult.value) {
        initialize(portfolio.value, sessionResult.value)
      }
    })

    return {
      interval,
      result: volatility,
      error,
      startFormatted,
      endFormatted
    }
  }
}
</script>
