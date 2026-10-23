<script setup>
import { ref } from 'vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiTabs from '@/components/ui/UiTabs.vue'
import Icon from '@/components/ui/Icon.vue'
import { documents, integrations } from '@/data/mock'

const tab = ref('integrations')
const tabs = [
  { key: 'users', label: 'Kullanıcılar', icon: 'users' },
  { key: 'delivery', label: 'Teslim Formları', icon: 'clipboard' },
  { key: 'dealer', label: 'Bayi Sözleşmesi', icon: 'doc' },
  { key: 'docs', label: 'Şirket Evraklarım', icon: 'building' },
  { key: 'integrations', label: 'API & Entegrasyonlar', icon: 'plug' },
]
</script>

<template>
  <div>
    <PageHeader eyebrow="Sistem" title="Sistem ve Şirket Ayarları" subtitle="Kullanıcı hesapları, teslim formları, bayi sözleşmeleri, şirket evrakları ve entegrasyonlar." />

    <div class="mb-6"><UiTabs v-model="tab" :tabs="tabs" /></div>

    <!-- API & Entegrasyonlar -->
    <div v-if="tab === 'integrations'" class="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <UiCard>
        <template #header>
          <div class="flex items-center gap-2">
            <span class="grid h-9 w-9 place-items-center rounded-lg bg-brand-100 text-brand-700"><Icon name="map" :size="18" /></span>
            <div><h3 class="text-sm font-bold">GPS Araç Takip Entegrasyonu</h3><p class="text-xs text-ink-faint">Canlı konum veri akışı</p></div>
          </div>
        </template>
        <template #actions><UiBadge :tone="integrations.gps.connected ? 'success' : 'neutral'" dot>{{ integrations.gps.connected ? 'Bağlı' : 'Bağlı değil' }}</UiBadge></template>
        <div class="space-y-4">
          <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">GPS Servis Sağlayıcısı</span>
            <select class="input-base"><option v-for="p in integrations.gps.providers" :key="p" :selected="p === integrations.gps.provider">{{ p }}</option></select>
          </label>
          <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">API Kullanıcı Adı / Müşteri Kodu</span><input class="input-base" placeholder="Müşteri kodunuz" /></label>
          <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">API Gizli Anahtarı / Token</span><input class="input-base" type="password" placeholder="••••••••••••" /></label>
          <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">Veri Yenileme Sıklığı</span>
            <select class="input-base"><option v-for="r in integrations.gps.refreshOptions" :key="r">{{ r }}</option></select>
          </label>
          <div class="flex justify-end"><UiButton variant="primary">Ayarları Kaydet</UiButton></div>
        </div>
      </UiCard>

      <UiCard>
        <template #header>
          <div class="flex items-center gap-2">
            <span class="grid h-9 w-9 place-items-center rounded-lg bg-success-soft text-success"><Icon name="fuel" :size="18" /></span>
            <div><h3 class="text-sm font-bold">UTTS Taşıt Tanıma Entegrasyonu</h3><p class="text-xs text-ink-faint">Akaryakıt harcama eşitleme</p></div>
          </div>
        </template>
        <template #actions><UiBadge :tone="integrations.utts.connected ? 'success' : 'neutral'" dot>{{ integrations.utts.connected ? 'Aktif' : 'Pasif' }}</UiBadge></template>
        <div class="space-y-4">
          <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">UTTS / Akaryakıt Tedarikçisi</span>
            <select class="input-base"><option v-for="p in integrations.utts.providers" :key="p" :selected="p === integrations.utts.provider">{{ p }}</option></select>
          </label>
          <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">Kurumsal Müşteri / Cari Kodu</span><input class="input-base" placeholder="UTTS erişim kodu" /></label>
          <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">Otomatik Harcama Eşitleme</span>
            <select class="input-base"><option v-for="s in integrations.utts.syncOptions" :key="s">{{ s }}</option></select>
          </label>
          <div class="flex justify-end"><UiButton variant="primary">Ayarları Kaydet</UiButton></div>
        </div>
      </UiCard>
    </div>

    <!-- Şirket Evrakları -->
    <div v-else-if="tab === 'docs'" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div v-for="d in documents" :key="d.key" class="card p-5">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <span class="grid h-11 w-11 place-items-center rounded-lg bg-surface-muted text-ink-soft"><Icon name="doc" :size="20" /></span>
            <div><p class="font-semibold">{{ d.name }}</p><p class="text-xs text-ink-faint">{{ d.required ? '*Zorunlu Belge' : 'Opsiyonel' }}</p></div>
          </div>
          <UiBadge :tone="d.uploaded ? 'success' : 'warning'" dot>{{ d.uploaded ? 'Yüklendi' : 'Yüklenmedi' }}</UiBadge>
        </div>
        <UiButton class="mt-4 w-full" :variant="d.uploaded ? 'secondary' : 'primary'"><Icon name="download" :size="16" /> {{ d.uploaded ? 'Güncelle' : 'Belge Yükle' }}</UiButton>
      </div>
    </div>

    <!-- Diğer sekmeler -->
    <UiCard v-else :title="tabs.find(t => t.key === tab).label">
      <div class="grid place-items-center py-16 text-center">
        <div class="grid h-14 w-14 place-items-center rounded-2xl bg-surface-muted text-ink-faint"><Icon :name="tabs.find(t => t.key === tab).icon" :size="26" /></div>
        <p class="mt-3 text-sm font-semibold text-ink-soft">{{ tabs.find(t => t.key === tab).label }}</p>
        <p class="mt-1 text-xs text-ink-faint">Bu bölüm yakında bu ekranda yönetilecek.</p>
      </div>
    </UiCard>
  </div>
</template>
