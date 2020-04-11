import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import nunjucks from 'nunjucks'
import App from './App.vue'
import router from './router.js'

import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(VueRouter)

nunjucks.configure({ autoescape: false })

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
