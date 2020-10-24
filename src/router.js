import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: require('@/view/Home').default,
        },
        {
            path: '/entity',
            name: 'entity',
            component: require('@/view/EntityPage').default,
        },
        {
            path: '/layer',
            name: 'layer',
            component: require('@/view/LayerPage').default,
        },
        {
            path: '/preset',
            name: 'preset',
            component: require('@/view/PresetPage').default,
        },
        {
            path: '/project',
            name: 'project',
            component: require('@/view/ProjectPage').default,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
})
