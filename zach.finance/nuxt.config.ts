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
    'nuxt-gtag',
    '@sidebase/nuxt-session',
    'nuxt-vuefire'
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: isProd ? 'https://api.finsune.com/query' : 'http://localhost:59001/query',
        tokenName: 'session',
        httpLinkOptions: {
          headers: {
            origin: 'http://localhost:3000'
          },
          credentials: 'include'
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
    },
    customRoutes: 'config',
    pages: {
      index: {
        en: '/',
        es: '/'
      },
      volatility: {
        en: '/volatility',
        es: '/volatilidad'
      },
      assets: {
        en: '/assets',
        es: '/assetos'
      }
    }
  },

  vuefire: {
    auth: true,
    config: {
      apiKey: 'AIzaSyC6Yfn46c2ZXEq9XyQJxCo5W2YLrrRymTU',
      authDomain: 'finsune-ac309.firebaseapp.com',
      projectId: 'finsune-ac309',
      storageBucket: 'finsune-ac309.appspot.com',
      messagingSenderId: '931487528812',
      appId: '1:931487528812:web:ae690a3e3b39eb3c272549',
      measurementId: 'G-NQ5QSYJ39D'
    },
    admin: {
      serviceAccount: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL
      }
    }
  }

})
