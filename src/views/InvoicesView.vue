<script setup>
import PageHeader from '@/components/ui/PageHeader.vue'
import StatTile from '@/components/ui/StatTile.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Icon from '@/components/ui/Icon.vue'
import { invoices, invoiceStatusLabels, TL } from '@/data/mock'

const columns = [
  { key: 'id', label: 'Fatura No', mono: true }, { key: 'supplier', label: 'Tedarikçi' },
  { key: 'date', label: 'Fatura Tarihi' }, { key: 'due', label: 'Vade' },
  { key: 'amount', label: 'Tutar', align: 'right' }, { key: 'status', label: 'Durum', align: 'center' },
  { key: 'actions', label: '', align: 'right' },
]
const open = invoices.filter((i) => i.status !== 'paid').reduce((s, i) => s + i.amount, 0)
</script>

<template>
  <div>
    <PageHeader eyebrow="Muhasebe" title="Faturalar" subtitle="Tedarikçi faturalarınızı, vade ve ödeme durumlarını takip edin.">
      <template #actions><UiButton variant="secondary"><Icon name="download" :size="16" /> Dışa Aktar</UiButton></template>
    </PageHeader>

    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatTile label="Toplam Fatura" :value="invoices.length" icon="🧾" tone="brand" />
      <StatTile label="Açık Bakiye" :value="TL(open)" icon="⏳" tone="warning" />
      <StatTile label="Gecikmiş" :value="invoices.filter(i => i.status === 'overdue').length" icon="🔴" tone="danger" />
      <StatTile label="Bu Ay Ödenen" :value="TL(28500)" icon="✅" tone="success" />
    </div>

    <DataTable class="mt-5" :columns="columns" :rows="invoices">
      <template #cell-date="{ row }"><span class="text-ink-soft">{{ new Date(row.date).toLocaleDateString('tr-TR') }}</span></template>
      <template #cell-due="{ row }"><span class="text-ink-soft">{{ new Date(row.due).toLocaleDateString('tr-TR') }}</span></template>
      <template #cell-amount="{ row }"><span class="font-semibold">{{ TL(row.amount) }}</span></template>
      <template #cell-status="{ row }"><UiBadge :tone="invoiceStatusLabels[row.status].tone" dot>{{ invoiceStatusLabels[row.status].label }}</UiBadge></template>
      <template #cell-actions="{ row }">
        <div class="flex justify-end gap-1.5">
          <UiButton v-if="row.status !== 'paid'" variant="primary" size="sm">Öde</UiButton>
          <UiButton variant="ghost" size="sm">PDF</UiButton>
        </div>
      </template>
    </DataTable>
  </div>
</template>
