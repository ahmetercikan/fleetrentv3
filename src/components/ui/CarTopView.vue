<script setup>
// Üstten görünüm araç şeması — lastik pozisyonu / hasar işaretleme için.
// wheelTones: { FL, FR, RL, RR } → renk (ör. var(--color-success)); verilmezse nötr.
// points: [{ x, y, tone }] gövde üzerinde hasar/işaret noktaları (0-220 / 0-420 koordinat).
defineProps({
  wheelTones: { type: Object, default: () => ({}) },
  points: { type: Array, default: () => [] },
  width: { type: Number, default: 180 },
})
const wheelColor = (t) => t || 'var(--color-ink-faint)'
</script>

<template>
  <svg :width="width" viewBox="0 0 220 420" fill="none" class="mx-auto" aria-hidden="true">
    <!-- gölge -->
    <ellipse cx="110" cy="406" rx="78" ry="10" fill="var(--color-ink)" opacity="0.06" />

    <!-- tekerlekler -->
    <g>
      <rect x="18" y="86" width="22" height="52" rx="9" :fill="wheelColor(wheelTones.FL)" />
      <rect x="180" y="86" width="22" height="52" rx="9" :fill="wheelColor(wheelTones.FR)" />
      <rect x="18" y="282" width="22" height="52" rx="9" :fill="wheelColor(wheelTones.RL)" />
      <rect x="180" y="282" width="22" height="52" rx="9" :fill="wheelColor(wheelTones.RR)" />
    </g>

    <!-- gövde -->
    <defs>
      <linearGradient id="car-body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="var(--color-brand-500)" />
        <stop offset="1" stop-color="var(--color-brand-700)" />
      </linearGradient>
    </defs>
    <path
      d="M50 70
         C50 40 72 22 110 22
         C148 22 170 40 170 70
         L170 350
         C170 380 148 398 110 398
         C72 398 50 380 50 350
         Z"
      fill="url(#car-body)" />

    <!-- ön cam -->
    <path d="M64 96 C80 84 140 84 156 96 L150 140 C124 132 96 132 70 140 Z" fill="#ffffff" opacity="0.88" />
    <!-- tavan -->
    <rect x="70" y="150" width="80" height="120" rx="16" fill="#ffffff" opacity="0.14" />
    <!-- arka cam -->
    <path d="M70 300 C96 292 124 292 150 300 L156 340 C140 352 80 352 64 340 Z" fill="#ffffff" opacity="0.7" />

    <!-- far / stop -->
    <rect x="66" y="32" width="26" height="9" rx="4" fill="#fff" opacity="0.9" />
    <rect x="128" y="32" width="26" height="9" rx="4" fill="#fff" opacity="0.9" />
    <rect x="66" y="382" width="26" height="8" rx="4" fill="#ff5a5a" opacity="0.85" />
    <rect x="128" y="382" width="26" height="8" rx="4" fill="#ff5a5a" opacity="0.85" />

    <!-- aynalar -->
    <rect x="40" y="104" width="14" height="10" rx="4" fill="url(#car-body)" />
    <rect x="166" y="104" width="14" height="10" rx="4" fill="url(#car-body)" />

    <!-- işaret noktaları (hasar vb.) -->
    <g v-for="(p, i) in points" :key="i">
      <circle :cx="p.x" :cy="p.y" r="11" :fill="p.tone || 'var(--color-danger)'" opacity="0.25" />
      <circle :cx="p.x" :cy="p.y" r="5" :fill="p.tone || 'var(--color-danger)'" />
    </g>
  </svg>
</template>
