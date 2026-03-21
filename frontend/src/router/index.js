import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/:lang(en|id|jp|kr|zh|es)?', // Prefix bahasa opsional
        component: () => import('../views/Home.vue'),
        beforeEnter: (to, from, next) => {
            const lang = to.params.lang;
            // Jika ada param lang, simpan ke localStorage
            if (lang) localStorage.setItem('user_lang', lang);
            next();
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
