import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'
import store from '../store'

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: ()=> import('@/views/Portfolio')
    }]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})

export default router