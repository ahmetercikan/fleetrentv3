<script setup>
import PageHeader from '@/components/ui/PageHeader.vue'
import StatTile from '@/components/ui/StatTile.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import Icon from '@/components/ui/Icon.vue'
import DonutChart from '@/components/charts/DonutChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import { company, kpis, monthlyCost, fleetDistribution, contractStatus, upcomingDates, TL, NUM } from '@/data/mock'

const costSeries = [
  { key: 'fuel', label: 'Yakıt', tone: '#3b5bfd' },
  { key: 'service', label: 'Servis', tone: '#10b981' },
  { key: 'other', label: 'Diğer', tone: '#f59e0b' },
]
const totalFleet = fleetDistribution.reduce((s, d) => s + d.value, 0)
</script>

<template>
  <div>
    <PageHeader :eyebrow="`Hoş geldin, ${company.name}`" title="Filo Kontrol Paneli" subtitle="Filo operasyonlarınızın güncel durumu, tek bakışta.">
      <template #actions>
        <UiButton variant="secondary" size="md"><Icon name="download" :size="16" /> Rapor</UiButton>
        <UiButton variant="primary" size="md"><Icon name="plus" :size="16" /> Yeni Talep Oluştur</UiButton>
      </template>
    </PageHeader>

    <!-- KPI -->
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-5">
      <StatTile label="Toplam Araç" :value="kpis.totalVehicles" hint="2 ticari · 6 binek" icon="car" tone="brand" />
      <StatTile label="Aktif Sözleşme" :value="kpis.activeContracts" hint="2 araç 30 gün içinde bitiyor" icon="doc" tone="success" :trend="4" />
      <StatTile label="Aylık KM" :value="NUM(kpis.monthlyKm)" hint="Son 30 gün" icon="gauge" tone="info" :trend="-2" />
      <StatTile label="Yakıt Gideri" :value="TL(kpis.monthlyFuel)" hint="Bu ay" icon="fuel" tone="warning" :trend="4" />
      <StatTile label="Toplam Fatura" :value="TL(kpis.monthlyInvoice)" hint="Bu ay" icon="receipt" tone="danger" :trend="9" />
    </div>

    <!-- Orta sıra -->
    <div class="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
      <UiCard class="xl:col-span-2" title="Aylık Maliyet Özeti" subtitle="Son 6 ay · yakıt, servis ve diğer giderler">
        <template #actions><UiBadge tone="brand" dot>Son 6 Ay</UiBadge></template>
        <BarChart :data="monthlyCost" :series="costSeries" :format="TL" />
      </UiCard>

      <UiCard title="Filo Dağılımı" subtitle="Araç tiplerine göre">
        <DonutChart :data="fleetDistribution" :center-value="totalFleet" center-label="Araç" :size="170" />
      </UiCard>
    </div>

    <!-- Alt sıra -->
    <div class="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
      <UiCard title="Sözleşme Durumu" subtitle="Aktif ve yaklaşan bitişler">
        <div class="space-y-4">
          <div v-for="row in [
            { label: 'Aktif', value: contractStatus.active, tone: 'success' },
            { label: 'Sona Erecek (30 gün)', value: contractStatus.ending30, tone: 'warning' },
            { label: 'Süresi Doldu', value: contractStatus.expired, tone: 'danger' },
          ]" :key="row.label" class="flex items-center gap-4">
            <span class="w-40 text-sm text-ink-soft">{{ row.label }}</span>
            <div class="h-2 flex-1 overflow-hidden rounded-full bg-surface-muted">
              <div class="h-full rounded-full" :class="{
                'bg-success': row.tone === 'success',
                'bg-warning': row.tone === 'warning',
                'bg-danger': row.tone === 'danger',
              }" :style="{ width: (row.value / 9 * 100) + '%' }" />
            </div>
            <span class="w-6 text-right text-sm font-bold">{{ row.value }}</span>
          </div>
        </div>
      </UiCard>

      <UiCard title="Yaklaşan Önemli Tarihler" subtitle="Önümüzdeki 60 gün">
        <ul class="divide-y divide-[color:var(--color-border)]">
          <li v-for="d in upcomingDates" :key="d.date" class="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div class="flex items-center gap-3">
              <span class="grid h-10 w-10 place-items-center rounded-lg bg-surface-muted text-ink-soft"><Icon name="bell" :size="18" /></span>
              <div>
                <p class="text-sm font-semibold">{{ d.type }}</p>
                <p class="text-xs text-ink-faint">{{ d.vehicle }}</p>
              </div>
            </div>
            <UiBadge :tone="d.tone">{{ new Date(d.date).toLocaleDateString('tr-TR') }}</UiBadge>
          </li>
        </ul>
      </UiCard>
    </div>
  </div>
</template>
