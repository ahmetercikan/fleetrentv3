<script setup>
import { ref, computed } from 'vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatTile from '@/components/ui/StatTile.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiTabs from '@/components/ui/UiTabs.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Icon from '@/components/ui/Icon.vue'
import { serviceRecords, serviceStatusLabels, TL } from '@/data/mock'

const typeMap = {
  'Periyodik Bakım': 'service', 'Hasar / Kaza': 'damage', 'Lastik': 'tire', 'Yol Yardım': 'road',
}
const tab = ref('all')
const tabs = [
  { key: 'all', label: 'Tümü', count: serviceRecords.length },
  { key: 'service', label: 'Servis / Bakım', count: serviceRecords.filter((r) => typeMap[r.type] === 'service').length },
  { key: 'damage', label: 'Hasar / Kaza', count: serviceRecords.filter((r) => typeMap[r.type] === 'damage').length },
  { key: 'road', label: 'Yol Yardım', count: serviceRecords.filter((r) => typeMap[r.type] === 'road').length },
  { key: 'tire', label: 'Lastik', count: serviceRecords.filter((r) => typeMap[r.type] === 'tire').length },
]
const filtered = computed(() => tab.value === 'all' ? serviceRecords : serviceRecords.filter((r) => typeMap[r.type] === tab.value))

const columns = [
  { key: 'date', label: 'Tarih' },
  { key: 'plate', label: 'Plaka', mono: true },
  { key: 'model', label: 'Araç' },
  { key: 'type', label: 'İşlem Türü' },
  { key: 'desc', label: 'Açıklama' },
  { key: 'status', label: 'Durum', align: 'center' },
  { key: 'amount', label: 'Tutar', align: 'right' },
  { key: 'workOrder', label: 'İş Emri', mono: true, align: 'center' },
]
const quick = [
  { label: 'Yeni İş Emri', icon: 'plus' }, { label: 'Randevu Talep Et', icon: 'bell' },
  { label: 'Servis Firmaları', icon: 'wrench' }, { label: 'Hasar Bildirimi', icon: 'shield' },
]
</script>

<template>
  <div>
    <PageHeader eyebrow="Servis Paneli" title="Servis / Bakım & Hasar / Kaza" subtitle="Araç servis, bakım, hasar ve kaza süreçlerini tek ekrandan takip edin.">
      <template #actions><UiButton variant="primary"><Icon name="plus" :size="16" /> Yeni İş Emri</UiButton></template>
    </PageHeader>

    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatTile label="Toplam Servis / Bakım" :value="2" icon="🔧" tone="brand" />
      <StatTile label="Toplam Hasar / Kaza" :value="1" icon="⚠️" tone="danger" />
      <StatTile label="Açık İş Emri" :value="1" icon="📋" tone="warning" />
      <StatTile label="Bakımı Yaklaşan" :value="2" icon="🗓️" tone="info" />
    </div>

    <div class="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-4">
      <div class="xl:col-span-3">
        <div class="mb-4"><UiTabs v-model="tab" :tabs="tabs" /></div>
        <DataTable :columns="columns" :rows="filtered" empty-icon="🔧" empty-text="Kayıt bulunamadı." empty-hint="Yeni iş emri oluşturarak süreci başlatabilirsiniz.">
          <template #cell-date="{ row }"><span class="text-ink-soft">{{ new Date(row.date).toLocaleDateString('tr-TR') }}</span></template>
          <template #cell-status="{ row }"><UiBadge :tone="serviceStatusLabels[row.status].tone" dot>{{ serviceStatusLabels[row.status].label }}</UiBadge></template>
          <template #cell-amount="{ row }"><span class="font-semibold">{{ TL(row.amount) }}</span></template>
        </DataTable>
      </div>

      <div class="space-y-5">
        <UiCard title="Hızlı İşlemler">
          <div class="grid grid-cols-2 gap-2">
            <button v-for="q in quick" :key="q.label" class="flex flex-col items-center gap-2 rounded-lg border border-[color:var(--color-border)] p-3 text-center text-xs font-semibold text-ink-soft transition hover:border-brand-400 hover:text-brand-600">
              <Icon :name="q.icon" :size="20" /> {{ q.label }}
            </button>
          </div>
        </UiCard>
        <UiCard title="Bakımı Yaklaşan Araçlar">
          <p class="text-sm text-ink-faint">34 FLT 212 — 40.000 km bakımı yaklaştı.</p>
        </UiCard>
      </div>
    </div>
  </div>
</template>
