<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Icon from '@/components/ui/Icon.vue'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import { useUiStore } from '@/stores/ui'
import { supplierNav } from '@/data/supplier'

const ui = useUiStore()
const route = useRoute()
// Aktif rotayı içeren grubu açık başlat
const open = ref(
  supplierNav.reduce((acc, g) => {
    if (g.children) acc[g.label] = g.children.some((c) => route.path.startsWith(c.to))
    return acc
  }, {})
)
const toggle = (label) => (open.value[label] = !open.value[label])
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[color:var(--color-border)] bg-surface transition-transform lg:translate-x-0"
    :class="ui.mobileNavOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex h-16 items-center gap-2.5 px-5">
      <RouterLink to="/supplier" class="flex items-center gap-2"><BrandLogo :size="32" /></RouterLink>
      <span class="rounded-md bg-brand-50 px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-wider text-brand-600">Tedarikçi</span>
    </div>

    <nav class="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
      <template v-for="g in supplierNav" :key="g.label">
        <!-- Düz link -->
        <RouterLink
          v-if="!g.children"
          :to="g.to"
          class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-surface-muted"
          active-class="!bg-brand-600 !text-white shadow-sm"
          :exact-active-class="g.to === '/supplier' ? '!bg-brand-600 !text-white shadow-sm' : ''"
        >
          <Icon :name="g.icon" :size="19" /> {{ g.label }}
        </RouterLink>

        <!-- Accordion grup -->
        <div v-else>
          <button
            @click="toggle(g.label)"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-surface-muted"
          >
            <Icon :name="g.icon" :size="19" /> {{ g.label }}
            <Icon name="chevron" :size="16" class="ml-auto transition-transform" :class="open[g.label] ? 'rotate-90' : ''" />
          </button>
          <ul v-show="open[g.label]" class="mb-1 ml-4 space-y-0.5 border-l border-[color:var(--color-border)] pl-3">
            <li v-for="c in g.children" :key="c.to">
              <RouterLink
                :to="c.to"
                class="block rounded-lg px-3 py-2 text-[0.82rem] font-medium text-ink-soft transition hover:bg-surface-muted"
                active-class="!text-brand-600 !bg-brand-50 font-semibold"
              >{{ c.label }}</RouterLink>
            </li>
          </ul>
        </div>
      </template>
    </nav>

    <div class="border-t border-[color:var(--color-border)] p-3">
      <RouterLink to="/dashboard" class="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-surface-muted">
        <Icon name="chevron" :size="18" class="rotate-180" /> Müşteri Paneline Geç
      </RouterLink>
      <button class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-surface-muted">
        <Icon name="logout" :size="19" /> Çıkış Yap
      </button>
    </div>
  </aside>

  <div v-if="ui.mobileNavOpen" @click="ui.toggleMobileNav(false)" class="fixed inset-0 z-30 bg-black/40 lg:hidden" />
</template>
