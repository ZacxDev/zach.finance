<template>
  <div>
    <div class="flex justify-center">
      <div class="card w-11/12 max-w-none">
        <div class="card-body">
          <div>
            <h3 class="text-4xl text-center">
              {{ $t('volatilitySummary') }}
            </h3>
            <canvas ref="canvas" style="max-height: 1080px; min-height: 995px;" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Chart } from 'chart.js'
import { BoxPlotChart } from '@sgratzl/chartjs-chart-boxplot'
import { calculateFiveSummaryStatistics } from '~/fn/standard-deviation'
import { Volatility } from '~/gql/graphql'
import { ChartGridColor } from '~/fn/chart'

export default {
  props: {
    data: {
      type: Array as PropType<Volatility[]>,
      default: () => []
    }
  },
  setup(props) {
    const canvas = ref<null | HTMLCanvasElement>(null)
    let chart: Chart | null = null
    const { t } = useI18n()

    const loadChart = () => {
      if (canvas.value == null) {
        return
      }

      const labels = props.data.map(item => item.ticker)
      const fiveSummaryStatistics = props.data.map(item =>
        calculateFiveSummaryStatistics(item.volatilityByInterval.map(interval => interval.value))
      )
      const max = fiveSummaryStatistics.reduce(
        (acc, curr) => {
          // Filter out 1 as it is too much of an outliner to be useful (100% variance)
          const nums = curr.filter(n => n !== 1)
          const m = Math.max(...nums)
          return m > acc ? m : acc
        },
        0
      )

      const chartData = {
        labels,
        datasets: [
          {
            label: t('volatilitySummary'),
            data: fiveSummaryStatistics,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      }

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: ChartGridColor
            }
          },
          y: {
            beginAtZero: true,
            max,
            grid: {
              color: ChartGridColor
            }
          }
        }
      }

      if (chart) {
        chart.destroy()
      }

      chart = new BoxPlotChart(canvas.value.getContext('2d') as CanvasRenderingContext2D, {
        data: chartData,
        options
      })
    }

    return {
      chart,
      loadChart,
      canvas
    }
  },
  watch: {
    data: {
      handler() {
        this.loadChart()
      }
    }
  },
  mounted() {
    this.loadChart()
  }
}
</script>
