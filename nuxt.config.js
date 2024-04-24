const routes = require("./routes/index.js");
export default {
  ssr: false,
  target: "static",
  mode: "spa",
  server: {
    port: 8080,
    host: "0.0.0.0",
  },
  env: {
    app_env: "Dev",
    apiBase: "https://uiexercise.theproindia.com/api"
  },
  head: {
    title: "online-retail-shopping",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script:[]
  },
  css: ['~/assets/css/styles.css'],
  plugins: [
{ src: "~/plugins/axios.js" },
  { src: '~/plugins/i18n.js' }
],
  buildModules: [],
  modules: ["bootstrap-vue/nuxt"],
  terser: {
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  router: {
    base: "/",
    extendRoutes(nuxtRoutes, resolve) {
        routes.forEach((route) => {
            nuxtRoutes.push({
                path: route.path,
                component: resolve(__dirname, route.component),
                meta: route.meta,
                chunkName : route.component
            });
        });
    }
  },
  watchOptions: {
    ignored: /node_modules/
  },
};
