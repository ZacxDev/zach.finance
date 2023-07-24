<template>
  <div>
    <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <header class="text-center mb-4">
        <h1 class="text-5xl font-bold mb-4">
          {{ title }}
        </h1>
      </header>
      <div class="flex justify-center mb-4">
        <div class="w-1/4">
          <AssetSearch />
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <nuxt-link
          :to="localePath({ name: 'volatility' })"
          class="card w-1/6 cursor-pointer transition-shadow hover:shadow-green-700 hover:shadow-md"
        >
          <div class="card-body">
            <div class="flex flex-col items-center gap-2">
              <ScaleIcon />
              <h3 class="text-xl text-center">
                {{ $t('indexVolatilityTools') }}
              </h3>
            </div>
          </div>
        </nuxt-link>
        <nuxt-link
          :to="localePath({ name: 'assets' })"
          class="card w-1/6 cursor-pointer transition-shadow hover:shadow-green-700 hover:shadow-md"
        >
          <div class="card-body">
            <div class="flex flex-col items-center gap-2">
              <DollarIcon />
              <h3 class="text-xl text-center">
                {{ $t('indexFinancials') }}
              </h3>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const { t } = useI18n()
    const localePath = useLocalePath()

    return {
      title: t('indexWelcome'),
      localePath
    }
  }
}

</script>
