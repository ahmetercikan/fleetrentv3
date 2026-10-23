<script setup>
import { ref } from 'vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiTabs from '@/components/ui/UiTabs.vue'
import Icon from '@/components/ui/Icon.vue'
import { vehicles } from '@/data/mock'
import { useToastStore } from '@/stores/toast'
const toast = useToastStore()

const tab = ref('maintenance')
const tabs = [
  { key: 'maintenance', label: 'Bakım / Onarım', icon: 'wrench' },
  { key: 'tire', label: 'Lastik Hizmetleri', icon: 'tire' },
  { key: 'replacement', label: 'İkame Araç', icon: 'car' },
  { key: 'roadside', label: '7/24 Yol Yardım', icon: 'siren' },
]
</script>

<template>
  <div>
    <PageHeader eyebrow="Servis Paneli" title="Tedarikçi İşlemleri & Hizmet Talepleri" subtitle="Servis, lastik, ikame araç ve acil yol yardım taleplerinizi oluşturun ve takip edin.">
      <template #actions><UiButton variant="secondary" @click="toast.info('Taleplerim listesi açılıyor…')"><Icon name="doc" :size="16" /> Taleplerim</UiButton></template>
    </PageHeader>

    <div class="mb-5"><UiTabs v-model="tab" :tabs="tabs" /></div>

    <div class="grid grid-cols-1 gap-5 xl:grid-cols-3">
      <UiCard class="xl:col-span-2" title="Servis Talebi Oluştur">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">Plaka *</span>
            <select class="input-base"><option value="">Seçin</option><option v-for="v in vehicles" :key="v.id">{{ v.plate }} — {{ v.brand }} {{ v.model }}</option></select>
          </label>
          <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">Bakım Türü *</span>
            <select class="input-base"><option>Periyodik Bakım</option><option>Arıza / Onarım</option><option>Lastik Değişimi</option><option>Muayene</option></select>
          </label>
          <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">Son Kayıtlı Kilometre</span><input class="input-base" value="0 km" /></label>
          <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">Tercih Edilen Tarih — Başlangıç *</span><input class="input-base" type="date" /></label>
          <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">İl *</span><input class="input-base" value="İstanbul" /></label>
          <label class="block"><span class="mb-1 block text-xs font-semibold text-ink-soft">İlçe *</span><input class="input-base" value="Ümraniye" /></label>
          <label class="block sm:col-span-2"><span class="mb-1 block text-xs font-semibold text-ink-soft">Açıklama</span><textarea class="input-base" rows="3" placeholder="Talep detayları…" /></label>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <UiButton variant="ghost">Vazgeç</UiButton>
          <UiButton variant="primary" @click="toast.success('Servis talebiniz tedarikçiye iletildi.')"><Icon name="plus" :size="16" /> Talep Oluştur</UiButton>
        </div>
      </UiCard>

      <div class="space-y-5">
        <UiCard title="Bekleyen Talepler"><p class="text-sm text-ink-faint">Bekleyen servis talebi yok.</p></UiCard>
        <UiCard title="Servisteki Araçlar"><p class="text-sm text-ink-faint">34 FLT 212 serviste (40.000 km bakımı).</p></UiCard>
        <UiCard title="Geçmiş Talepler"><p class="text-sm text-ink-faint">Son 3 ayda 4 tamamlanmış talep.</p></UiCard>
      </div>
    </div>
  </div>
</template>
