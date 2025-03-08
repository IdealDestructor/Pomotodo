import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo from '../views/todoList.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'todo',
        component: Todo
    },
    {
        path: '/tomato',
        name: 'tomato',
        component: () => import('../views/tomatoClock.vue')
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
