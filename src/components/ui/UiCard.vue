<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  pad: { type: Boolean, default: true },
})
</script>

<template>
  <section class="card overflow-hidden">
    <header
      v-if="title || $slots.header || $slots.actions"
      class="flex items-center justify-between gap-3 border-b border-[color:var(--color-border)] px-5 py-4"
    >
      <div v-if="title || subtitle">
        <h3 class="text-sm font-bold tracking-tight">{{ title }}</h3>
        <p v-if="subtitle" class="mt-0.5 text-xs text-ink-faint">{{ subtitle }}</p>
      </div>
      <slot name="header" />
      <div v-if="$slots.actions" class="flex items-center gap-2"><slot name="actions" /></div>
    </header>
    <div :class="pad ? 'p-5' : ''"><slot /></div>
  </section>
</template>
