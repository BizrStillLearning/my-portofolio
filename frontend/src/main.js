import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import * as lucide from 'lucide-vue-next'
import { MotionPlugin } from '@vueuse/motion'
import i18n from './il8n.js'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

const app = createApp(App)
const pinia = createPinia()

Object.entries(lucide).forEach(([name, component]) => {
    app.component(name, component)
})

app.use(MotionPlugin)
app.use(pinia)
app.use(i18n)
app.use(router)

let isAuthReady = false
onAuthStateChanged(auth, () => {
    if (!isAuthReady) {
        isAuthReady = true
    }
})

app.mount('#app')