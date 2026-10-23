<script setup>
import { computed } from 'vue'
const props = defineProps({
  data: { type: Array, required: true }, // [{ label, ...series }]
  series: { type: Array, required: true }, // [{ key, label, tone }]
  format: { type: Function, default: (v) => v },
})
const max = computed(() => {
  let m = 0
  for (const d of props.data) for (const s of props.series) m = Math.max(m, d[s.key] || 0)
  return m || 1
})
</script>

<template>
  <div>
    <div class="flex h-56 items-end gap-3">
      <div v-for="(d, i) in data" :key="i" class="flex flex-1 flex-col items-center gap-2">
        <div class="flex w-full items-end justify-center gap-1" style="height: 190px">
          <div
            v-for="s in series"
            :key="s.key"
            class="w-full max-w-[22px] rounded-t-md transition-all"
            :style="{ height: `${((d[s.key] || 0) / max) * 100}%`, background: s.tone, minHeight: '3px' }"
            :title="`${s.label}: ${format(d[s.key])}`"
          />
        </div>
        <span class="text-xs text-ink-faint">{{ d.label }}</span>
      </div>
    </div>
    <div class="mt-4 flex flex-wrap gap-4">
      <span v-for="s in series" :key="s.key" class="flex items-center gap-2 text-xs text-ink-soft">
        <span class="h-2.5 w-2.5 rounded-full" :style="{ background: s.tone }" />{{ s.label }}
      </span>
    </div>
  </div>
</template>
