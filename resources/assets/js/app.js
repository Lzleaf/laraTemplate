
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import iView from 'iview'
import i18n from './locale'
import App from './app.vue'
import VueRouter from 'vue-router'
import 'iview/dist/styles/iview.css'
import router from './router'
import store from './store'
import config from './config'

Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueRouter)

Vue.config.productionTip = false

Vue.prototype.$config = config

const app = new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
});
