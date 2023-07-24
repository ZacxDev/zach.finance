<template>
  <div>
    <div v-if="route.path !== '/' && route.path !== '/signin'" class="flex justify-center mt-4">
      <div class="w-11/12 card max-w-none p-8">
        <div v-if="user">
          <PortfolioForm v-if="route.path !== '/'" />
        </div>
        <div v-if="!user">
          <span>
            <nuxt-link :to="`${'/signin'}?returnTo=${route.path}`" class="text-blue-600">
              Sign-in
            </nuxt-link> to save your portfolio :)
          </span>
        </div>
      </div>
    </div>
    <VolatilityCharts />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const user = useCurrentUser()
</script>
