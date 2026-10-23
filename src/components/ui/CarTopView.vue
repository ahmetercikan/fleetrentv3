<script setup>
import { computed } from 'vue'
// Fotogerçekçi üstten araç görseli + tıklanabilir parça işaretleri.
const props = defineProps({
  wheelTones: { type: Object, default: () => ({}) },   // {FL,FR,RL,RR} -> renk
  points: { type: Array, default: () => [] },           // [{xPct,yPct,tone}] hasar vb.
  width: { type: Number, default: 180 },
  interactive: { type: Boolean, default: false },
  activePart: { type: String, default: '' },
  color: { type: String, default: '' },                 // uyumluluk için (kullanılmıyor)
})
const emit = defineEmits(['part-click'])
const imgSrc = import.meta.env.BASE_URL + 'car-top.png'
const ratio = 747 / 360

// Araç rengine göre boyama (gümüş fotoğrafı renklendirir)
const colorMap = {
  beyaz: '#f3f4f6', siyah: '#2b2f36', gümüş: '#d7dbe0', gumus: '#d7dbe0', gri: '#9aa0ab',
  'koyu gri': '#6b7079', antrasit: '#454b55', lacivert: '#24386e', kırmızı: '#d23b32',
  kirmizi: '#d23b32', mavi: '#2f7bf0', yeşil: '#2f8f5e', yesil: '#2f8f5e', turuncu: '#e8842b',
}
const tint = computed(() => {
  const c = (props.color || '').trim().toLowerCase()
  if (!c) return null
  if (c.startsWith('#')) return c
  return colorMap[c] || null
})
const maskStyle = computed(() => ({
  maskImage: `url(${imgSrc})`, WebkitMaskImage: `url(${imgSrc})`,
  maskSize: 'contain', WebkitMaskSize: 'contain',
  maskPosition: 'center', WebkitMaskPosition: 'center',
  maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
}))

// Parça işaretleri — fotoğraf üzerindeki konumlar (yüzde)
const parts = [
  { id: 'engine', label: 'Motor', top: 14, left: 50, wheel: false },
  { id: 'FL', label: 'Sol Ön', top: 25, left: 9, wheel: true },
  { id: 'FR', label: 'Sağ Ön', top: 25, left: 91, wheel: true },
  { id: 'body', label: 'Kaporta', top: 52, left: 50, wheel: false },
  { id: 'RL', label: 'Sol Arka', top: 75, left: 9, wheel: true },
  { id: 'RR', label: 'Sağ Arka', top: 75, left: 91, wheel: true },
  { id: 'rear', label: 'Arka', top: 90, left: 50, wheel: false },
]
const visibleParts = computed(() =>
  parts.filter((p) => props.interactive || (p.wheel && props.wheelTones[p.id]))
)
const dotColor = (p) => props.wheelTones[p.id] || null
</script>

<template>
  <div class="relative mx-auto" style="isolation: isolate" :style="{ width: width + 'px', height: width * ratio + 'px' }">
    <img :src="imgSrc" alt="Araç üstten görünüm" class="h-full w-full object-contain drop-shadow-sm" draggable="false" />
    <!-- araç rengine göre boyama katmanı (fotoğraf maskesiyle) -->
    <div v-if="tint" class="pointer-events-none absolute inset-0" :style="[maskStyle, { background: tint, mixBlendMode: 'multiply', opacity: 0.88 }]" />

    <!-- parça işaretleri -->
    <button
      v-for="p in visibleParts"
      :key="p.id"
      type="button"
      :disabled="!interactive"
      :title="p.label"
      @click="interactive && emit('part-click', p.id)"
      class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition"
      :class="[
        interactive ? 'cursor-pointer' : 'cursor-default',
        activePart === p.id ? 'z-10' : '',
      ]"
      :style="{ top: p.top + '%', left: p.left + '%' }"
    >
      <span
        class="block rounded-full border-2 border-white shadow transition"
        :class="activePart === p.id ? 'h-4 w-4' : 'h-3 w-3'"
        :style="{ background: dotColor(p) || (activePart === p.id ? 'var(--color-brand-600)' : 'rgba(31,111,245,0.85)') }"
      />
      <span v-if="activePart === p.id" class="absolute left-1/2 top-1/2 -z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-brand-500/40" />
    </button>

    <!-- hasar / işaret noktaları -->
    <span
      v-for="(pt, i) in points"
      :key="'pt' + i"
      class="absolute -translate-x-1/2 -translate-y-1/2"
      :style="{ top: pt.yPct + '%', left: pt.xPct + '%' }"
    >
      <span class="block h-3.5 w-3.5 rounded-full border-2 border-white shadow" :style="{ background: pt.tone || 'var(--color-danger)' }" />
      <span class="absolute left-1/2 top-1/2 -z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25" :style="{ background: pt.tone || 'var(--color-danger)' }" />
    </span>
  </div>
</template>
