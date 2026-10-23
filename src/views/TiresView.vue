<script setup>
import PageHeader from '@/components/ui/PageHeader.vue'
import StatTile from '@/components/ui/StatTile.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import DataTable from '@/components/ui/DataTable.vue'
import DonutChart from '@/components/charts/DonutChart.vue'
import CarTopView from '@/components/ui/CarTopView.vue'
import Icon from '@/components/ui/Icon.vue'
import { tires, tireStatusLabels, tireSummary, tireSeasons, NUM } from '@/data/mock'
import { useToastStore } from '@/stores/toast'
const toast = useToastStore()

// Örnek araç için lastik pozisyon durumları (üstten görünüm)
const wheelTones = {
  FL: 'var(--color-success)', FR: 'var(--color-success)',
  RL: 'var(--color-warning)', RR: 'var(--color-danger)',
}
const wheelLegend = [
  { pos: 'Sol Ön', label: 'İyi', tone: 'success' },
  { pos: 'Sağ Ön', label: 'İyi', tone: 'success' },
  { pos: 'Sol Arka', label: 'Yaklaşan', tone: 'warning' },
  { pos: 'Sağ Arka', label: 'Değişim', tone: 'danger' },
]

const columns = [
  { key: 'plate', label: 'Plaka', mono: true },
  { key: 'model', label: 'Araç' },
  { key: 'brand', label: 'Marka' },
  { key: 'size', label: 'Ebat', mono: true },
  { key: 'setNo', label: 'Takım No', align: 'center' },
  { key: 'season', label: 'Mevsim' },
  { key: 'status', label: 'Durum', align: 'center' },
  { key: 'remainingKm', label: 'Kalan KM', align: 'right' },
]
const donut = [
  { label: 'İyi', value: tireSummary.good, tone: '#10b981' },
  { label: 'Yaklaşan', value: tireSummary.warning, tone: '#f59e0b' },
  { label: 'Değişim', value: tireSummary.change, tone: '#ef4444' },
]
</script>

<template>
  <div>
    <PageHeader eyebrow="Lastik" title="Lastik Yönetimi" subtitle="Araçlarınızdaki lastiklerin durumunu takip edin, değişim ve rotasyon planlarını yönetin.">
      <template #actions><UiButton variant="primary" @click="toast.success('Yeni lastik kayıt formu açıldı.')"><Icon name="plus" :size="16" /> Yeni Lastik Kaydı</UiButton></template>
    </PageHeader>

    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatTile label="Toplam Lastik" :value="tires.length" icon="tire" tone="brand" />
      <StatTile label="Değişim Bekleyen" :value="tireSummary.change" icon="alert" tone="danger" />
      <StatTile label="Rotasyon Bekleyen" :value="1" icon="refresh" tone="warning" />
      <StatTile label="Mücbir Durum" :value="tireSummary.force" icon="alert" tone="info" />
    </div>

    <div class="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-4">
      <div class="xl:col-span-3">
        <DataTable :columns="columns" :rows="tires" empty-icon="tire" empty-text="Filtrelere uygun lastik kaydı yok.">
          <template #cell-status="{ row }"><UiBadge :tone="tireStatusLabels[row.status].tone" dot>{{ tireStatusLabels[row.status].label }}</UiBadge></template>
          <template #cell-remainingKm="{ row }"><span class="font-medium">{{ NUM(row.remainingKm) }}</span></template>
        </DataTable>
      </div>
      <div class="space-y-5">
        <UiCard title="Lastik Pozisyonları" subtitle="34 FLT 556 · güncel durum">
          <CarTopView :wheel-tones="wheelTones" :width="150" />
          <ul class="mt-4 grid grid-cols-2 gap-2">
            <li v-for="w in wheelLegend" :key="w.pos" class="flex items-center gap-2 text-xs">
              <span class="h-2.5 w-2.5 rounded-full" :class="{
                'bg-success': w.tone === 'success', 'bg-warning': w.tone === 'warning', 'bg-danger': w.tone === 'danger',
              }" />
              <span class="text-ink-soft">{{ w.pos }}</span>
            </li>
          </ul>
        </UiCard>
        <UiCard title="Lastik Durum Özeti">
          <DonutChart :data="donut" :center-value="tires.length" center-label="Toplam" :size="150" />
        </UiCard>
        <UiCard title="Mevsimsel Dağılım">
          <ul class="space-y-2.5">
            <li v-for="s in tireSeasons" :key="s.label" class="flex items-center justify-between text-sm">
              <span class="text-ink-soft">{{ s.label }}</span>
              <span class="font-semibold">{{ s.value }}</span>
            </li>
          </ul>
        </UiCard>
      </div>
    </div>
  </div>
</template>
