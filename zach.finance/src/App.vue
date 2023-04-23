<template>
  <VC />
</template>

<script lang="ts">
import VC from './components/VolatilityChart.vue'

export default {
  name: 'App',
  components: {
    VC,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
