<template>
  <div class="flex justify-center mb-4">
    <div class="card w-11/12 max-w-none">
      <div class="card-body">
        <div>
          <h3 class="text-4xl text-center">
            Volatility
          </h3>
          <canvas ref="canvas" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { ref } from 'vue'
import { registerables, Chart } from 'chart.js'
// eslint-disable-nextline
import 'chartjs-adapter-date-fns'
import { getVolatilityChart } from '@/fn/chart'
import { Volatility } from '~/gql/graphql'

Chart.register(...registerables)

export default {
  props: {
    data: {
      type: Array as PropType<Volatility[]>,
      required: true,
      default: () => []
    },
    start: {
      type: String,
      required: true,
      default: ''
    },
    end: {
      type: String,
      required: true,
      default: ''
    }
  },
  setup(props) {
    const canvas = ref<null | HTMLCanvasElement>(null)
    let chartInstance: Chart | null = null

    const drawChart = () => {
      if (canvas.value === null || props.data.length === 0) { return }

      if (chartInstance) {
        chartInstance.destroy()
      }

      const chartData = getVolatilityChart(props.data, props.start, props.end)

      chartInstance = new Chart(canvas.value.getContext('2d') as CanvasRenderingContext2D, chartData)
    }

    return {
      canvas,
      drawChart
    }
  },
  watch: {
    data: {
      handler() {
        this.drawChart()
      }
    }
  },
  mounted() {
    this.drawChart()
  }
}
</script>
