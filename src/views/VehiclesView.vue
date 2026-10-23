<script setup>
import { ref, computed } from 'vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatTile from '@/components/ui/StatTile.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import DataTable from '@/components/ui/DataTable.vue'
import UiDrawer from '@/components/ui/UiDrawer.vue'
import CarTopView from '@/components/ui/CarTopView.vue'
import Icon from '@/components/ui/Icon.vue'
import { vehicles, vehicleStatusLabels, TL, NUM } from '@/data/mock'

const search = ref('')
const statusFilter = ref('all')

// Detay çekmecesi
const selected = ref(null)
const drawerOpen = ref(false)
function openDetail(v) { selected.value = v; drawerOpen.value = true }

// Seçili araca göre lastik/hasar görseli
const wheelTones = computed(() => {
  const base = { FL: 'var(--color-success)', FR: 'var(--color-success)', RL: 'var(--color-success)', RR: 'var(--color-success)' }
  if (selected.value?.status === 'service') base.RL = 'var(--color-warning)'
  return base
})
const damagePoints = computed(() =>
  selected.value?.status === 'damage' ? [{ x: 110, y: 40, tone: 'var(--color-danger)' }, { x: 70, y: 200, tone: 'var(--color-warning)' }] : []
)
// Örnek gider kırılımı
const costBreakdown = computed(() => {
  const v = selected.value
  if (!v) return []
  return [
    { label: 'Aylık Kira', value: v.monthly },
    { label: 'Yakıt (ay)', value: Math.round(v.monthly * 0.4) },
    { label: 'Servis (ay)', value: Math.round(v.monthly * 0.12) },
    { label: 'HGS (ay)', value: Math.round(v.km * 0.002) },
  ]
})

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

    <DataTable :columns="columns" :rows="filtered" clickable @row-click="openDetail" empty-icon="car" empty-text="Filtrelere uygun araç bulunamadı." empty-hint="Aramayı temizleyin veya yeni araç ekleyin.">
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

    <p class="mt-3 text-xs text-ink-faint">Toplam {{ filtered.length }} araç gösteriliyor. <span class="text-brand-600">Detay için bir satıra tıklayın.</span></p>

    <!-- Araç detay çekmecesi -->
    <UiDrawer v-model="drawerOpen" :title="selected ? `${selected.brand} ${selected.model}` : ''" :subtitle="selected?.plate">
      <template v-if="selected">
        <div class="flex items-center justify-between">
          <UiBadge :tone="vehicleStatusLabels[selected.status].tone" dot>{{ vehicleStatusLabels[selected.status].label }}</UiBadge>
          <span class="text-sm text-ink-soft">{{ selected.year }} · {{ selected.color }}</span>
        </div>

        <!-- Üstten araç görseli -->
        <div class="mt-4 rounded-xl border border-[color:var(--color-border)] bg-surface p-4">
          <CarTopView :wheel-tones="wheelTones" :points="damagePoints" :width="140" />
          <p class="mt-2 text-center text-xs text-ink-faint">
            {{ selected.status === 'damage' ? 'Hasar noktaları işaretli' : selected.status === 'service' ? 'Sol arka lastik: değişim yaklaşıyor' : 'Araç durumu iyi' }}
          </p>
        </div>

        <!-- Bilgiler -->
        <dl class="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div v-for="f in [
            { l: 'Sürücü', v: selected.driver },
            { l: 'Güncel KM', v: NUM(selected.km) + ' km' },
            { l: 'Şasi No (VIN)', v: selected.vin },
            { l: 'Motor No', v: selected.engineNo },
            { l: 'Kira Başlangıç', v: new Date(selected.rentStart).toLocaleDateString('tr-TR') },
            { l: 'Kira Bitiş', v: new Date(selected.rentEnd).toLocaleDateString('tr-TR') },
          ]" :key="f.l" class="min-w-0">
            <dt class="text-xs text-ink-faint">{{ f.l }}</dt>
            <dd class="truncate font-semibold text-ink">{{ f.v }}</dd>
          </div>
        </dl>

        <!-- Gider kırılımı -->
        <div class="mt-6">
          <h4 class="mb-2 text-sm font-bold">Aylık Gider Kırılımı</h4>
          <div class="space-y-2">
            <div v-for="c in costBreakdown" :key="c.label" class="flex items-center justify-between text-sm">
              <span class="text-ink-soft">{{ c.label }}</span>
              <span class="font-semibold">{{ TL(c.value) }}</span>
            </div>
            <div class="flex items-center justify-between border-t border-[color:var(--color-border)] pt-2 text-sm">
              <span class="font-bold">Toplam</span>
              <span class="font-bold text-brand-600">{{ TL(costBreakdown.reduce((s, c) => s + c.value, 0)) }}</span>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex gap-2">
          <UiButton variant="secondary" size="md" class="flex-1"><Icon name="map" :size="16" /> Konum</UiButton>
          <UiButton variant="secondary" size="md" class="flex-1"><Icon name="wrench" :size="16" /> İş Emri</UiButton>
          <UiButton variant="primary" size="md" class="flex-1"><Icon name="doc" :size="16" /> Detay</UiButton>
        </div>
      </template>
    </UiDrawer>
  </div>
</template>
