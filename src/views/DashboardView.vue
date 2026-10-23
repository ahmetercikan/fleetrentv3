<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatTile from '@/components/ui/StatTile.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import Icon from '@/components/ui/Icon.vue'
import DonutChart from '@/components/charts/DonutChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import VehicleMap from '@/components/ui/VehicleMap.vue'
import { company, kpis, monthlyCost, fleetDistribution, contractStatus, upcomingDates, TL, NUM } from '@/data/mock'
import { useFleetStore } from '@/stores/fleet'
import { useToastStore } from '@/stores/toast'

const router = useRouter()
const fleet = useFleetStore()
const toast = useToastStore()

const liveKpis = computed(() => ({
  ...kpis,
  totalVehicles: fleet.vehicles.length,
  activeContracts: fleet.byStatus('active').length,
}))

const costSeries = [
  { key: 'fuel', label: 'Yakıt', tone: '#1f6ff5' },
  { key: 'service', label: 'Servis', tone: '#10b981' },
  { key: 'other', label: 'Diğer', tone: '#f59e0b' },
]
const totalCost = computed(() => monthlyCost.reduce((s, m) => s + m.fuel + m.service + m.other, 0))
const totalFleet = fleetDistribution.reduce((s, d) => s + d.value, 0)

// Araç konumları (GPS) — durumlara göre pin
const locStatus = computed(() => ({
  calisiyor: fleet.byStatus('active').length,
  serviste: fleet.byStatus('service').length,
  diger: fleet.vehicles.length - fleet.byStatus('active').length - fleet.byStatus('service').length,
}))
const pinColor = { active: '#10b981', service: '#f59e0b', damage: '#ef4444', replacement: '#0ea5e9' }
const pins = computed(() =>
  fleet.vehicles.slice(0, 7).map((v, i) => ({
    plate: v.plate,
    x: 12 + ((i * 137) % 76),
    y: 18 + ((i * 89) % 64),
    tone: pinColor[v.status] || '#868b96',
  }))
)
</script>

