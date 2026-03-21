import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [vue(), tailwindcss()],
    server: {
        host: '0.0.0.0',
        port: 8080,

        // proxy: {
        //     '/api': {
        //         target: 'http://127.0.0.1:8080',
        //         changeOrigin: true,
        //         secure: false
        //     }
        // }
    }
})
