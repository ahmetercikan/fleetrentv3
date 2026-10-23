<script setup>
import { RouterLink, useRouter } from 'vue-router'
import Icon from '@/components/ui/Icon.vue'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'

const ui = useUiStore()
const auth = useAuthStore()
const router = useRouter()
function logout() {
  auth.logout()
  router.push('/login')
}

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
      { to: '/dashboard/hgs-fines', label: 'HGS & Cezalar', icon: 'shield' },
    ],
  },
  {
    title: 'Sözleşme & Finans',
    items: [
      { to: '/dashboard/contracts', label: 'Sözleşmeler', icon: 'doc' },
      { to: '/dashboard/invoices', label: 'Faturalar', icon: 'report' },
      { to: '/dashboard/reports', label: 'Raporlar', icon: 'report' },
      { to: '/dashboard/savings', label: 'Filo Kontrol & Tasarruf', icon: 'savings' },
    ],
  },
  {
    title: 'Yönetim',
    items: [
      { to: '/dashboard/requests', label: 'Tedarikçi İşlemleri', icon: 'truck' },
      { to: '/dashboard/notifications', label: 'Bildirimler', icon: 'bell' },
      { to: '/dashboard/users', label: 'Kullanıcılar ve Yetkiler', icon: 'users' },
      { to: '/dashboard/settings', label: 'Ayarlar', icon: 'settings' },
    ],
  },
]

const soon = ['Şoförlü Araçlar', 'Mobil Uygulama', 'Yapay Zeka Asistan']
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[color:var(--color-sidebar-line)] bg-[color:var(--color-sidebar)] text-[color:var(--color-sidebar-ink)] transition-transform lg:translate-x-0"
    :class="ui.mobileNavOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Logo -->
    <div class="flex h-16 items-center px-5">
      <RouterLink to="/dashboard"><BrandLogo :size="32" dark /></RouterLink>
    </div>

    <!-- Nav -->
    <nav class="sidebar-scroll flex-1 space-y-6 overflow-y-auto px-3 py-4">
      <div v-for="g in groups" :key="g.title">
        <p class="px-3 pb-2 text-[0.65rem] font-bold uppercase tracking-wider text-[color:var(--color-sidebar-faint)]">{{ g.title }}</p>
        <ul class="space-y-0.5">
          <li v-for="item in g.items" :key="item.to">
            <RouterLink
              :to="item.to"
              class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-[color:var(--color-sidebar-soft)] hover:text-white"
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
        <p class="px-3 pb-2 text-[0.65rem] font-bold uppercase tracking-wider text-[color:var(--color-sidebar-faint)]">Yakında</p>
        <ul class="space-y-0.5">
          <li v-for="s in soon" :key="s">
            <span class="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-[color:var(--color-sidebar-faint)]">
              {{ s }}
              <span class="rounded-full bg-[color:var(--color-sidebar-soft)] px-2 py-0.5 text-[0.6rem] font-semibold">yakında</span>
            </span>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Alt -->
    <div class="border-t border-[color:var(--color-sidebar-line)] p-3">
      <button @click="logout" class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-[color:var(--color-sidebar-soft)] hover:text-white">
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
