const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const pkg = require('./package')
require('dotenv').config()

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
      {
        src: `https://www.google.com/recaptcha/api.js?render=${
          process.env.RECAPTCHA_KEY
        }`
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // { src: '@/plugins/vuetify', mode: 'client' },
    '@/plugins/vuetify',
    '@/plugins/etc',
    '@/plugins/firebase'
    // { src: '~plugins/firebase.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/dotenv',
    'vuetify-dialog/nuxt',
    '@nuxtjs/recaptcha'
    // ['vuetify-dialog/nuxt', { property: '$dialog' }] // 'vuetify-dialog/nuxt'
  ],
  // vuetifyDialog: {
  //   property: '$dialog'
  // },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL:
      process.env.NODE_ENV === 'production'
        ? `https://${process.env.FIREBASE_REGION}-${
            process.env.FIREBASE_PROJECTID
          }.cloudfunctions.net`
        : `http://localhost:5000/${process.env.FIREBASE_PROJECTID}/${
            process.env.FIREBASE_REGION
          }`
  },
  router: {
    middleware: 'auth'
  },
  recaptcha: {
    hideBadge: true,
    siteKey: process.env.RECAPTCHA_KEY,
    version: 3
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  serverMiddleware: [{ path: '/api', handler: '~/api/index.js' }],
  generate: {
    dir: 'public'
  },
  env: {
    FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
    FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    RECAPTCHA_KEY: process.env.RECAPTCHA_KEY
  }
}
