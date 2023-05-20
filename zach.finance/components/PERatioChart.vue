<!-- PERatioChart.vue -->
<template>
  <div>
    <canvas ref="peChart" />
  </div>
</template>

<script lang="ts" setup>
import { Chart, LineController, LinearScale, PointElement, TimeScale } from 'chart.js'

Chart.register(LineController, LinearScale, PointElement, TimeScale)

const props = defineProps({
  assets: Array
})

onMounted(() => {
  props.assets.forEach((asset, index) => {
    const peData = asset.historicalPERatios.map(hpe => ({
      x: hpe.date,
      y: hpe.pe
    }))

    new Chart(document.getElementById('peChart-' + index), {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'P/E Ratio',
            data: peData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)'
          }
        ]
      },
      options: {
        scales: {
          x: { type: 'time' },
          y: { beginAtZero: true }
        }
      }
    })
  })
})
</script>
