<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import L from 'leaflet'
import { useUiStore } from '@/stores/ui'

const props = defineProps({
  vehicles: { type: Array, default: () => [] },
  height: { type: Number, default: 300 },
})
const ui = useUiStore()
const el = ref(null)
let map = null
let tiles = null
const markers = []

// İstanbul ilçe koordinatları — araçlar bunlara dağıtılır
const SPOTS = [
  [41.0082, 28.9784], [40.9909, 29.0303], [41.0255, 29.0137], [41.0602, 28.9877],
  [41.1106, 29.0206], [41.0422, 29.0083], [41.0166, 29.1248], [40.9357, 29.1312],
  [40.9823, 28.8721], [41.0431, 29.0088],
]
const statusColor = { active: '#10b981', service: '#f59e0b', damage: '#ef4444', replacement: '#0ea5e9' }
const statusLabel = { active: 'Çalışıyor', service: 'Serviste', damage: 'Hasarlı', replacement: 'İkame' }

// Anahtarsız OpenStreetMap tile'ları; koyu tema CSS filtresiyle sağlanır
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const ATTR = '&copy; OpenStreetMap katkıda bulunanlar'

function pinIcon(color) {
  return L.divIcon({
    className: 'veh-pin-wrap',
    html: `<span class="veh-pin" style="--c:${color}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  })
}

function addMarkers() {
  markers.forEach((m) => m.remove())
  markers.length = 0
  props.vehicles.slice(0, 10).forEach((v, i) => {
    const base = SPOTS[i % SPOTS.length]
    const lat = base[0] + (((i * 53) % 20) - 10) / 2200
    const lng = base[1] + (((i * 71) % 20) - 10) / 2200
    const color = statusColor[v.status] || '#868b96'
    const speed = v.status === 'active' ? 10 + ((v.km || 0) % 70) : 0
    const m = L.marker([lat, lng], { icon: pinIcon(color) }).addTo(map)
    m.bindPopup(
      `<div style="min-width:150px">
        <div style="font-weight:700;font-size:13px">${v.plate}</div>
        <div style="color:#667;font-size:12px;margin:2px 0 6px">${v.brand || ''} ${v.model || ''}</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:12px">
          <span style="width:8px;height:8px;border-radius:50%;background:${color};display:inline-block"></span>
          ${statusLabel[v.status] || 'Diğer'} · ${speed} km/s
        </div>
      </div>`,
      { closeButton: false }
    )
    markers.push(m)
  })
  if (markers.length) {
    const group = L.featureGroup(markers)
    map.fitBounds(group.getBounds().pad(0.3), { maxZoom: 13 })
  }
}

function applyTheme(t) {
  if (el.value) el.value.classList.toggle('veh-map-dark', t === 'dark')
}
onMounted(() => {
  map = L.map(el.value, { zoomControl: true, scrollWheelZoom: false, attributionControl: true }).setView([41.03, 29.0], 11)
  tiles = L.tileLayer(TILE_URL, { attribution: ATTR, maxZoom: 19, subdomains: 'abc' }).addTo(map)
  applyTheme(ui.theme)
  addMarkers()
  setTimeout(() => map && map.invalidateSize(), 120)
})
watch(() => ui.theme, applyTheme)
watch(() => props.vehicles, () => map && addMarkers(), { deep: true })
onBeforeUnmount(() => { if (map) { map.remove(); map = null } })
</script>

<template>
  <div ref="el" class="w-full overflow-hidden rounded-xl border border-[color:var(--color-border)]" :style="{ height: height + 'px' }" />
</template>
