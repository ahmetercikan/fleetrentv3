<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: String,
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p v-if="eyebrow" class="text-xs font-bold uppercase tracking-wider text-brand-600">{{ eyebrow }}</p>
      <h1 class="mt-1 text-2xl font-bold tracking-tight sm:text-[1.7rem]">{{ title }}</h1>
      <p v-if="subtitle" class="mt-1 text-sm text-ink-soft">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.actions" class="flex flex-wrap items-center gap-2"><slot name="actions" /></div>
  </div>
</template>
