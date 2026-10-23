<script setup>
import { ref, computed } from 'vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatTile from '@/components/ui/StatTile.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Icon from '@/components/ui/Icon.vue'
import { vehicles, vehicleStatusLabels, TL, NUM } from '@/data/mock'

const search = ref('')
const statusFilter = ref('all')

const filtered = computed(() =>
  vehicles.filter((v) => {
    const q = search.value.toLowerCase()
    const matchQ = !q || `${v.plate} ${v.brand} ${v.model} ${v.driver}`.toLowerCase().includes(q)
    const matchS = statusFilter.value === 'all' || v.status === statusFilter.value
    return matchQ && matchS
  })
)

const stats = computed(() => ({
  total: vehicles.length,
  active: vehicles.filter((v) => v.status === 'active').length,
  service: vehicles.filter((v) => v.status === 'service').length,
  damage: vehicles.filter((v) => v.status === 'damage').length,
  replacement: vehicles.filter((v) => v.status === 'replacement').length,
}))

const columns = [
  { key: 'plate', label: 'Plaka', mono: true },
  { key: 'vehicle', label: 'Marka / Model' },
  { key: 'driver', label: 'Sürücü' },
  { key: 'year', label: 'Yıl', align: 'center' },
  { key: 'status', label: 'Durum', align: 'center' },
  { key: 'rent', label: 'Kira Dönemi' },
  { key: 'km', label: 'KM', align: 'right' },
  { key: 'monthly', label: 'Aylık', align: 'right' },
]
</script>

<template>
  <div>
    <PageHeader eyebrow="Filo Yönetimi" title="Araçlar" subtitle="Tüm araçlarınızı tek ekrandan yönetin, filtreleyin ve detayları görüntüleyin.">
      <template #actions>
        <UiButton variant="secondary"><Icon name="download" :size="16" /> Dışa Aktar</UiButton>
        <UiButton variant="secondary"><Icon name="map" :size="16" /> Araç Takibi</UiButton>
        <UiButton variant="primary"><Icon name="plus" :size="16" /> Yeni Araç</UiButton>
      </template>
    </PageHeader>

    <div class="grid grid-cols-2 gap-4 lg:grid-cols-5">
      <StatTile label="Toplam Araç" :value="stats.total" icon="car" tone="brand" />
      <StatTile label="Aktif" :value="stats.active" icon="check-circle" tone="success" />
      <StatTile label="Serviste" :value="stats.service" icon="wrench" tone="warning" />
      <StatTile label="Hasar / Kaza" :value="stats.damage" icon="alert" tone="danger" />
      <StatTile label="İkame Bekliyor" :value="stats.replacement" icon="refresh" tone="info" />
    </div>

    <!-- Filtre barı -->
    <div class="my-5 flex flex-col gap-3 rounded-xl border border-[color:var(--color-border)] bg-surface p-3 sm:flex-row sm:items-center">
      <div class="relative flex-1">
        <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"><Icon name="search" :size="18" /></span>
        <input v-model="search" type="text" placeholder="Plaka, marka, model veya sürücü ara…" class="input-base !pl-10" />
      </div>
      <select v-model="statusFilter" class="input-base sm:w-56">
        <option value="all">Tüm Durumlar</option>
        <option v-for="(s, k) in vehicleStatusLabels" :key="k" :value="k">{{ s.label }}</option>
      </select>
      <UiButton variant="secondary"><Icon name="filter" :size="16" /> Filtrele</UiButton>
    </div>

    <DataTable :columns="columns" :rows="filtered" empty-icon="car" empty-text="Filtrelere uygun araç bulunamadı." empty-hint="Aramayı temizleyin veya yeni araç ekleyin.">
      <template #cell-vehicle="{ row }">
        <div>
          <p class="font-semibold text-ink">{{ row.brand }} {{ row.model }}</p>
          <p class="text-xs text-ink-faint">{{ row.color }} · VIN {{ row.vin.slice(-6) }}</p>
        </div>
      </template>
      <template #cell-status="{ row }">
        <UiBadge :tone="vehicleStatusLabels[row.status].tone" dot>{{ vehicleStatusLabels[row.status].label }}</UiBadge>
      </template>
      <template #cell-rent="{ row }">
        <span class="text-xs text-ink-soft">{{ new Date(row.rentStart).toLocaleDateString('tr-TR') }} → {{ new Date(row.rentEnd).toLocaleDateString('tr-TR') }}</span>
      </template>
      <template #cell-km="{ row }"><span class="font-medium">{{ NUM(row.km) }}</span></template>
      <template #cell-monthly="{ row }"><span class="font-semibold">{{ TL(row.monthly) }}</span></template>
    </DataTable>

    <p class="mt-3 text-xs text-ink-faint">Toplam {{ filtered.length }} araç gösteriliyor.</p>
  </div>
</template>
