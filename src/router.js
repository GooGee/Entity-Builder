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
            component: require('@/pages/Home').default,
        },
        {
            path: '/project',
            name: 'project',
            component: require('@/pages/Project').default,
        },
        {
            path: '/preset',
            name: 'preset',
            component: require('@/pages/Preset').default,
        },
        {
            path: '/script',
            name: 'script',
            component: require('@/pages/Script').default,
        },
        {
            path: '/template',
            name: 'template',
            component: require('@/pages/Template').default,
        },
        {
            path: '/layer',
            name: 'layer',
            component: require('@/pages/Layer').default,
        },
        {
            path: '/entity',
            name: 'entity',
            component: require('@/pages/Entity').default,
        },
        {
            path: '/table',
            name: 'table',
            component: require('@/pages/Migration').default,
        },
        {
            path: '/model',
            name: 'model',
            component: require('@/pages/Model').default,
        },
        {
            path: '/factory',
            name: 'factory',
            component: require('@/pages/Factory').default,
        },
        {
            path: '/file',
            name: 'file',
            component: require('@/pages/File').default,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
})
