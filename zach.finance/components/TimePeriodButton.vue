<template>
  <div>
    <button
      v-for="period in periods"
      :key="period.value"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
      @click="selectPeriod(period)"
    >
      {{ period.label }}
    </button>
  </div>
</template>

<script setup>
import { sub, getUnixTime } from 'date-fns'

const props = defineProps({
  onChange: {
    type: Function,
    default: () => {}
  }
})

const periods = [
  { label: 'YTD', value: 'ytd', period: 'w' },
  { label: '1D', value: 1, unit: 'days', period: 'd' },
  { label: '5D', value: 5, unit: 'days', period: 'd' },
  { label: '1M', value: 1, unit: 'months', period: 'd' },
  { label: '3M', value: 3, unit: 'months', period: 'w' },
  { label: '6M', value: 6, unit: 'months', period: 'w' },
  { label: '1Y', value: 1, unit: 'years', period: 'w' },
  { label: '5Y', value: 5, unit: 'years', period: 'm' },
  { label: 'MAX', value: 'max', period: 'm' }
]

function selectPeriod(period) {
  if (period.value === 'ytd') {
    const date = new Date()
    const ytd = new Date(date.getFullYear(), 0, 1)
    emitChange('YTD', period.period, ytd)
    return
  }

  if (period.value === 'max') {
    const max = new Date(1970, 0, 1)
    emitChange('Lifetime', period.period, max)
    return
  }

  const date = sub(new Date(), { [period.unit]: period.value })
  emitChange(`${period.value} ${period.unit}`, period.period, date)
}

function emitChange(prettyLabel, labelValue, date) {
  const unixTime = getUnixTime(date) / 1000
  props.onChange(prettyLabel, labelValue, unixTime * 1000)
}
</script>
