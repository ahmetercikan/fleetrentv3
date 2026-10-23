<script setup>
import PageHeader from '@/components/ui/PageHeader.vue'
import StatTile from '@/components/ui/StatTile.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Icon from '@/components/ui/Icon.vue'
import { useToastStore } from '@/stores/toast'
const toast = useToastStore()
import { savingsFindings, TL } from '@/data/mock'

const totalPotential = savingsFindings.reduce((s, f) => s + f.amount, 0)
const columns = [
  { key: 'category', label: 'Kategori' },
  { key: 'finding', label: 'Tespit' },
  { key: 'proof', label: 'Kanıt' },
  { key: 'amount', label: 'İncelenecek Tutar', align: 'right' },
  { key: 'action', label: 'Aksiyon', align: 'right' },
]
const toneByCat = { 'Yakıt': 'warning', 'Kullanım': 'info', 'HGS': 'danger', 'Servis': 'brand' }
</script>

<template>
  <div>
    <PageHeader eyebrow="Tasarruf Merkezi" title="Filo Kontrol & Tasarruf" subtitle="Filonuzdaki kullanım, bakım ve gider kayıtlarından inceleme önerileri.">
      <template #actions><UiButton variant="secondary" @click="toast.success('Tasarruf raporu indiriliyor…')"><Icon name="download" :size="16" /> CSV İndir</UiButton></template>
    </PageHeader>

    <!-- Eşik ayarları -->
    <UiCard class="mb-5" title="İnceleme Eşikleri" subtitle="Eşikler yalnızca bu ekrandaki analizi değiştirir.">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">Düşük kullanım (km/ay)</span><input class="input-base" value="500" /></label>
        <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">Düşük HGS bakiyesi (₺)</span><input class="input-base" value="200" /></label>
        <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">Yakıt inceleme eşiği (L/100km)</span><input class="input-base" value="9" /></label>
      </div>
    </UiCard>

    <div class="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatTile label="İnceleme Tespiti" :value="savingsFindings.length" icon="search" tone="brand" />
      <StatTile label="Potansiyel Tutar" :value="TL(totalPotential)" icon="wallet" tone="success" />
      <StatTile label="Yakıt Uyarısı" :value="1" icon="fuel" tone="warning" />
      <StatTile label="Kullanım Uyarısı" :value="1" icon="gauge" tone="info" />
    </div>

    <UiCard title="Tespitler ve Öneriler" subtitle="Bu tespitler inceleme önerisidir; gerçekleşmiş tasarruf değildir." pad="false">
      <DataTable :columns="columns" :rows="savingsFindings" empty-text="Henüz filonuza atanmış araç bulunmuyor.">
        <template #cell-category="{ row }"><UiBadge :tone="toneByCat[row.category]">{{ row.category }}</UiBadge></template>
        <template #cell-finding="{ row }"><span class="font-semibold text-ink">{{ row.finding }}</span></template>
        <template #cell-amount="{ row }"><span class="font-semibold">{{ row.amount ? TL(row.amount) : '—' }}</span></template>
        <template #cell-action="{ row }"><UiButton variant="secondary" size="sm" @click="toast.info(row.category + ': ' + row.action + ' işlemi başlatıldı.')">{{ row.action }}</UiButton></template>
      </DataTable>
    </UiCard>
  </div>
</template>
