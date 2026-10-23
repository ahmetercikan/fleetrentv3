<script setup>
import { computed } from 'vue'
const props = defineProps({
  data: { type: Array, required: true }, // [{ label, value, tone }]
  centerValue: { type: [String, Number], default: '' },
  centerLabel: { type: String, default: '' },
  size: { type: Number, default: 180 },
})
const total = computed(() => props.data.reduce((s, d) => s + d.value, 0) || 1)
const R = 54
const C = 2 * Math.PI * R
const segments = computed(() => {
  let offset = 0
  return props.data.map((d) => {
    const frac = d.value / total.value
    const seg = { ...d, dash: frac * C, gap: C - frac * C, offset: -offset * C }
    offset += frac
    return seg
  })
})
</script>

<template>
  <div class="flex items-center gap-6">
    <div class="relative shrink-0" :style="{ width: size + 'px', height: size + 'px' }">
      <svg viewBox="0 0 140 140" class="h-full w-full -rotate-90">
        <circle cx="70" cy="70" :r="R" fill="none" stroke="var(--color-surface-muted)" stroke-width="16" />
        <circle
          v-for="(s, i) in segments"
          :key="i"
          cx="70" cy="70" :r="R" fill="none"
          :stroke="s.tone"
          stroke-width="16"
          stroke-linecap="round"
          :stroke-dasharray="`${s.dash} ${s.gap}`"
          :stroke-dashoffset="s.offset"
        />
      </svg>
      <div class="absolute inset-0 grid place-items-center text-center">
        <div>
          <p class="text-2xl font-bold leading-none">{{ centerValue }}</p>
          <p class="mt-1 text-xs text-ink-faint">{{ centerLabel }}</p>
        </div>
      </div>
    </div>
    <ul class="flex-1 space-y-2.5">
      <li v-for="(d, i) in data" :key="i" class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2 text-ink-soft">
          <span class="h-2.5 w-2.5 rounded-full" :style="{ background: d.tone }" />
          {{ d.label }}
        </span>
        <span class="font-semibold">{{ d.value }}</span>
      </li>
    </ul>
  </div>
</template>
