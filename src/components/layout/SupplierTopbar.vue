<script setup>
import Icon from '@/components/ui/Icon.vue'
import { useUiStore } from '@/stores/ui'
import { supplier } from '@/data/supplier'

const ui = useUiStore()
const initials = supplier.name.split(' ').slice(0, 2).map((w) => w[0]).join('')
</script>

<template>
  <header class="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-[color:var(--color-border)] bg-surface/80 px-4 backdrop-blur lg:px-6">
    <button class="grid h-10 w-10 place-items-center rounded-lg text-ink-soft hover:bg-surface-muted lg:hidden" @click="ui.toggleMobileNav()">
      <Icon name="chevron" :size="22" />
    </button>
    <div class="relative hidden max-w-lg flex-1 sm:block">
      <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"><Icon name="search" :size="18" /></span>
      <input type="text" placeholder="Plaka, müşteri, sözleşme, fatura, rapor ara…" class="input-base !pl-10" />
    </div>
    <div class="ml-auto flex items-center gap-1.5">
      <button @click="ui.toggleTheme()" class="grid h-10 w-10 place-items-center rounded-lg text-ink-soft transition hover:bg-surface-muted">
        <Icon :name="ui.theme === 'dark' ? 'sun' : 'moon'" :size="19" />
      </button>
      <button class="relative grid h-10 w-10 place-items-center rounded-lg text-ink-soft transition hover:bg-surface-muted">
        <Icon name="bell" :size="19" />
      </button>
      <div class="ml-1 flex items-center gap-2.5 py-1 pl-1 pr-2">
        <span class="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">{{ initials }}</span>
        <div class="hidden text-right sm:block">
          <p class="text-sm font-semibold leading-tight">{{ supplier.name }}</p>
          <p class="text-xs text-ink-faint">{{ supplier.role }} · {{ supplier.branch }}</p>
        </div>
      </div>
    </div>
  </header>
</template>
