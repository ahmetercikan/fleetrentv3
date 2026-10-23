<script setup>
import { watch } from 'vue'
import Icon from '@/components/ui/Icon.vue'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])
const close = () => emit('update:modelValue', false)

// Açıkken arka plan kaymasını kilitle
watch(() => props.modelValue, (v) => {
  if (typeof document !== 'undefined') document.body.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="modelValue" class="fixed inset-0 z-50" @keydown.esc="close">
        <div class="absolute inset-0 bg-black/45 backdrop-blur-sm" @click="close" />
        <aside class="drawer-panel absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-canvas shadow-[var(--shadow-pop)]">
          <header class="flex items-start justify-between gap-3 border-b border-[color:var(--color-border)] bg-surface px-5 py-4">
            <div>
              <h2 class="text-base font-bold tracking-tight">{{ title }}</h2>
              <p v-if="subtitle" class="mt-0.5 text-xs text-ink-faint">{{ subtitle }}</p>
            </div>
            <button @click="close" class="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-soft transition hover:bg-surface-muted">
              <Icon name="plus" :size="20" class="rotate-45" />
            </button>
          </header>
          <div class="flex-1 overflow-y-auto p-5"><slot /></div>
          <footer v-if="$slots.footer" class="border-t border-[color:var(--color-border)] bg-surface px-5 py-3"><slot name="footer" /></footer>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-enter-active, .drawer-leave-active { transition: opacity 0.25s ease; }
.drawer-enter-active .drawer-panel, .drawer-leave-active .drawer-panel { transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1); }
.drawer-enter-from, .drawer-leave-to { opacity: 0; }
.drawer-enter-from .drawer-panel, .drawer-leave-to .drawer-panel { transform: translateX(100%); }
</style>
