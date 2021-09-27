export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'VHEC - Blog',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.ico' },
      {
        rel: 'stylesheet',
        ref: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
      },
    ],
  },

  // config server
  server: {
    port: 8080,
    host: '0.0.0.0',
    timing: false,
  },
  axios: {
    baseURL: 'http://localhost:3000',
    https: true,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    // CSS file in the project
    '@/assets/css/main.css',
    // SCSS file in the project
    '@/assets/css/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/element-ui' },
    { src: '~/plugins/bootstrap' },
    { src: '~/plugins/tiptap', mode: 'client' },
    { src: '~/plugins/common/common-function', mode: 'client' },
    { src: '~/plugins/prismjs' },
    // { src: '~/plugins/connection', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios', 'vue-social-sharing/nuxt'],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
}
