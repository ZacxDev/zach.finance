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
          <form class="flex flex-col items-center" @submit.prevent="submitForm">
            <div class="flex flex-wrap justify-between mb-4 xl:w-2/6 w-full">
              <div class="flex flex-col items-center mb-4 lg:mb-2 w-full md:w-5/12">
                <label>{{ $t('tickers') }}</label>
                <div v-for="(_, index) in tickers" :key="index" class="mb-2">
                  <input :id="'ticker' + index" v-model="tickers[index]" type="text" required class="input">
                </div>
                <button type="button" class="btn btn-secondary h-6 w-full lg:w-1/2" @click="addTickerInput">
                  {{ $t('addTicker') }}
                </button>
              </div>

              <div class="flex flex-col w-full md:w-5/12">
                <div class="flex flex-col justify-between items-center mb-2">
                  <label for="start">{{ $t('startDate') }}:</label>
                  <input id="start" v-model="start" type="date" required class="input">
                </div>

                <div class="flex flex-col justify-between items-center mb-2">
                  <label for="end">{{ $t('endDate') }}:</label>
                  <input id="end" v-model="end" type="date" required class="input">
                </div>

                <div class="flex flex-col justify-between items-center mb-2">
                  <label for="interval">{{ $t('interval') }}:</label>
                  <select id="interval" v-model="interval" required class="select">
                    <option value="1d">
                      {{ $t('daily') }}
                    </option>
                    <option value="1wk">
                      {{ $t('weekly') }}
                    </option>
                    <option value="1mo">
                      {{ $t('monthly') }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary">
              {{ $t('getVolatility') }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <VolatilityLines :data="result?.getVolatility" :start="start" :end="end" />
    <p v-if="error">
      {{ $t('somethingWentWrong') }}
    </p>

    <div v-if="result?.getVolatility">
      <VolatilitySummaryBoxWhisker :data="result.getVolatility" />
    </div>

  </div>
</template>

<script lang="ts" scoped>
import { ref } from 'vue'
import { registerables, Chart } from 'chart.js'
// eslint-disable-nextline
import 'chartjs-adapter-date-fns'
import { format, subMonths } from 'date-fns'
import { GetVolatilityDocument } from '~/gql/graphql'

Chart.register(...registerables)

const oneMonthAgo = format(subMonths(new Date(), 1), 'yyyy-MM-dd')
const today = format(new Date(), 'yyyy-MM-dd')

export default {
  setup() {
    const tickers = ref(['TSLA', 'AAPL'])
    const start = ref(oneMonthAgo)
    const end = ref(today)
    const interval = ref('1d')

    const addTickerInput = () => {
      tickers.value.push('')
    }

    const { result, onError, refetch, error } = useQuery(
      GetVolatilityDocument,
      () => ({
        tickers: tickers.value.filter(t => t !== ''),
        start: new Date(start.value).getTime() / 1000,
        end: new Date(end.value).getTime() / 1000,
        interval: interval.value
      })
    )

    onError((error) => {
      console.error('An error occurred:', error)
    })

    const submitForm = () => {
      refetch()
    }

    return {
      tickers,
      addTickerInput,
      start,
      end,
      interval,
      result,
      submitForm,
      error
    }
  }
}
</script>
