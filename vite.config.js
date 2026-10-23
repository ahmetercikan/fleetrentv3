import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
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
})
