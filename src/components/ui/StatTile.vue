<script setup>
import Icon from '@/components/ui/Icon.vue'
defineProps({
  label: String,
  value: [String, Number],
  hint: { type: String, default: '' },
  icon: { type: String, default: 'report' },
  tone: { type: String, default: 'brand' }, // brand|success|warning|danger|info
  trend: { type: Number, default: null }, // yüzde değişim
})
const toneRing = {
  brand: 'bg-brand-100 text-brand-700',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  info: 'bg-info-soft text-info',
}
</script>

<template>
  <div class="card p-5 transition hover:shadow-[var(--shadow-pop)]">
    <div class="flex items-start justify-between">
      <span class="grid h-10 w-10 place-items-center rounded-xl" :class="toneRing[tone]"><Icon :name="icon" :size="19" /></span>
      <span
        v-if="trend !== null"
        class="text-xs font-semibold"
        :class="trend >= 0 ? 'text-success' : 'text-danger'"
      >{{ trend >= 0 ? '▲' : '▼' }} {{ Math.abs(trend) }}%</span>
    </div>
    <p class="mt-3 text-sm text-ink-soft">{{ label }}</p>
    <p class="mt-1 text-xl font-bold tracking-tight">{{ value }}</p>
    <p v-if="hint" class="mt-1 text-xs text-ink-faint">{{ hint }}</p>
  </div>
</template>
