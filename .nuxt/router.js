import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _194efb67 = () => interopDefault(import('../node_modules/@nuxt/vue-app/template/pages/index.vue' /* webpackChunkName: "" */))
const _73522e0b = () => interopDefault(import('../project/index.vue' /* webpackChunkName: "project/index.vue" */))
const _60418465 = () => interopDefault(import('../project/homePage.vue' /* webpackChunkName: "project/homePage.vue" */))
const _44cb960d = () => interopDefault(import('../project/productShopping/list.vue' /* webpackChunkName: "project/productShopping/list.vue" */))
const _23d20176 = () => interopDefault(import('../project/addProduct/productCart.vue' /* webpackChunkName: "project/addProduct/productCart.vue" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "",
    component: _194efb67
  }, {
    path: "/",
    component: _73522e0b
  }, {
    path: "/",
    component: _73522e0b
  }, {
    path: "/dashboard",
    component: _60418465
  }, {
    path: "/productShopping",
    component: _44cb960d
  }, {
    path: "/addProduct",
    component: _23d20176
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
