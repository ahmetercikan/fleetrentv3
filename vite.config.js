import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages depo adı (https://ahmetercikan.github.io/fleetrentv3/)
const REPO_BASE = '/fleetrentv3/'

export default defineConfig(({ command }) => ({
  // Yerel geliştirmede '/', Pages derlemesinde '/fleetrentv3/'
  base: command === 'build' ? REPO_BASE : '/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5174,
    // Gerçek backend'e bağlanmak istediğinde bu proxy'yi aç:
    // proxy: { '/api': { target: 'https://fleetrent.com.tr', changeOrigin: true } },
  },
}))
