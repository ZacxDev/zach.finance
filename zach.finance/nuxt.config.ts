// https://nuxt.com/docs/api/configuration/nuxt-config
const isProd = process.env.NODE_ENV === 'production'
export default defineNuxtConfig({
  typescript: {
    strict: true
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/apollo'],

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
  }
})
