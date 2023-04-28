<template>
  <div>
    <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">

    <Head>
      <Title>{{ title }}</Title>
      <template v-for="link in head.link" :key="link.id">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>

    <Body>
      <slot />
    </Body>

    </Html>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const title = computed(() => t('siteTitle'))
const desc = computed(() => t('siteDescription'))

useHead({
  meta: [
    { property: 'og:title', content: title },
    { property: 'og:description', content: desc },
    { property: 'og:image', content: '/apple-touch-icon.png' }
  ]
})

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})
</script>
