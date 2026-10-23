<script setup>
import { ref } from 'vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatTile from '@/components/ui/StatTile.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiTabs from '@/components/ui/UiTabs.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Icon from '@/components/ui/Icon.vue'
import { hgsRecords, fines, fineStatusLabels, TL } from '@/data/mock'
import { useToastStore } from '@/stores/toast'
const toast = useToastStore()

const tab = ref('hgs')
const tabs = [
  { key: 'hgs', label: 'HGS Geçişleri', icon: 'road', count: hgsRecords.length },
  { key: 'fines', label: 'Trafik Cezaları', icon: 'siren', count: fines.length },
]
const hgsCols = [
  { key: 'plate', label: 'Plaka', mono: true }, { key: 'date', label: 'Tarih' },
  { key: 'location', label: 'Geçiş Noktası' }, { key: 'amount', label: 'Tutar', align: 'right' },
  { key: 'balance', label: 'Kalan Bakiye', align: 'right' },
]
const fineCols = [
  { key: 'id', label: 'Ceza No', mono: true }, { key: 'plate', label: 'Plaka', mono: true },
  { key: 'driver', label: 'Sürücü' }, { key: 'date', label: 'Tarih' }, { key: 'type', label: 'Ceza Türü' },
  { key: 'amount', label: 'Tutar', align: 'right' }, { key: 'status', label: 'Durum', align: 'center' },
  { key: 'actions', label: '', align: 'right' },
]
const totalFines = fines.reduce((s, f) => s + f.amount, 0)
</script>

<template>
  <div>
    <PageHeader eyebrow="Gider Takibi" title="HGS & Cezalar" subtitle="Otoyol/köprü geçişleri ve trafik para cezalarını araç bazında takip edin." />

    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatTile label="Aylık HGS Gideri" :value="TL(277)" icon="road" tone="brand" />
      <StatTile label="Düşük Bakiye Uyarısı" :value="1" icon="battery" tone="warning" />
      <StatTile label="Ödenmemiş Ceza" :value="TL(totalFines - 993)" icon="siren" tone="danger" />
      <StatTile label="İtiraz Edilen" :value="fines.filter(f => f.status === 'objection').length" icon="scale" tone="info" />
    </div>

    <div class="my-5"><UiTabs v-model="tab" :tabs="tabs" /></div>

    <DataTable v-if="tab === 'hgs'" :columns="hgsCols" :rows="hgsRecords" empty-text="HGS geçiş kaydı yok.">
      <template #cell-date="{ row }"><span class="text-ink-soft">{{ new Date(row.date).toLocaleDateString('tr-TR') }}</span></template>
      <template #cell-amount="{ row }">{{ TL(row.amount) }}</template>
      <template #cell-balance="{ row }"><span class="font-semibold" :class="row.balance < 200 ? 'text-danger' : ''">{{ TL(row.balance) }}</span></template>
    </DataTable>

    <DataTable v-else :columns="fineCols" :rows="fines" empty-text="Trafik cezası kaydı yok.">
      <template #cell-date="{ row }"><span class="text-ink-soft">{{ new Date(row.date).toLocaleDateString('tr-TR') }}</span></template>
      <template #cell-amount="{ row }"><span class="font-semibold">{{ TL(row.amount) }}</span></template>
      <template #cell-status="{ row }"><UiBadge :tone="fineStatusLabels[row.status].tone" dot>{{ fineStatusLabels[row.status].label }}</UiBadge></template>
      <template #cell-actions="{ row }"><UiButton v-if="row.status === 'unpaid'" variant="primary" size="sm" @click="toast.success(row.id + ' cezası ödendi.')">Öde</UiButton></template>
    </DataTable>
  </div>
</template>
