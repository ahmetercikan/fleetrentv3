<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatTile from '@/components/ui/StatTile.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Icon from '@/components/ui/Icon.vue'
import { supplierScreens, badgeTones } from '@/data/supplierScreens'
import { TL } from '@/data/supplier'

const route = useRoute()
const key = computed(() => route.path.split('/').pop())
const cfg = computed(() => supplierScreens[key.value] || { title: 'Ekran', columns: [], rows: [] })

const search = ref('')
const status = ref('all')
// Rota değişince filtreleri sıfırla
watch(key, () => { search.value = ''; status.value = 'all' })

// Durum dropdown'ını satırlardaki benzersiz badge değerlerinden üret
const statusCol = computed(() => cfg.value.columns.find((c) => c.badge))
const statusOptions = computed(() => {
  if (!statusCol.value) return []
  return [...new Set(cfg.value.rows.map((r) => r[statusCol.value.key]).filter(Boolean))]
})

const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase()
  return cfg.value.rows.filter((row) => {
    const matchQ = !q || Object.values(row).some((v) => String(v).toLowerCase().includes(q))
    const matchS = status.value === 'all' || !statusCol.value || row[statusCol.value.key] === status.value
    return matchQ && matchS
  })
})
</script>

<template>
  <div :key="key">
    <PageHeader :eyebrow="cfg.eyebrow" :title="cfg.title" :subtitle="cfg.subtitle">
      <template #actions>
        <UiButton variant="secondary"><Icon name="download" :size="16" /> Dışa Aktar</UiButton>
        <UiButton v-if="cfg.primary" variant="primary"><Icon name="plus" :size="16" /> {{ cfg.primary }}</UiButton>
      </template>
    </PageHeader>

    <div v-if="cfg.stats" class="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatTile v-for="s in cfg.stats" :key="s.label" :label="s.label" :value="s.value" :icon="s.icon" :tone="s.tone" />
    </div>

    <!-- Filtre barı -->
    <div class="mb-5 flex flex-col gap-3 rounded-xl border border-[color:var(--color-border)] bg-surface p-3 lg:flex-row lg:items-center">
      <div class="relative flex-1">
        <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"><Icon name="search" :size="18" /></span>
        <input v-model="search" type="text" placeholder="Plaka, müşteri, kayıt no ara…" class="input-base !pl-10" />
      </div>
      <select v-model="status" class="input-base lg:w-48" :disabled="!statusOptions.length">
        <option value="all">Tüm Durumlar</option>
        <option v-for="o in statusOptions" :key="o" :value="o">{{ o }}</option>
      </select>
      <input type="date" class="input-base lg:w-44" />
      <input type="date" class="input-base lg:w-44" />
    </div>

    <DataTable :columns="cfg.columns" :rows="filteredRows" empty-icon="box" empty-text="Bu filtrelere uygun kayıt bulunamadı." empty-hint="Yeni kayıt ekleyerek başlayabilirsiniz.">
      <template v-for="col in cfg.columns.filter(c => c.badge)" :key="col.key" #[`cell-${col.key}`]="{ row }">
        <UiBadge :tone="badgeTones[row[col.key]] || 'neutral'" dot>{{ row[col.key] }}</UiBadge>
      </template>
      <template v-for="col in cfg.columns.filter(c => c.money)" :key="'m-' + col.key" #[`cell-${col.key}`]="{ row }">
        <span class="font-semibold">{{ TL(row[col.key]) }}</span>
      </template>
    </DataTable>

    <p v-if="cfg.rows.length" class="mt-3 text-xs text-ink-faint">{{ filteredRows.length }} / {{ cfg.rows.length }} kayıt gösteriliyor.</p>
  </div>
</template>
