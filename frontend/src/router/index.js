import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/admin-dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/AdminDashboard.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/:lang(en|id|jp|kr|zh|es)?',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: () => import('../views/NotFound.vue') // Pastikan file ini ada
    // }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const { data: { session } } = await supabase.auth.getSession()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !session) {
        next('/login')
    } else if (to.name === 'Login' && session) {
        next('/admin-dashboard')
    } else {
        next()
    }
})

export default router