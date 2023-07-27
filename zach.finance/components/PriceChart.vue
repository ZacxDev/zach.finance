<!-- PriceChart.vue -->
<template>
  <div>
    <canvas ref="canvas" style="max-height: 720px;" />
  </div>
</template>

<script lang="ts" setup>
import { Chart, ChartConfiguration, LineController, LinearScale, PointElement, TimeScale } from 'chart.js'
import { ChartGridColor } from '~/fn/chart'
import { GetAssetsQuery } from '~/gql/graphql'

Chart.register(LineController, LinearScale, PointElement, TimeScale)

const props = defineProps({
  assets: {
    type: Array as PropType<GetAssetsQuery['getAssets']>,
    required: true,
    default: () => []
  },
  start: {
    type: Number,
    required: true
  },
  end: {
    type: Number,
    required: true
  }
})
let chartInstance: Chart<'line', { x: string, y: number }[], Date> | null = null
const canvas = ref<null | HTMLCanvasElement>(null)

const draw = (assets: GetAssetsQuery['getAssets']) => {
  const datasets = assets.map((asset, index) => {
    const vals = asset.historicalPrices.map(h => ({
      x: h.date,
      y: h.close
    }))

    return {
      label: `Price (${asset.ticker})`,
      data: vals,
      borderColor: `hsl(${(index * 360) / assets.length}, 100%, 50%)`,
      borderWidth: 1.5,
      fill: false
    }
  })

  if (canvas.value == null) {
    return
  }

  if (chartInstance) {
    chartInstance.destroy()
  }

  const cfg: ChartConfiguration<'line', { x: string, y: number }[], Date> = {
    type: 'line',
    data: {
      datasets
    },
    options: {
      scales: {
        x: {
          type: 'time',
          min: props.start,
          max: props.end,
          grid: {
            color: ChartGridColor
          },
          ticks: {
            callback: function (value) {
              return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }).format(new Date(value))
            },
            maxTicksLimit: 100
          }
        },
        y: {
          beginAtZero: false,
          grid: {
            color: ChartGridColor
          }
        }
      }
    }
  }

  chartInstance = new Chart(canvas.value.getContext('2d') as CanvasRenderingContext2D, cfg)
}

onMounted(() => draw(props.assets))

watch(() => props.assets, newVal => draw(newVal))
</script>
