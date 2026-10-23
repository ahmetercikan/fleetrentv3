<script setup>
import PageHeader from '@/components/ui/PageHeader.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import Icon from '@/components/ui/Icon.vue'
import { notifications } from '@/data/mock'
import { useToastStore } from '@/stores/toast'
const toast = useToastStore()

const toneBg = {
  danger: 'bg-danger-soft text-danger', warning: 'bg-warning-soft text-warning',
  info: 'bg-info-soft text-info', success: 'bg-success-soft text-success',
}
</script>

<template>
  <div>
    <PageHeader eyebrow="Sistem" title="Bildirimler" subtitle="Sözleşme, bakım, harcama ve teklif olaylarından güncel bildirimler.">
      <template #actions><UiButton variant="secondary" @click="toast.success('Tüm bildirimler okundu işaretlendi.')">Tümünü Okundu İşaretle</UiButton></template>
    </PageHeader>

    <UiCard pad="false">
      <ul class="divide-y divide-[color:var(--color-border)]">
        <li v-for="n in notifications" :key="n.id" class="flex items-start gap-4 px-5 py-4 transition hover:bg-surface-muted/50" :class="n.unread ? 'bg-brand-50/40' : ''">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl" :class="toneBg[n.tone]"><Icon :name="n.icon" :size="20" /></span>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <p class="font-semibold">{{ n.title }}</p>
              <UiBadge v-if="n.unread" tone="brand">Yeni</UiBadge>
            </div>
            <p class="mt-0.5 text-sm text-ink-soft">{{ n.body }}</p>
            <p class="mt-1 text-xs text-ink-faint">{{ n.time }}</p>
          </div>
        </li>
      </ul>
    </UiCard>
  </div>
</template>
