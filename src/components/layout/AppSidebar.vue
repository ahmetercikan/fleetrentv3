<script setup>
import { RouterLink } from 'vue-router'
import Icon from '@/components/ui/Icon.vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()

const groups = [
  {
    title: 'Operasyon',
    items: [
      { to: '/dashboard', label: 'Ana Sayfa', icon: 'home' },
      { to: '/dashboard/vehicles', label: 'Araçlar', icon: 'car' },
      { to: '/dashboard/quotes', label: 'Talep & Teklifler', icon: 'offer' },
      { to: '/dashboard/service', label: 'Servis / Bakım', icon: 'wrench' },
      { to: '/dashboard/tires', label: 'Lastik Yönetimi', icon: 'tire' },
      { to: '/dashboard/fuel', label: 'Yakıt ve Giderler', icon: 'fuel' },
    ],
  },
  {
    title: 'Analiz & Yönetim',
    items: [
      { to: '/dashboard/reports', label: 'Raporlar', icon: 'report' },
      { to: '/dashboard/savings', label: 'Filo Kontrol & Tasarruf', icon: 'savings' },
      { to: '/dashboard/requests', label: 'Tedarikçi İşlemleri', icon: 'truck' },
      { to: '/dashboard/users', label: 'Kullanıcılar ve Yetkiler', icon: 'users' },
      { to: '/dashboard/settings', label: 'Ayarlar', icon: 'settings' },
    ],
  },
]

const soon = ['Sözleşmeler', 'Şoförlü Araçlar', 'HGS & Cezalar', 'Faturalar', 'Bildirimler']
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[color:var(--color-border)] bg-surface transition-transform lg:translate-x-0"
    :class="ui.mobileNavOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Logo -->
    <div class="flex h-16 items-center gap-2.5 px-5">
      <span class="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white shadow-sm">
        <Icon name="car" :size="20" />
      </span>
      <span class="text-lg font-extrabold tracking-tight">fleet<span class="text-brand-600">rent</span></span>
    </div>

    <!-- Nav -->
    <nav class="flex-1 space-y-6 overflow-y-auto px-3 py-4">
      <div v-for="g in groups" :key="g.title">
        <p class="px-3 pb-2 text-[0.65rem] font-bold uppercase tracking-wider text-ink-faint">{{ g.title }}</p>
        <ul class="space-y-0.5">
          <li v-for="item in g.items" :key="item.to">
            <RouterLink
              :to="item.to"
              class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-surface-muted"
              active-class="!bg-brand-600 !text-white shadow-sm"
              :exact-active-class="item.to === '/dashboard' ? '!bg-brand-600 !text-white shadow-sm' : ''"
            >
              <Icon :name="item.icon" :size="19" />
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <div>
        <p class="px-3 pb-2 text-[0.65rem] font-bold uppercase tracking-wider text-ink-faint">Yakında</p>
        <ul class="space-y-0.5">
          <li v-for="s in soon" :key="s">
            <span class="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink-faint">
              {{ s }}
              <span class="rounded-full bg-surface-muted px-2 py-0.5 text-[0.6rem] font-semibold">yakında</span>
            </span>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Alt -->
    <div class="border-t border-[color:var(--color-border)] p-3">
      <RouterLink to="/supplier" class="mb-1 flex items-center gap-3 rounded-lg bg-surface-muted px-3 py-2.5 text-sm font-semibold text-brand-600 transition hover:brightness-95">
        <Icon name="truck" :size="19" /> Tedarikçi Portalına Geç
      </RouterLink>
      <button class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-surface-muted">
        <Icon name="logout" :size="19" /> Çıkış Yap
      </button>
    </div>
  </aside>

  <!-- Mobil overlay -->
  <div
    v-if="ui.mobileNavOpen"
    @click="ui.toggleMobileNav(false)"
    class="fixed inset-0 z-30 bg-black/40 lg:hidden"
  />
</template>
