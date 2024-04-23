
const routes = require('./routes/index.js');
export default {
  ssr: false,
  target: 'static',
  mode: 'spa',
  base: '/',
  server: {
    port: 3000,
    host: '0.0.0.0',
},
  head: {
    title: 'online-retail-shopping',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
  ],
  plugins: [
    { src: '~/plugins/axios.js' },
  ],
  components: true,
  buildModules: [
  ],
  modules: [
    'bootstrap-vue/nuxt',
  ],
  router: {
    base: '/',
    extendRoutes(nuxtRoutes, resolve) {
        routes.forEach((route) => {
            nuxtRoutes.push({
                path: route.path,
                component: resolve(__dirname, route.component),
                chunkName : route.component
            });
        });
        
    }
},
}
