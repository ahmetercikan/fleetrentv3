<script setup>
import PageHeader from '@/components/ui/PageHeader.vue'
import StatTile from '@/components/ui/StatTile.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import DataTable from '@/components/ui/DataTable.vue'
import DonutChart from '@/components/charts/DonutChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import Icon from '@/components/ui/Icon.vue'
import { fuelKpi, fuelDaily, fuelByType, fuelRecords, topFuelConsumers, TL, NUM } from '@/data/mock'

const trend = Math.round(((fuelKpi.total - fuelKpi.prevTotal) / fuelKpi.prevTotal) * 100)
const series = [
  { key: 'cost', label: 'Yakıt gideri (₺)', tone: '#3b5bfd' },
  { key: 'liters', label: 'Alım (L)', tone: '#10b981' },
]
const recordCols = [
  { key: 'date', label: 'Tarih' }, { key: 'plate', label: 'Plaka', mono: true },
  { key: 'station', label: 'İstasyon' }, { key: 'type', label: 'Yakıt' },
  { key: 'liters', label: 'Litre', align: 'right' }, { key: 'amount', label: 'Tutar', align: 'right' },
]
</script>

<template>
  <div>
    <PageHeader eyebrow="Gider Analizi" title="Yakıt ve Giderler" subtitle="Araçlarınızın yakıt tüketimi, maliyetleri ve istasyon bilgilerini detaylı takip edin.">
      <template #actions>
        <UiButton variant="secondary"><Icon name="plus" :size="16" /> Yakıt Kaydı</UiButton>
        <UiButton variant="primary"><Icon name="download" :size="16" /> Rapor Oluştur</UiButton>
      </template>
    </PageHeader>

    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatTile label="Toplam Yakıt Gideri" :value="TL(fuelKpi.total)" hint="Önceki döneme göre" icon="⛽" tone="brand" :trend="trend" />
      <StatTile label="Toplam Yakıt Alımı" :value="NUM(fuelKpi.liters) + ' L'" icon="🛢️" tone="info" />
      <StatTile label="Ortalama Tüketim" :value="fuelKpi.avgConsumption + ' L/100'" icon="📉" tone="success" />
      <StatTile label="Ortalama Yakıt Fiyatı" :value="TL(fuelKpi.avgPrice)" icon="🏷️" tone="warning" />
    </div>

    <div class="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
      <UiCard class="xl:col-span-2" title="Yakıt Giderleri ve Alım Miktarı" subtitle="Ekim 2026">
        <BarChart :data="fuelDaily" :series="series" />
      </UiCard>
      <UiCard title="Yakıt Türlerine Göre Dağılım" subtitle="Yüzde">
        <DonutChart :data="fuelByType" center-value="100%" center-label="Toplam" :size="160" />
      </UiCard>
    </div>

    <div class="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
      <UiCard class="lg:col-span-2" title="Yakıt Alım Kayıtları" pad="false">
        <DataTable :columns="recordCols" :rows="fuelRecords" empty-text="Kayıt yok.">
          <template #cell-date="{ row }"><span class="text-ink-soft">{{ new Date(row.date).toLocaleDateString('tr-TR') }}</span></template>
          <template #cell-liters="{ row }">{{ row.liters }} L</template>
          <template #cell-amount="{ row }"><span class="font-semibold">{{ TL(row.amount) }}</span></template>
        </DataTable>
      </UiCard>
      <UiCard title="En Çok Yakıt Tüketen Araçlar">
        <ul class="space-y-3">
          <li v-for="(c, i) in topFuelConsumers" :key="c.plate" class="flex items-center gap-3">
            <span class="grid h-8 w-8 place-items-center rounded-lg bg-brand-100 text-sm font-bold text-brand-700">{{ i + 1 }}</span>
            <div class="flex-1">
              <p class="text-sm font-semibold">{{ c.plate }}</p>
              <p class="text-xs text-ink-faint">{{ c.model }} · {{ NUM(c.liters) }} L</p>
            </div>
            <span class="text-sm font-semibold">{{ TL(c.cost) }}</span>
          </li>
        </ul>
      </UiCard>
    </div>
  </div>
</template>
