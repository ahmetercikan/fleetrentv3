<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary|secondary|ghost|danger|success
  size: { type: String, default: 'md' }, // sm|md|lg
})
const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm',
  secondary: 'bg-surface text-ink border border-[color:var(--color-border-strong)] hover:bg-surface-muted',
  ghost: 'text-ink-soft hover:bg-surface-muted',
  danger: 'bg-danger text-white hover:brightness-95 shadow-sm',
  success: 'bg-success text-white hover:brightness-95 shadow-sm',
}
const sizes = {
  sm: 'text-xs px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-sm px-5 py-3 gap-2',
}
</script>

<template>
  <button
    class="inline-flex items-center justify-center rounded-lg font-semibold transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:opacity-50 disabled:pointer-events-none"
    :class="[variants[variant], sizes[size]]"
  >
    <slot />
  </button>
</template>
