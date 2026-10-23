<script setup>
import PageHeader from '@/components/ui/PageHeader.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Icon from '@/components/ui/Icon.vue'
import { users, userRoleLabels } from '@/data/mock'

const columns = [
  { key: 'name', label: 'Ad Soyad' },
  { key: 'email', label: 'E-posta' },
  { key: 'role', label: 'Rol' },
  { key: 'status', label: 'Durum', align: 'center' },
  { key: 'lastLogin', label: 'Son Giriş' },
  { key: 'actions', label: '', align: 'right' },
]
const roleTone = { 'Yönetici': 'brand', 'Operasyon': 'info', 'Görüntüleyici': 'neutral' }
</script>

<template>
  <div>
    <PageHeader eyebrow="Ekip" title="Kullanıcılar ve Yetkiler" subtitle="Şirket kullanıcılarını yönetin, rol ve erişim yetkilerini belirleyin.">
      <template #actions><UiButton variant="primary"><Icon name="plus" :size="16" /> Kullanıcı Davet Et</UiButton></template>
    </PageHeader>

    <DataTable :columns="columns" :rows="users">
      <template #cell-name="{ row }">
        <div class="flex items-center gap-3">
          <span class="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">{{ row.name.split(' ').map(w => w[0]).slice(0,2).join('') }}</span>
          <span class="font-semibold text-ink">{{ row.name }}</span>
        </div>
      </template>
      <template #cell-role="{ row }"><UiBadge :tone="roleTone[row.role]">{{ row.role }}</UiBadge></template>
      <template #cell-status="{ row }"><UiBadge :tone="userRoleLabels[row.status].tone" dot>{{ userRoleLabels[row.status].label }}</UiBadge></template>
      <template #cell-actions><UiButton variant="ghost" size="sm">Düzenle</UiButton></template>
    </DataTable>
  </div>
</template>
