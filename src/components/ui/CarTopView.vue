<script setup>
import { computed, useId } from 'vue'
// Gerçekçi üstten görünüm araç şeması.
// color: araç rengi (TR ad veya hex) · wheelTones: {FL,FR,RL,RR} · points: [{x,y,tone}]
const props = defineProps({
  color: { type: String, default: '' },
  wheelTones: { type: Object, default: () => ({}) },
  points: { type: Array, default: () => [] },
  width: { type: Number, default: 180 },
})
const uid = useId()
const colorMap = {
  beyaz: '#eef1f5', siyah: '#262b33', gümüş: '#c3c8d1', gumus: '#c3c8d1', gri: '#848b97',
  antrasit: '#394049', lacivert: '#213257', 'koyu gri': '#51575f', kırmızı: '#c23a31', kirmizi: '#c23a31',
  mavi: '#1f6ff5', yeşil: '#2e7d55', yesil: '#2e7d55',
}
const body = computed(() => {
  const c = (props.color || '').trim().toLowerCase()
  if (c.startsWith('#')) return c
  return colorMap[c] || '#1f6ff5'
})
const wheelColor = (t) => t || null
</script>

<template>
  <svg :width="width" viewBox="0 0 240 440" fill="none" class="mx-auto" aria-hidden="true">
    <defs>
      <!-- gövde metalik parlama -->
      <linearGradient :id="`sheen-${uid}`" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity="0.28" />
        <stop offset="0.35" stop-color="#fff" stop-opacity="0.04" />
        <stop offset="0.62" stop-color="#000" stop-opacity="0.05" />
        <stop offset="1" stop-color="#000" stop-opacity="0.26" />
      </linearGradient>
      <linearGradient :id="`vert-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity="0.16" />
        <stop offset="0.5" stop-color="#fff" stop-opacity="0" />
        <stop offset="1" stop-color="#000" stop-opacity="0.12" />
      </linearGradient>
      <!-- cam -->
      <linearGradient :id="`glass-${uid}`" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0" stop-color="#4a5a74" />
        <stop offset="1" stop-color="#28303f" />
      </linearGradient>
      <clipPath :id="`body-${uid}`">
        <path d="M74 28 C98 20 142 20 166 28 C182 34 190 58 190 98 L190 356 C190 392 176 412 148 416 L92 416 C64 412 50 392 50 356 L50 98 C50 58 58 34 74 28 Z" />
      </clipPath>
    </defs>

    <!-- zemin gölgesi -->
    <ellipse cx="120" cy="424" rx="80" ry="11" fill="#000" opacity="0.08" />

    <!-- tekerlekler (lastik + jant) -->
    <g>
      <g v-for="(w, i) in [
        { x: 30, y: 96, k: 'FL' }, { x: 186, y: 96, k: 'FR' },
        { x: 30, y: 300, k: 'RL' }, { x: 186, y: 300, k: 'RR' },
      ]" :key="i">
        <rect :x="w.x" :y="w.y" width="24" height="58" rx="11" fill="#1a1d22" />
        <rect :x="w.x + 5" :y="w.y + 14" width="14" height="30" rx="6" fill="#3a3f47" />
        <rect v-if="wheelColor(wheelTones[w.k])" :x="w.x - 3" :y="w.y - 3" width="30" height="64" rx="13"
          fill="none" :stroke="wheelColor(wheelTones[w.k])" stroke-width="3" />
      </g>
    </g>

    <!-- gövde -->
    <path d="M74 28 C98 20 142 20 166 28 C182 34 190 58 190 98 L190 356 C190 392 176 412 148 416 L92 416 C64 412 50 392 50 356 L50 98 C50 58 58 34 74 28 Z" :fill="body" />

    <!-- gövde üzerindeki ışık/gölge -->
    <g :clip-path="`url(#body-${uid})`">
      <rect x="50" y="20" width="140" height="400" :fill="`url(#sheen-${uid})`" />
      <rect x="50" y="20" width="140" height="400" :fill="`url(#vert-${uid})`" />
      <!-- orta parlama çizgisi -->
      <path d="M120 30 L120 410" stroke="#fff" stroke-opacity="0.1" stroke-width="10" />
      <!-- kaput/bagaj panel çizgileri -->
      <path d="M66 92 C96 86 144 86 174 92" stroke="#000" stroke-opacity="0.12" stroke-width="1.5" fill="none" />
      <path d="M66 352 C96 358 144 358 174 352" stroke="#000" stroke-opacity="0.12" stroke-width="1.5" fill="none" />
      <!-- kapı çizgileri -->
      <path d="M52 210 H74 M188 210 H166" stroke="#000" stroke-opacity="0.14" stroke-width="1.5" />
      <path d="M50 248 H74 M190 248 H166" stroke="#000" stroke-opacity="0.1" stroke-width="1.5" />
    </g>

    <!-- ön cam -->
    <path d="M78 118 C100 110 140 110 162 118 L172 150 C140 142 100 142 68 150 Z" :fill="`url(#glass-${uid})`" />
    <path d="M86 122 L150 140" stroke="#fff" stroke-opacity="0.18" stroke-width="3" stroke-linecap="round" />
    <!-- tavan -->
    <rect x="70" y="152" width="100" height="146" rx="18" :fill="body" />
    <rect x="70" y="152" width="100" height="146" rx="18" fill="#fff" fill-opacity="0.05" />
    <!-- yan camlar -->
    <path d="M64 158 C62 200 62 250 66 294 L72 292 C68 248 68 202 70 160 Z" :fill="`url(#glass-${uid})`" opacity="0.9" />
    <path d="M176 158 C178 200 178 250 174 294 L168 292 C172 248 172 202 170 160 Z" :fill="`url(#glass-${uid})`" opacity="0.9" />
    <!-- arka cam -->
    <path d="M70 300 C100 308 140 308 170 300 L160 330 C140 322 100 322 80 330 Z" :fill="`url(#glass-${uid})`" />

    <!-- aynalar -->
    <path d="M48 150 C40 150 36 156 40 162 L50 160 Z" :fill="body" />
    <path d="M192 150 C200 150 204 156 200 162 L190 160 Z" :fill="body" />

    <!-- farlar / stoplar -->
    <path d="M62 44 C70 36 82 36 90 40 L88 52 C80 48 70 48 62 54 Z" fill="#f4f8ff" opacity="0.92" />
    <path d="M178 44 C170 36 158 36 150 40 L152 52 C160 48 170 48 178 54 Z" fill="#f4f8ff" opacity="0.92" />
    <rect x="64" y="392" width="30" height="10" rx="5" fill="#e0322a" opacity="0.9" />
    <rect x="146" y="392" width="30" height="10" rx="5" fill="#e0322a" opacity="0.9" />

    <!-- işaret noktaları (hasar vb.) -->
    <g v-for="(p, i) in points" :key="'p' + i">
      <circle :cx="p.x" :cy="p.y" r="13" :fill="p.tone || 'var(--color-danger)'" opacity="0.22" />
      <circle :cx="p.x" :cy="p.y" r="6" :fill="p.tone || 'var(--color-danger)'" stroke="#fff" stroke-width="1.5" />
    </g>
  </svg>
</template>
