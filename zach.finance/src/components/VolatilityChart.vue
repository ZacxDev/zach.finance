<template>
  <div>
    <h2>Volatility by Interface</h2>
    <p class="m-2">
      The % change in price for the given assets per interval, over the give
      period.
    </p>
    <form @submit.prevent="submitForm" class="flex flex-col items-center">
      <div class="flex justify-evenly w-1/2">
        <div class="flex flex-col items-center m-2">
          <div v-for="(_, index) in tickers" :key="index" class="mb-2">
            <label :for="'ticker' + index">Ticker:</label>
            <input v-model="tickers[index]" :id="'ticker' + index" type="text" required class="input input-solid" />
          </div>
          <button type="button" @click="addTickerInput" class="btn btn-secondary h-6 w-1/2">Add Ticker</button>
        </div>

        <div class="flex flex-col w-1/2">
          <div class="flex justify-between items-center">
            <label for="start">Start Date:</label>
            <input v-model="start" id="start" type="date" required class="input" />
          </div>

          <div class="flex justify-between items-center">
            <label for="end">End Date:</label>
            <input v-model="end" id="end" type="date" required class="input" />
          </div>

          <div class="flex justify-between items-center">
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

    <div ref="chart">
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
import enUS from "date-fns/locale/en-US";
import { format, subMonths } from 'date-fns'

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

      const datasets = volatilityData.map((volatility, index) => {
        const data = volatility.volatilityByInterval;
        return {
          label: `Volatility (${tickers.value[index]})`,
          data: data.map((d) => d.value),
          borderColor: `hsl(${(index * 360) / tickers.value.length}, 100%, 50%)`,
          borderWidth: 1.5,
          fill: false,
        };
      });

      chartInstance = new Chart(canvas.value.getContext("2d") as CanvasRenderingContext2D, {
        type: "line",
        data: {
          labels: volatilityData[0].volatilityByInterval.map((d) => new Date(d.startTimestamp * 1000)),
          datasets: datasets,
        },
        options: {
          scales: {
            x: {
              type: "time",
              adapters: {
                date: {
                  locale: enUS,
                },
              },
              ticks: {
                callback: function (value) {
                  return new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(value));
                },
                maxTicksLimit: 32,
              },
              min: start.value,
              max: end.value,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
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
