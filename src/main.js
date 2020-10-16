import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router.js'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/style.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
