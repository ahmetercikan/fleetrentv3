<script setup>
import { ref } from 'vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiTabs from '@/components/ui/UiTabs.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Icon from '@/components/ui/Icon.vue'
import { vehicles, TL } from '@/data/mock'

const tab = ref('cost')
const tabs = [
  { key: 'cost', label: 'Araç Maliyet', icon: '📊' },
  { key: 'location', label: 'Lokasyon', icon: '📍' },
  { key: 'km', label: 'Kilometre', icon: '🚗' },
  { key: 'usage', label: 'Kullanım Süresi', icon: '⏱️' },
  { key: 'service', label: 'Servis Süresi', icon: '🔧' },
  { key: 'user', label: 'Kullanıcı', icon: '👤' },
]

// Birleşik maliyet raporu (tüm modüllerden)
const rows = vehicles.slice(0, 6).map((v) => {
  const hgs = Math.round(v.km * 0.08)
  const fuel = Math.round(v.monthly * 0.4)
  const tire = Math.round(v.monthly * 0.05)
  const damage = v.status === 'damage' ? 14200 : 0
  const service = Math.round(v.monthly * 0.12)
  const kmOver = v.km > 60000 ? 3200 : 0
  return {
    id: v.id, driver: v.driver, plate: v.plate, monthly: v.monthly,
    hgs, fuel, tire, damage, service, kmOver, utts: fuel,
    total: v.monthly + hgs + fuel + tire + damage + service + kmOver,
  }
})

const columns = [
  { key: 'driver', label: 'Kullanıcı' }, { key: 'plate', label: 'Plaka', mono: true },
  { key: 'monthly', label: 'Aylık Kira', align: 'right' }, { key: 'hgs', label: 'HGS', align: 'right' },
  { key: 'fuel', label: 'Yakıt', align: 'right' }, { key: 'tire', label: 'Lastik', align: 'right' },
  { key: 'damage', label: 'Hasar', align: 'right' }, { key: 'service', label: 'Servis', align: 'right' },
  { key: 'kmOver', label: 'KM Aşım', align: 'right' }, { key: 'total', label: 'Toplam', align: 'right' },
]
</script>

<template>
  <div>
    <PageHeader eyebrow="Operasyonel Filo Raporları" title="Raporlar" subtitle="Filo maliyetleri, lokasyon takibi, kilometre ve kullanıcı analizleri.">
      <template #actions>
        <UiButton variant="success"><Icon name="download" :size="16" /> CSV İndir</UiButton>
        <UiButton variant="danger"><Icon name="download" :size="16" /> PDF İndir</UiButton>
      </template>
    </PageHeader>

    <div class="mb-5"><UiTabs v-model="tab" :tabs="tabs" /></div>

    <UiCard class="mb-5" title="Sabit Rapor Filtreleri">
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <input class="input-base" placeholder="Plaka ara…" />
        <input class="input-base" placeholder="Kullanıcı ara…" />
        <input class="input-base" type="date" />
        <input class="input-base" type="date" />
      </div>
    </UiCard>

    <template v-if="tab === 'cost'">
      <UiCard title="Araç Maliyet Raporu" subtitle="Tüm gider kalemleri birleşik" pad="false">
        <DataTable :columns="columns" :rows="rows">
          <template #cell-monthly="{ row }">{{ TL(row.monthly) }}</template>
          <template #cell-hgs="{ row }">{{ TL(row.hgs) }}</template>
          <template #cell-fuel="{ row }">{{ TL(row.fuel) }}</template>
          <template #cell-tire="{ row }">{{ TL(row.tire) }}</template>
          <template #cell-damage="{ row }">{{ TL(row.damage) }}</template>
          <template #cell-service="{ row }">{{ TL(row.service) }}</template>
          <template #cell-kmOver="{ row }">{{ TL(row.kmOver) }}</template>
          <template #cell-total="{ row }"><span class="font-bold text-brand-700">{{ TL(row.total) }}</span></template>
        </DataTable>
      </UiCard>
    </template>
    <UiCard v-else :title="tabs.find(t => t.key === tab).label + ' Raporu'">
      <div class="grid place-items-center py-16 text-center">
        <div class="text-4xl">{{ tabs.find(t => t.key === tab).icon }}</div>
        <p class="mt-3 text-sm font-semibold text-ink-soft">{{ tabs.find(t => t.key === tab).label }} raporu</p>
        <p class="mt-1 text-xs text-ink-faint">Bu rapor tipi için tarih aralığı seçip filtreleyin.</p>
      </div>
    </UiCard>
  </div>
</template>
