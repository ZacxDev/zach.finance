<template>
  <div>
    <form @submit.prevent="submitForm">
      <label for="ticker">Ticker:</label>
      <input v-model="ticker" id="ticker" type="text" required />

      <label for="start">Start Date:</label>
      <input v-model="start" id="start" type="date" required />

      <label for="end">End Date:</label>
      <input v-model="end" id="end" type="date" required />

      <label for="interval">Interval:</label>
      <select v-model="interval" id="interval" required>
        <option value="1d">Daily</option>
        <option value="1wk">Weekly</option>
        <option value="1mo">Monthly</option>
      </select>

      <button type="submit">Get Volatility</button>
    </form>

    <div ref="chart"></div>
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import * as d3 from "d3";
import { graphql } from '../gql'
import { Numeric } from "d3";
import { VolatilityForInterval } from "../gql/graphql";

export default {
  setup() {
    const ticker = ref("TSLA");
    const start = ref("2023-04-01");
    const end = ref("2023-04-19");
    const interval = ref("1d");
    const chart = ref(null);

    const { result, onError, refetch, error, loading } = useQuery(
      graphql(/* GraphQL */ `
    query getVolatility($ticker: String!, $start: Int!, $end: Int!, $interval: String!) {
      getVolatility(ticker: $ticker, start: $start, end: $end, interval: $interval) {
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
        ticker: ticker.value,
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
      if (!result.value) return;

      const data = result.value.getVolatility.volatilityByInterval;

      // Clear the chart container
      d3.select(chart.value).html("");

      // Set up dimensions and margins for the chart
      const width = 900;
      const height = 500;
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };

      // Create the SVG container for the chart
      const svg = d3
        .select(chart.value)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Set up the x-scale, y-scale, and axes
      const xScale = d3
        .scaleTime()
        .domain((d3.extent(data, (d) => new Date(d.startTimestamp * 1000)) as [Date, Date]))
        .range([0, width - margin.left - margin.right]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value) as Numeric])
        .range([height - margin.top - margin.bottom, 0]);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(xAxis);

      svg.append("g").call(yAxis);

      // Set up the line generator
      const line = d3
        .line<VolatilityForInterval>()
        .x((d) => xScale(new Date(d.startTimestamp * 1000)))
        .y((d) => yScale(d.value));

      // Bind the data to the line generator and render the chart
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    };

    return {
      ticker,
      start,
      end,
      interval,
      chart,
      result,
      submitForm,
      drawChart,
      error,
      loading,
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

