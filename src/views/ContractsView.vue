<script setup>
import PageHeader from '@/components/ui/PageHeader.vue'
import StatTile from '@/components/ui/StatTile.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Icon from '@/components/ui/Icon.vue'
import { contracts, contractStatusLabels, TL, NUM } from '@/data/mock'

const columns = [
  { key: 'id', label: 'Sözleşme No', mono: true },
  { key: 'plate', label: 'Plaka', mono: true },
  { key: 'supplier', label: 'Tedarikçi' },
  { key: 'period', label: 'Dönem' },
  { key: 'km', label: 'KM Limiti', align: 'right' },
  { key: 'monthly', label: 'Aylık', align: 'right' },
  { key: 'status', label: 'Durum', align: 'center' },
  { key: 'actions', label: '', align: 'right' },
]
</script>

<template>
  <div>
    <PageHeader eyebrow="Kiralama" title="Sözleşmeler" subtitle="Aktif ve geçmiş kiralama sözleşmelerinizi, e-imza durumlarını yönetin.">
      <template #actions><UiButton variant="primary"><Icon name="plus" :size="16" /> Yeni Sözleşme</UiButton></template>
    </PageHeader>

    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatTile label="Aktif Sözleşme" :value="contracts.filter(c => c.status === 'active').length" icon="📄" tone="success" />
      <StatTile label="Bitişe Yakın" :value="contracts.filter(c => c.status === 'ending').length" icon="⏳" tone="warning" />
      <StatTile label="İmza Bekleyen" :value="contracts.filter(c => c.status === 'draft').length" icon="✍️" tone="info" />
      <StatTile label="Süresi Dolan" :value="contracts.filter(c => c.status === 'expired').length" icon="🔴" tone="danger" />
    </div>

    <DataTable class="mt-5" :columns="columns" :rows="contracts">
      <template #cell-period="{ row }"><span class="text-xs text-ink-soft">{{ new Date(row.start).toLocaleDateString('tr-TR') }} → {{ new Date(row.end).toLocaleDateString('tr-TR') }}</span></template>
      <template #cell-km="{ row }">{{ NUM(row.km) }} km</template>
      <template #cell-monthly="{ row }"><span class="font-semibold">{{ TL(row.monthly) }}</span></template>
      <template #cell-status="{ row }"><UiBadge :tone="contractStatusLabels[row.status].tone" dot>{{ contractStatusLabels[row.status].label }}</UiBadge></template>
      <template #cell-actions="{ row }">
        <div class="flex justify-end gap-1.5">
          <UiButton v-if="!row.signed" variant="primary" size="sm">İmzala</UiButton>
          <UiButton variant="ghost" size="sm">PDF</UiButton>
        </div>
      </template>
    </DataTable>
  </div>
</template>
