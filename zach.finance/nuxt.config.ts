// https://nuxt.com/docs/api/configuration/nuxt-config
const isProd = process.env.NODE_ENV === 'production'
export default defineNuxtConfig({
  typescript: {
    strict: true
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
    '@nuxtjs/i18n',
    'nuxt-gtag'
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'zach.finance - the best free financial tools in the universe',
      meta: [
        {
          name: 'og:title',
          content: 'zach.finance'
        },
        {
          name: 'og:description',
          content: 'A collection of free and amazing financial analysis tools.'
        },
        {
          name: 'og:image',
          content: '/apple-touch-icon.png'
        }
      ]
    }
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: isProd ? 'https://api.zach.finance/query' : 'http://localhost:59001/query',
        httpLinkOptions: {
          headers: {
            origin: 'http://localhost:3000'
          }
        }
      }
    }
  },

  gtag: {
    id: 'G-P5PW05HWYM'
  }
})
