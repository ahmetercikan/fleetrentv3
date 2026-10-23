<script setup>
import PageHeader from '@/components/ui/PageHeader.vue'
import StatTile from '@/components/ui/StatTile.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import DataTable from '@/components/ui/DataTable.vue'
import DonutChart from '@/components/charts/DonutChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import Icon from '@/components/ui/Icon.vue'
import { supplier, supplierKpi, fleetStatus, fleetStatusDonut, opsTasks, opsStatusLabels, supplierRevenue, TL } from '@/data/supplier'

const revSeries = [
  { key: 'gelir', label: 'Gelir', tone: '#3b5bfd' },
  { key: 'maliyet', label: 'Maliyet', tone: '#f59e0b' },
]
const opsCols = [
  { key: 'job', label: 'İş / Araç' }, { key: 'branch', label: 'Şube' },
  { key: 'due', label: 'Son Tarih' }, { key: 'owner', label: 'Sorumlu' },
  { key: 'status', label: 'Durum / İşlem', align: 'center' },
]
const totalFleet = fleetStatusDonut.reduce((s, d) => s + d.value, 0)
</script>

<template>
  <div>
    <PageHeader :eyebrow="`Hoş geldiniz, ${supplier.name}`" title="Tedarikçi Kontrol Paneli" subtitle="Filo operasyonlarınızın genel durumu. Süreçleri ve yaklaşan işleri tek ekrandan yönetin.">
      <template #actions>
        <UiButton variant="secondary"><Icon name="offer" :size="16" /> Yeni Teklif</UiButton>
        <UiButton variant="primary"><Icon name="plus" :size="16" /> Yeni Kiralama</UiButton>
      </template>
    </PageHeader>

    <!-- Aksiyon gerektiren -->
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatTile label="Teslim Bekleyen Kiralamalar" :value="supplierKpi.pendingDelivery" icon="truck" tone="brand" />
      <StatTile label="İade / Mutabakat Bekleyen" :value="supplierKpi.pendingReturn" icon="undo" tone="warning" />
      <StatTile label="Bakım Önerileri" :value="supplierKpi.maintenanceHints" icon="wrench" tone="info" />
      <StatTile label="Mali Eşleştirme Bekleyen" :value="supplierKpi.matchPending" icon="folder" tone="danger" />
    </div>

    <!-- Filo durumu -->
    <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      <div v-for="f in fleetStatus" :key="f.label" class="card p-4">
        <span class="grid h-9 w-9 place-items-center rounded-lg bg-surface-muted text-ink-soft"><Icon :name="f.icon" :size="18" /></span>
        <p class="mt-2 text-xs text-ink-soft">{{ f.label }}</p>
        <p class="text-xl font-bold">{{ f.value }}</p>
      </div>
    </div>

    <!-- Operasyon iş listesi + filo dağılımı -->
    <div class="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
      <UiCard class="xl:col-span-2" title="Günlük Operasyon İş Listesi" subtitle="Teslim, iade, servis ve rezervasyon kayıtlarından güncel işler" pad="false">
        <template #actions><UiButton variant="ghost" size="sm">Tüm İşleri Gör</UiButton></template>
        <DataTable :columns="opsCols" :rows="opsTasks" empty-text="Bu görünümde iş bulunamadı.">
          <template #cell-due="{ row }"><span class="text-ink-soft">{{ new Date(row.due).toLocaleDateString('tr-TR') }}</span></template>
          <template #cell-status="{ row }"><UiBadge :tone="opsStatusLabels[row.status].tone" dot>{{ opsStatusLabels[row.status].label }}</UiBadge></template>
        </DataTable>
      </UiCard>

      <UiCard title="Araç Durum Dağılımı" subtitle="Toplam filo">
        <DonutChart :data="fleetStatusDonut" :center-value="totalFleet" center-label="Araç" :size="170" />
      </UiCard>
    </div>

    <!-- Gelir / maliyet -->
    <div class="mt-5">
      <UiCard title="Kayıtlı Gelir ve Maliyet" subtitle="Son 6 ay">
        <template #actions><UiBadge tone="success" dot>Net kâr ↑</UiBadge></template>
        <BarChart :data="supplierRevenue" :series="revSeries" :format="TL" />
      </UiCard>
    </div>
  </div>
</template>
