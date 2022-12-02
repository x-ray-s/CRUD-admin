import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Model from './Model.vue'
import Login from './Login.vue'
import Home from './Home.vue'
import Read from './Read.vue'

export const routes = [
    { path: '/', component: Home },
    { path: '/:model', component: Model },
    { path: '/:model/:id', component: Read },
    { path: '/login', component: Login, name: 'Login' },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    const store = useAuthStore()
    if (!store.token && to.name !== 'Login') {
        // 将用户重定向到登录页面
        return { name: 'Login' }
    }
    if (to.name === 'Login' && store.token) {
        return { path: '/' }
    }
})
