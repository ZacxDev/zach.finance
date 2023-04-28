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

  apollo: {
    clients: {
      default: {
        httpEndpoint: isProd ? 'https://api.finsune.com/query' : 'http://localhost:59001/query',
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
  },

  i18n: {
    baseUrl: 'https://zach.finance',
    vueI18n: './i18n.config.ts',
    locales: [
      {
        code: 'en',
        iso: 'en-US'
      },
      {
        code: 'es',
        iso: 'es-AR'
      },
      {
        code: 'es',
        iso: 'es-CO'
      },
      {
        code: 'es',
        iso: 'es-LA'
      }
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true
    }
  }

})
