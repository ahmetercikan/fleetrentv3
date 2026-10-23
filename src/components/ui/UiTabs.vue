<script setup>
defineProps({
  tabs: { type: Array, required: true }, // [{ key, label, count?, icon? }]
  modelValue: { type: String, required: true },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-wrap items-center gap-1 rounded-xl border border-[color:var(--color-border)] bg-surface p-1">
    <button
      v-for="t in tabs"
      :key="t.key"
      @click="$emit('update:modelValue', t.key)"
      class="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition"
      :class="modelValue === t.key ? 'bg-brand-600 text-white shadow-sm' : 'text-ink-soft hover:bg-surface-muted'"
    >
      <span v-if="t.icon">{{ t.icon }}</span>
      {{ t.label }}
      <span
        v-if="t.count !== undefined"
        class="rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold"
        :class="modelValue === t.key ? 'bg-white/20' : 'bg-surface-muted text-ink-faint'"
      >{{ t.count }}</span>
    </button>
  </div>
</template>