<template>
  <div>
    <PageHeader :eyebrow="`Merhaba, ${company.name}`" title="Filo Kontrol Paneli" subtitle="Filo operasyonlarınızın güncel durumu, tek bakışta.">
      <template #actions>
        <UiButton variant="secondary" @click="router.push('/dashboard/reports')"><Icon name="download" :size="16" /> Rapor</UiButton>
        <UiButton variant="primary" @click="router.push('/dashboard/requests')"><Icon name="plus" :size="16" /> Yeni Talep Oluştur</UiButton>
      </template>
    </PageHeader>

    <!-- KPI -->
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-5">
      <StatTile label="Toplam Araç" :value="liveKpis.totalVehicles" :hint="`${locStatus.calisiyor} çalışıyor · ${locStatus.serviste} serviste`" icon="car" tone="brand" />
      <StatTile label="Aktif Sözleşme" :value="liveKpis.activeContracts" hint="Araçlara kayıtlı sözleşmeler" icon="doc" tone="success" :trend="4" />
      <StatTile label="Toplam KM (Aylık)" :value="NUM(kpis.monthlyKm)" hint="Kayıtlı aylık kilometre" icon="gauge" tone="info" :trend="-2" />
      <StatTile label="Yakıt Gideri (Aylık)" :value="TL(kpis.monthlyFuel)" hint="Bu ayın yakıt giderleri" icon="fuel" tone="warning" :trend="4" />
      <StatTile label="Toplam Fatura (Aylık)" :value="TL(kpis.monthlyInvoice)" hint="Kayıtlı servis faturaları" icon="receipt" tone="danger" :trend="9" />
    </div>

    <!-- Sıra 2: Araç konumu + Filo dağılımı -->
    <div class="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
      <UiCard class="xl:col-span-2" title="Araçların Konumu" subtitle="Canlı GPS takibi · Arvento entegrasyonu">
        <template #actions>
          <span class="mr-1 inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2 py-1 text-xs font-semibold text-success"><span class="h-1.5 w-1.5 animate-pulse rounded-full bg-success" /> Canlı</span>
          <UiButton variant="ghost" size="sm" @click="router.push('/dashboard/vehicles')">Tümünü Gör</UiButton>
        </template>
        <VehicleMap :vehicles="fleet.vehicles" :height="300" />
        <div class="mt-4 flex flex-wrap gap-5">
          <span class="flex items-center gap-2 text-sm"><span class="h-2.5 w-2.5 rounded-full bg-success" /><span class="text-ink-soft">Çalışıyor</span><b>{{ locStatus.calisiyor }}</b></span>
          <span class="flex items-center gap-2 text-sm"><span class="h-2.5 w-2.5 rounded-full bg-warning" /><span class="text-ink-soft">Serviste</span><b>{{ locStatus.serviste }}</b></span>
          <span class="flex items-center gap-2 text-sm"><span class="h-2.5 w-2.5 rounded-full bg-ink-faint" /><span class="text-ink-soft">Diğer</span><b>{{ locStatus.diger }}</b></span>
        </div>
      </UiCard>

      <UiCard title="Filo Dağılımı" subtitle="Araç tiplerine göre">
        <template #actions><UiButton variant="ghost" size="sm" @click="router.push('/dashboard/reports')">Detaylı Rapor</UiButton></template>
        <DonutChart :data="fleetDistribution" :center-value="totalFleet" center-label="Araç" :size="168" />
      </UiCard>
    </div>

    <!-- Sıra 3: Maliyet + sözleşme durumu -->
    <div class="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
      <UiCard class="xl:col-span-2" title="Aylık Maliyet Özeti" subtitle="Son 6 ay · yakıt, servis ve diğer giderler">
        <template #actions><UiBadge tone="brand" dot>Son 6 Ay</UiBadge></template>
        <BarChart :data="monthlyCost" :series="costSeries" :format="TL" />
        <p class="mt-4 border-t border-[color:var(--color-border)] pt-3 text-sm text-ink-soft">Kayıtlı gider toplamı <b class="text-ink">{{ TL(totalCost) }}</b></p>
      </UiCard>

      <UiCard title="Sözleşme Durumu" subtitle="Aktif ve yaklaşan bitişler">
        <template #actions><UiButton variant="ghost" size="sm" @click="router.push('/dashboard/contracts')">Araç Detayları</UiButton></template>
        <div class="space-y-4">
          <div v-for="row in [
            { label: 'Aktif', value: contractStatus.active, tone: 'success' },
            { label: 'Sona Erecek (30 gün)', value: contractStatus.ending30, tone: 'warning' },
            { label: 'Süresi Doldu', value: contractStatus.expired, tone: 'danger' },
          ]" :key="row.label" class="flex items-center gap-3">
            <span class="w-36 text-sm text-ink-soft">{{ row.label }}</span>
            <div class="h-2 flex-1 overflow-hidden rounded-full bg-surface-muted">
              <div class="h-full rounded-full" :class="{ 'bg-success': row.tone === 'success', 'bg-warning': row.tone === 'warning', 'bg-danger': row.tone === 'danger' }" :style="{ width: (row.value / 9 * 100) + '%' }" />
            </div>
            <span class="w-6 text-right text-sm font-bold">{{ row.value }}</span>
          </div>
        </div>
      </UiCard>
    </div>

    <!-- Sıra 4: Yaklaşan tarihler + hızlı erişim -->
    <div class="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
      <UiCard class="lg:col-span-2" title="Yaklaşan Önemli Tarihler" subtitle="Önümüzdeki 60 gün">
        <template #actions><UiButton variant="ghost" size="sm" @click="router.push('/dashboard/notifications')">Tümünü Gör</UiButton></template>
        <ul class="divide-y divide-[color:var(--color-border)]">
          <li v-for="d in upcomingDates" :key="d.date" class="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div class="flex items-center gap-3">
              <span class="grid h-10 w-10 place-items-center rounded-lg bg-surface-muted text-ink-soft"><Icon name="calendar" :size="18" /></span>
              <div><p class="text-sm font-semibold">{{ d.type }}</p><p class="text-xs text-ink-faint">{{ d.vehicle }}</p></div>
            </div>
            <UiBadge :tone="d.tone">{{ new Date(d.date).toLocaleDateString('tr-TR') }}</UiBadge>
          </li>
        </ul>
      </UiCard>

      <UiCard title="Hızlı Erişim">
        <div class="grid grid-cols-2 gap-3">
          <button v-for="q in [
            { l: 'Araç Ekle', i: 'plus', to: '/dashboard/vehicles' },
            { l: 'Teklif İste', i: 'offer', to: '/dashboard/quotes' },
            { l: 'Servis Talebi', i: 'wrench', to: '/dashboard/requests' },
            { l: 'Yakıt Girişi', i: 'fuel', to: '/dashboard/fuel' },
            { l: 'Rapor Al', i: 'report', to: '/dashboard/reports' },
            { l: 'Lastik', i: 'tire', to: '/dashboard/tires' },
          ]" :key="q.l" @click="router.push(q.to)"
            class="flex flex-col items-center gap-2 rounded-xl border border-[color:var(--color-border)] p-3 text-center text-xs font-semibold text-ink-soft transition hover:border-brand-400 hover:text-brand-600">
            <Icon :name="q.i" :size="20" /> {{ q.l }}
          </button>
        </div>
      </UiCard>
    </div>
  </div>
</template>
