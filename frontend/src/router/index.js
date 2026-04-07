import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            auth,
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};

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

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const user = await getCurrentUser();

    if (requiresAuth && !user) {
        next('/login');
    } else if (to.name === 'Login' && user) {
        next('/admin-dashboard');
    } else {
        next();
    }
});

export default router