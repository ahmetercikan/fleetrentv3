<script setup>
import PageHeader from '@/components/ui/PageHeader.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Icon from '@/components/ui/Icon.vue'
import { quotes, quoteStatusLabels, signatures, TL } from '@/data/mock'

const columns = [
  { key: 'id', label: 'Teklif No', mono: true },
  { key: 'type', label: 'Tip' },
  { key: 'vehicle', label: 'Araç / Paket' },
  { key: 'supplier', label: 'Tedarikçi' },
  { key: 'term', label: 'Süre', align: 'center' },
  { key: 'monthly', label: 'Aylık', align: 'right' },
  { key: 'status', label: 'Durum', align: 'center' },
  { key: 'actions', label: '', align: 'right' },
]
</script>

<template>
  <div>
    <PageHeader eyebrow="Kiralama" title="Talep & Teklifler" subtitle="Tedarikçilerden gelen teklifleri inceleyin, onaylayın, revizyon isteyin veya reddedin.">
      <template #actions>
        <UiButton variant="primary"><Icon name="plus" :size="16" /> Yeni Teklif İste</UiButton>
      </template>
    </PageHeader>

    <!-- Teklif tipi kartları -->
    <div class="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div v-for="t in [
        { t: 'Kurumsal Teklif', d: 'Çoklu araç, filo bazlı fiyatlandırma', i: '🏢', c: 'brand' },
        { t: 'Bireysel Teklif', d: 'Tek araç uzun dönem kiralama', i: '👤', c: 'success' },
        { t: 'R2R Teklif', d: 'Rent-to-rent portföy yönetimi', i: '🔁', c: 'info' },
      ]" :key="t.t" class="card flex items-center gap-4 p-5 transition hover:shadow-[var(--shadow-pop)]">
        <span class="grid h-12 w-12 place-items-center rounded-xl text-xl" :class="{
          'bg-brand-100 text-brand-700': t.c === 'brand',
          'bg-success-soft text-success': t.c === 'success',
          'bg-info-soft text-info': t.c === 'info',
        }">{{ t.i }}</span>
        <div class="flex-1">
          <p class="font-bold">{{ t.t }}</p>
          <p class="text-xs text-ink-faint">{{ t.d }}</p>
        </div>
        <Icon name="chevron" :size="18" class="text-ink-faint" />
      </div>
    </div>

    <UiCard title="Tedarikçilerden Gelen Teklifler" subtitle="Güncel teklif sürümünü kabul edin, revizyon isteyin veya reddedin." pad="false">
      <DataTable :columns="columns" :rows="quotes" empty-icon="📑" empty-text="Henüz gönderilmiş tedarikçi teklifi yok.">
        <template #cell-type="{ row }"><UiBadge tone="neutral">{{ row.type }}</UiBadge></template>
        <template #cell-monthly="{ row }"><span class="font-semibold">{{ TL(row.monthly) }}</span></template>
        <template #cell-status="{ row }"><UiBadge :tone="quoteStatusLabels[row.status].tone" dot>{{ quoteStatusLabels[row.status].label }}</UiBadge></template>
        <template #cell-actions="{ row }">
          <div class="flex justify-end gap-1.5">
            <UiButton v-if="row.status === 'pending'" variant="success" size="sm">Kabul</UiButton>
            <UiButton v-if="row.status === 'pending'" variant="secondary" size="sm">Revizyon</UiButton>
            <UiButton variant="ghost" size="sm">Detay</UiButton>
          </div>
        </template>
      </DataTable>
    </UiCard>

    <UiCard class="mt-5" title="İmzalı Belge Teyitleri" subtitle="Islak imzalı PDF ve bağlı sözleşme/teslim şartlarını inceleyerek firma adına teyit verin.">
      <template #actions><UiButton variant="ghost" size="sm"><Icon name="chevron" :size="14" /> Yenile</UiButton></template>
      <ul class="divide-y divide-[color:var(--color-border)]">
        <li v-for="s in signatures" :key="s.id" class="flex items-center justify-between py-3 first:pt-0 last:pb-0">
          <div class="flex items-center gap-3">
            <span class="grid h-10 w-10 place-items-center rounded-lg bg-surface-muted text-ink-soft"><Icon name="doc" :size="18" /></span>
            <div>
              <p class="text-sm font-semibold">{{ s.doc }}</p>
              <p class="text-xs text-ink-faint">{{ s.id }} · {{ new Date(s.date).toLocaleDateString('tr-TR') }}</p>
            </div>
          </div>
          <UiBadge :tone="s.status === 'signed' ? 'success' : 'warning'" dot>{{ s.status === 'signed' ? 'İmzalandı' : 'Bekliyor' }}</UiBadge>
        </li>
      </ul>
    </UiCard>
  </div>
</template>
