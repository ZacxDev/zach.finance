<template>
  <div>
    <div class="flex justify-center mb-4">
      <div class="card w-4/6 max-w-none">
        <div class="card-body">
          <h2 class="text-4xl">Volatility by Interval</h2>
          <p class="m-2">
            The % change in price for the given assets per interval, over the give
            period.
          </p>
          <form @submit.prevent="submitForm" class="flex flex-col items-center">
            <div class="flex justify-evenly w-full mb-4">
              <div class="flex flex-col items-center m-2">
                <label>Tickers</label>
                <div v-for="(_, index) in tickers" :key="index" class="mb-2">
                  <input v-model="tickers[index]" :id="'ticker' + index" type="text" required class="input" />
                </div>
                <button type="button" @click="addTickerInput" class="btn btn-secondary h-6 w-1/2">Add Ticker</button>
              </div>

              <div class="flex flex-col w-1/2">
                <div class="flex flex-col justify-between items-center mb-2">
                  <label for="start">Start Date:</label>
                  <input v-model="start" id="start" type="date" required class="input" />
                </div>

                <div class="flex flex-col justify-between items-center mb-2">
                  <label for="end">End Date:</label>
                  <input v-model="end" id="end" type="date" required class="input" />
                </div>

                <div class="flex flex-col justify-between items-center mb-2">
                  <label for="interval">Interval:</label>
                  <select v-model="interval" id="interval" required class="select">
                    <option value="1d">Daily</option>
                    <option value="1wk">Weekly</option>
                    <option value="1mo">Monthly</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary">Get Volatility</button>
          </form>
        </div>
      </div>
    </div>

    <div ref="chart">
      <h3 class="text-4xl">Volatility</h3>
      <canvas ref="canvas"></canvas>
    </div>
    <p v-if="error">Something went wrong...</p>
  </div>
</template>

<script lang="ts" scoped>
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { graphql } from '../gql'
import { registerables } from "chart.js";
import { Chart } from "chart.js";
// eslint-disable-nextline
import "chartjs-adapter-date-fns";
import { format, subMonths } from 'date-fns'
import { getVolatilityChart } from "@functions/chart";

Chart.register(...registerables);

const oneMonthAgo = format(subMonths(new Date, 1), 'yyyy-MM-dd')
const today = format(new Date(), 'yyyy-MM-dd')

export default {
  setup() {
    const tickers = ref(["TSLA", "AAPL"]);
    const start = ref(oneMonthAgo);
    const end = ref(today);
    const interval = ref("1d");
    const canvas = ref<null | HTMLCanvasElement>(null);
    let chartInstance: Chart | null = null;

    const addTickerInput = () => {
      tickers.value.push("");
    };

    const { result, onError, refetch, error } = useQuery(
      graphql(/* GraphQL */ `
    query getVolatility($tickers: [String!]!, $start: Int!, $end: Int!, $interval: String!) {
      getVolatility(tickers: $tickers, start: $start, end: $end, interval: $interval) {
        volatilityByInterval {
          value
          startTimestamp
          endTimestamp
        }
        standardDeviation
      }
    }
  `),
      () => ({
        tickers: tickers.value,
        start: new Date(start.value).getTime() / 1000,
        end: new Date(end.value).getTime() / 1000,
        interval: interval.value,
      }),
    )

    onError((error) => {
      console.error("An error occurred:", error);
    });

    const submitForm = () => {
      refetch()
    };

    const drawChart = () => {
      if (!result.value || canvas.value === null) return;

      const volatilityData = result.value.getVolatility;

      if (chartInstance) {
        chartInstance.destroy();
      }

      const chartData = getVolatilityChart(volatilityData, tickers.value, start.value, end.value);

      chartInstance = new Chart(canvas.value.getContext("2d") as CanvasRenderingContext2D, chartData)
    };

    return {
      tickers,
      addTickerInput,
      start,
      end,
      interval,
      canvas,
      result,
      submitForm,
      drawChart,
      error,
    };
  },
  watch: {
    result: {
      handler() {
        this.drawChart();
      },
      deep: true,
    },
  },
};
</script>
