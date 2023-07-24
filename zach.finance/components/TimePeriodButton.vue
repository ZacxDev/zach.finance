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
  { label: 'YTD', value: 'ytd' },
  { label: '1D', value: 1, unit: 'days' },
  { label: '5D', value: 5, unit: 'days' },
  { label: '1M', value: 1, unit: 'months' },
  { label: '3M', value: 3, unit: 'months' },
  { label: '6M', value: 6, unit: 'months' },
  { label: '1Y', value: 1, unit: 'years' },
  { label: '5Y', value: 5, unit: 'years' },
  { label: 'MAX', value: 'max' }
]

function selectPeriod(period) {
  if (period.value === 'ytd') {
    const date = new Date()
    const ytd = new Date(date.getFullYear(), 0, 1)
    emitChange('YTD', 'w', ytd)
    return
  }

  if (period.value === 'max') {
    const max = new Date(1970, 0, 1)
    emitChange('Lifetime', '3m', max)
    return
  }

  const date = sub(new Date(), { [period.unit]: period.value })
  emitChange(`${period.value} ${period.unit}`, 'd', date)
}

function emitChange(prettyLabel, labelValue, date) {
  const unixTime = getUnixTime(date)
  props.onChange(prettyLabel, labelValue, unixTime * 1000)
}
</script>
