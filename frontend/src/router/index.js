import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase' // Ganti import firebase menjadi supabase

const routes = [
    { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
    {
        path: '/admin-dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/AdminDashboard.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/:lang(en|id|jp|kr|zh|es)?',
        component: () => import('../views/Home.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
    // Mengambil session user saat ini dari Supabase
    const { data: { session } } = await supabase.auth.getSession()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !session) {
        // Jika butuh login tapi tidak ada sesi, arahkan ke login
        next('/login')
    } else if (to.name === 'Login' && session) {
        // Jika sudah login tapi mencoba akses halaman login, lempar ke dashboard
        next('/admin-dashboard')
    } else {
        next()
    }
})

export default router