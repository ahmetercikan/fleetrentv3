<script setup>
import Icon from '@/components/ui/Icon.vue'
defineProps({
  columns: { type: Array, required: true }, // [{ key, label, align?, width?, mono? }]
  rows: { type: Array, default: () => [] },
  emptyIcon: { type: String, default: 'box' },
  emptyText: { type: String, default: 'Kayıt bulunamadı.' },
  emptyHint: { type: String, default: '' },
  clickable: { type: Boolean, default: false },
})
const emit = defineEmits(['row-click'])
const alignCls = { right: 'text-right', center: 'text-center', left: 'text-left' }
</script>

<template>
  <div class="card overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="border-b border-[color:var(--color-border)] bg-surface-muted/60">
            <th
              v-for="c in columns"
              :key="c.key"
              class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-faint"
              :class="alignCls[c.align] || 'text-left'"
              :style="c.width ? { width: c.width } : {}"
            >
              {{ c.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in rows"
            :key="row.id ?? i"
            class="border-b border-[color:var(--color-border)] last:border-0 transition hover:bg-surface-muted/50"
            :class="clickable ? 'cursor-pointer' : ''"
            @click="clickable && emit('row-click', row)"
          >
            <td
              v-for="c in columns"
              :key="c.key"
              class="px-4 py-3.5 align-middle"
              :class="[alignCls[c.align] || 'text-left', c.mono ? 'font-mono text-[0.8rem]' : '']"
            >
              <slot :name="`cell-${c.key}`" :row="row" :value="row[c.key]">
                <span :class="c.key === columns[0].key ? 'font-semibold text-ink' : 'text-ink-soft'">{{ row[c.key] }}</span>
              </slot>
            </td>
          </tr>
          <tr v-if="!rows.length">
            <td :colspan="columns.length" class="px-4 py-14 text-center">
              <div class="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-surface-muted text-ink-faint"><Icon :name="emptyIcon" :size="24" /></div>
              <p class="mt-3 text-sm font-semibold text-ink-soft">{{ emptyText }}</p>
              <p v-if="emptyHint" class="mt-1 text-xs text-ink-faint">{{ emptyHint }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
