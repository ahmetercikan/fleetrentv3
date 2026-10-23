<script setup>
import { computed } from 'vue'
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
        <input type="text" placeholder="Plaka, müşteri, kayıt no ara…" class="input-base !pl-10" />
      </div>
      <select class="input-base lg:w-44"><option>Tüm Durumlar</option></select>
      <input type="date" class="input-base lg:w-44" />
      <input type="date" class="input-base lg:w-44" />
      <UiButton variant="primary">Filtrele</UiButton>
    </div>

    <DataTable :columns="cfg.columns" :rows="cfg.rows" empty-icon="🗂️" empty-text="Bu filtrelere uygun kayıt bulunamadı." empty-hint="Yeni kayıt ekleyerek başlayabilirsiniz.">
      <template v-for="col in cfg.columns.filter(c => c.badge)" :key="col.key" #[`cell-${col.key}`]="{ row }">
        <UiBadge :tone="badgeTones[row[col.key]] || 'neutral'" dot>{{ row[col.key] }}</UiBadge>
      </template>
      <template v-for="col in cfg.columns.filter(c => c.money)" :key="'m-' + col.key" #[`cell-${col.key}`]="{ row }">
        <span class="font-semibold">{{ TL(row[col.key]) }}</span>
      </template>
    </DataTable>

    <p v-if="cfg.rows.length" class="mt-3 text-xs text-ink-faint">Toplam {{ cfg.rows.length }} kayıt gösteriliyor.</p>
  </div>
</template>
