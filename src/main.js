import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'leaflet/dist/leaflet.css'
import './assets/main.css'

// Kaydedilmiş tema tercihini erken uygula (FOUC önlemek için)
const saved = localStorage.getItem('fr-theme')
if (saved) document.documentElement.setAttribute('data-theme', saved)

createApp(App).use(createPinia()).use(router).mount('#app')
