<script setup>
const props = defineProps({
  tone: { type: String, default: 'neutral' }, // success|warning|danger|info|neutral|brand
  dot: { type: Boolean, default: false },
})
const tones = {
  success: 'text-success bg-success-soft',
  warning: 'text-warning bg-warning-soft',
  danger: 'text-danger bg-danger-soft',
  info: 'text-info bg-info-soft',
  brand: 'text-brand-700 bg-brand-100',
  neutral: 'text-ink-soft bg-surface-muted',
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap"
    :class="tones[tone] || tones.neutral"
  >
    <span v-if="dot" class="h-1.5 w-1.5 rounded-full bg-current" />
    <slot />
  </span>
</template>
