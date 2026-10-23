<script setup>
import { ref, computed } from 'vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatTile from '@/components/ui/StatTile.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiTabs from '@/components/ui/UiTabs.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Icon from '@/components/ui/Icon.vue'
import { opsTasks, opsStatusLabels } from '@/data/supplier'

const tab = ref('all')
const tabs = [
  { key: 'all', label: 'Tümü', count: opsTasks.length },
  { key: 'open', label: 'Açık', count: opsTasks.filter((t) => t.status === 'open').length },
  { key: 'late', label: 'Geciken', count: opsTasks.filter((t) => t.status === 'late').length },
  { key: 'today', label: 'Bugün', count: opsTasks.filter((t) => t.status === 'today').length },
]
const rows = computed(() => (tab.value === 'all' ? opsTasks : opsTasks.filter((t) => t.status === tab.value)))
const cols = [
  { key: 'job', label: 'İş / Araç' }, { key: 'branch', label: 'Şube' },
  { key: 'due', label: 'Son Tarih' }, { key: 'owner', label: 'Sorumlu' },
  { key: 'status', label: 'Durum', align: 'center' }, { key: 'action', label: '', align: 'right' },
]
</script>

<template>
  <div>
    <PageHeader eyebrow="Operasyon" title="Günlük Operasyonlar" subtitle="Teslimat, iade, servis ve rezervasyon işlerini tek akışta yönetin.">
      <template #actions><UiButton variant="primary"><Icon name="plus" :size="16" /> Yeni İş</UiButton></template>
    </PageHeader>

    <div class="grid grid-cols-3 gap-4">
      <StatTile label="Açık İş" :value="opsTasks.filter(t => t.status === 'open').length" icon="📋" tone="info" />
      <StatTile label="Geciken" :value="opsTasks.filter(t => t.status === 'late').length" icon="⏰" tone="danger" />
      <StatTile label="Bugün" :value="opsTasks.filter(t => t.status === 'today').length" icon="📅" tone="warning" />
    </div>

    <div class="my-5"><UiTabs v-model="tab" :tabs="tabs" /></div>

    <DataTable :columns="cols" :rows="rows" empty-text="Bu görünümde iş bulunamadı.">
      <template #cell-due="{ row }"><span class="text-ink-soft">{{ new Date(row.due).toLocaleDateString('tr-TR') }}</span></template>
      <template #cell-status="{ row }"><UiBadge :tone="opsStatusLabels[row.status].tone" dot>{{ opsStatusLabels[row.status].label }}</UiBadge></template>
      <template #cell-action><UiButton variant="secondary" size="sm">Aç</UiButton></template>
    </DataTable>
  </div>
</template>
